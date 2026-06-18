import { useState } from "react";
import CartPaymentModal from "./CartPaymentModal";

export default function CartSidebar({ isOpen, onClose, cart, setCart, onCheckout }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (paymentMethod) => {
    await onCheckout(cart, paymentMethod);
    setShowPaymentModal(false);
    onClose();
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-sidebar glass" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Your Cart</h3>
            <button className="cart-close" onClick={onClose}>×</button>
          </div>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">Rs {item.price} × {item.quantity}</div>
                    </div>
                    <div className="cart-item-subtotal">Rs {item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">Total: Rs {totalAmount}</div>
                <button className="btn primary full" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <CartPaymentModal
          cart={cart}
          totalAmount={totalAmount}
          onConfirm={handleConfirmPayment}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
}