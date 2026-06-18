import { useState } from "react";

export default function PaymentModal({ product, quantity = 1, onConfirm, onClose }) {
  const [method, setMethod] = useState("Visa");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!product) return null;

  const total = Number(product.price || 0) * Number(quantity || 1);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm(method, total);
      onClose();
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card glass">
        <h3>💳 Payment Gateway</h3>

        <div className="payment-product-info">
          <span className="payment-product-icon">🛒</span>
          <div>
            <div className="payment-product-name">{product.name}</div>
            <div className="payment-product-quantity">Quantity: {quantity}</div>
          </div>
        </div>

        <div className="total-price">Rs{total}</div>

        <label className="payment-label">Select Payment Method:</label>
        <select className="input" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="Visa">💳 Visa</option>
          <option value="MasterCard">💳 MasterCard</option>
          <option value="Cash on Delivery">💵 Cash on Delivery</option>
        </select>

        <div className="modal-actions">
          <button className="btn primary" onClick={handleConfirm} disabled={isProcessing}>
            {isProcessing ? "⏳ Processing..." : "✅ Confirm Payment"}
          </button>
          <button className="btn dark" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}