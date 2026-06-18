from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import redis
import json
import os
import requests
from datetime import datetime
import time
import smtplib
from email.message import EmailMessage

app = FastAPI(title="Order Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=3, decode_responses=True)

USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:5001")
PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL", "http://localhost:5002")
PAYMENT_SERVICE_URL = os.getenv("PAYMENT_SERVICE_URL", "http://localhost:5004")

class OrderItem(BaseModel):
    product_id: int
    product_name: str
    quantity: int
    price: float

class OrderCreate(BaseModel):
    user_id: int
    items: List[OrderItem]
    payment_method: str = "Visa"
    total_amount: float

def send_order_email(user_email, order_id, total_amount, status="confirmed"):
    msg = EmailMessage()
    msg["Subject"] = f"Order #{order_id} – {status}"
    msg["From"] = os.getenv("SMTP_USER")
    msg["To"] = user_email
    msg.set_content(f"""
    Hello,
    Your order #{order_id} has been {status}.
    Total amount: ${total_amount}
    Thank you for shopping with us!
    """)
    try:
        with smtplib.SMTP(os.getenv("SMTP_HOST"), int(os.getenv("SMTP_PORT"))) as server:
            server.starttls()
            server.login(os.getenv("SMTP_USER"), os.getenv("SMTP_PASSWORD"))
            server.send_message(msg)
    except Exception as e:
        print(f"Email failed: {e}")


@app.get("/health")
def health():
    return {"service": "Order Service", "status": "running"}

@app.post("/orders")
def create_order(order: OrderCreate):
    if not order.items:
        raise HTTPException(status_code=400, detail="Order must have at least one item")

    # 1. User service
    try:
        user_res = requests.get(f"{USER_SERVICE_URL}/users/{order.user_id}", timeout=5)
    except requests.exceptions.ConnectionError:
        raise HTTPException(status_code=503, detail="User service unavailable")
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="User service timeout")
    except:
        raise HTTPException(status_code=502, detail="User service error")
    if user_res.status_code != 200:
        raise HTTPException(status_code=404, detail="User not found")
    user = user_res.json()

    # 2. Check stock
    for item in order.items:
        try:
            prod_res = requests.get(f"{PRODUCT_SERVICE_URL}/products/{item.product_id}", timeout=5)
        except:
            raise HTTPException(status_code=503, detail=f"Product service error for {item.product_name}")
        if prod_res.status_code != 200:
            raise HTTPException(status_code=404, detail=f"Product {item.product_name} not found")
        prod = prod_res.json()
        if prod["stock"] < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {item.product_name}")

    # 3. Process payment
    order_id = r.incr("orders:next_id")
    try:
        pay_res = requests.post(
            f"{PAYMENT_SERVICE_URL}/pay",
            json={
                "order_id": order_id,
                "amount": order.total_amount,
                "payment_method": order.payment_method
            },
            timeout=5
        )
    except:
        raise HTTPException(status_code=503, detail="Payment service unavailable")
    if pay_res.status_code != 200:
        raise HTTPException(status_code=502, detail="Payment service error")
    payment = pay_res.json()
    if payment["status"] != "success":
        raise HTTPException(status_code=402, detail="Payment failed")

    # 4. Reduce stock
    for item in order.items:
        try:
            reduce_res = requests.patch(
                f"{PRODUCT_SERVICE_URL}/products/{item.product_id}/reduce-stock",
                json={"quantity": item.quantity},
                timeout=5
            )
        except:
            raise HTTPException(status_code=503, detail="Stock update failed")
        if reduce_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Could not reduce stock")

    # 5. Save order
    record = {
        "id": order_id,
        "user_id": order.user_id,
        "user_name": user["username"],
        "user_email": user["email"],
        "items": [item.dict() for item in order.items],
        "total_amount": order.total_amount,
        "payment_method": order.payment_method,
        "status": "completed",
        "delivery_days": payment.get("delivery_days", 3),
        "created_at": datetime.utcnow().isoformat()
    }
    r.set(f"order:{order_id}", json.dumps(record))

    item_list = ", ".join([f"{i.product_name} x{i.quantity}" for i in order.items])
    return {
        "message": f"Order placed! Payment via {order.payment_method}. Items: {item_list}. Delivery in {record['delivery_days']} days.",
        "order": record
    }
@app.patch("/orders/{order_id}/status")
def update_order_status(order_id: int, status: str):
    val = r.get(f"order:{order_id}")
    if not val:
        raise HTTPException(status_code=404, detail="Order not found")
    order = json.loads(val)
    order["status"] = status
    r.set(f"order:{order_id}", json.dumps(order))
    # Optionally send email on status change
    send_order_email(order["user_email"], order_id, order["total_amount"], status)
    return {"message": f"Order status updated to {status}"}
@app.get("/orders")
def get_orders():
    orders = []
    for key in r.scan_iter("order:*"):
        orders.append(json.loads(r.get(key)))
    orders.sort(key=lambda x: x["id"], reverse=True)
    return orders

@app.get("/orders/{order_id}")
def get_order(order_id: int):
    val = r.get(f"order:{order_id}")
    if not val:
        raise HTTPException(status_code=404, detail="Order not found")
    return json.loads(val)
