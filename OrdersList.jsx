import { useState } from "react";

export default function OrdersList({ orders, currentUserEmail }) {
  const userOrders = orders.filter(order => order.user_email === currentUserEmail);
  const sortedOrders = [...userOrders].sort((a, b) => b.id - a.id);

  if (sortedOrders.length === 0) {
    return (
      <div className="orders-empty-modern">
        <div className="empty-icon">📦</div>
        <p>No orders found</p>
        <span>Start shopping to see your orders here</span>
      </div>
    );
  }

  return (
    <div className="orders-list-modern">
      {sortedOrders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const paymentMethod = order.payment_method || order.payment?.payment_method || "-";
  
  // Handle both old single-product orders and new multi-item orders
  const hasItems = order.items && order.items.length > 0;
  const itemCount = hasItems ? order.items.length : 1;
  const totalAmount = hasItems ? order.total_amount : (order.amount || (order.product?.price * order.quantity));

  return (
    <div className="order-card-modern">
      <div className="order-card-header-modern" onClick={() => setExpanded(!expanded)}>
        <div className="order-summary-modern">
       
          <div className="order-date-modern">
            <span className="date-icon">📅</span>
            {new Date(order.created_at).toLocaleDateString()}
          </div>
          <div className="order-amount-modern">
            <span className="amount-icon">💰</span>
            RS {totalAmount}
          </div>
          <div className="order-items-count">
            <span className="items-icon">🛒</span>
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </div>
          <div className={`order-status-modern ${order.status === "completed" ? "completed" : "pending"}`}>
            {order.status === "completed" ? "✓ Completed" : "⏳ Pending"}
          </div>
        </div>
        <span className="expand-icon-modern">{expanded ? "▲" : "▼"}</span>
      </div>
      
      {expanded && (
        <div className="order-details-modern">
          {/* Items List */}
          <div className="detail-section">
            <div className="section-title">📋 Items Ordered</div>
            {hasItems ? (
              <div className="items-list">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <span className="item-name">{item.product_name}</span>
                    <span className="item-qty">× {item.quantity} </span>
                    <span className="item-price"> RS {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="order-item-row">
                <span className="item-name">{order.product_name || "-"}</span>
                <span className="item-qty">× {order.quantity || 1}</span>
                <span className="item-price"> RS {order.amount || (order.product?.price * order.quantity)}</span>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="detail-section">
            <div className="section-title">💳 Payment Details</div>
            <div className="detail-row-modern">
              <span className="detail-label">Payment Method:</span>
              <span className="detail-value">{paymentMethod}</span>
            </div>
            <div className="detail-row-modern">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value total-amount">RS {totalAmount}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="detail-section">
            <div className="section-title">🚚 Delivery Information</div>
            <div className="detail-row-modern">
              <span className="detail-label">Delivery Time:</span>
              <span className="detail-value">{order.delivery_days ? `${order.delivery_days} days` : "3 days"}</span>
            </div>
            {order.status === "completed" && (
              <div className="delivery-estimate">
                🚚 Estimated delivery in {order.delivery_days || 3} days
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}