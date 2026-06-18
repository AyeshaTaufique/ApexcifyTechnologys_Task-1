import { useState } from "react";

export default function CartPaymentModal({ cart, totalAmount, onConfirm, onClose }) {
  const [method, setMethod] = useState("Cash on Delivery");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm(method);
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop-modern" onClick={onClose}>
      <div className="modal-card-modern" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-modern">
          <div className="modal-icon">🛒</div>
          <h3>Checkout</h3>
          <button className="modal-close-modern" onClick={onClose}>×</button>
        </div>

        <div className="cart-summary-modern">
          <div className="summary-header">
            <span>Items in your cart</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-summary-item-modern">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">× {item.quantity}</span>
                </div>
                <span className="item-price">RS {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="cart-summary-total-modern">
            <span>Total Amount</span>
            <span>RS {totalAmount}</span>
          </div>
        </div>

        <div className="payment-method-section">
          <label className="payment-label-modern">Select Payment Method</label>
          <div className="payment-options-modern">
            <button
              className={`payment-option ${method === "Visa" ? "active" : ""}`}
              onClick={() => setMethod("Visa")}
            >
              <span>💳</span> Visa
            </button>
            <button
              className={`payment-option ${method === "MasterCard" ? "active" : ""}`}
              onClick={() => setMethod("MasterCard")}
            >
              <span>💳</span> MasterCard
            </button>
            <button
              className={`payment-option ${method === "Cash on Delivery" ? "active" : ""}`}
              onClick={() => setMethod("Cash on Delivery")}
            >
              <span>💵</span> Cash on Delivery
            </button>
          </div>
        </div>

        <div className="modal-actions-modern">
          <button 
            className="confirm-btn" 
            onClick={handleConfirm} 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : (
              <>
                ✅ Confirm & Pay RS {totalAmount}
              </>
            )}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}