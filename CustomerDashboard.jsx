// frontend/src/components/CustomerDashboard.jsx
import { useState } from "react";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";
import OrdersList from "./OrdersList";
import ProductReviews from "./ProductReviews";

export default function CustomerDashboard({ user, products, orders, onLogout, cart, setCart, onCheckout }) {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleCheckout = async (cartItems, paymentMethod) => {
    try {
      const result = await onCheckout(cartItems, paymentMethod);
      if (result.success) {
        showToast(result.message, "success");
        setCart([]);
      } else {
        showToast(result.message, "error");
      }
    } catch (err) {
      showToast(err.message || "Checkout failed. Please try again.", "error");
    }
  };

  const addToCart = (product, quantity) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${quantity} × ${product.name} added to cart`, "info");
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReviews = (product) => {
    setSelectedProduct(product);
    setShowReviews(true);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="logo-icon-small">🛒</div>
          <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome back! Browse products and place orders.</p>
          </div>
        </div>
        <div className="header-right">
          <div className="user-pill-modern">
            <span className="user-avatar">👤</span>
            <span>{user?.user?.username || user?.user?.email?.split('@')[0] || "Account"}</span>
          </div>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            🛒 <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {toast && (
        <div className={`custom-toast-top ${toast.type}`}>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}

      <div className="dashboard-tabs-modern">
        <button className={`tab-btn-modern ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
          <span className="tab-icon">🍽️</span> Products
        </button>
        <button className={`tab-btn-modern ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
          <span className="tab-icon">📦</span> My Orders
        </button>
      </div>

      {activeTab === "products" && (
        <div className="products-tab-modern">
          <div className="search-bar-modern">
            <input
              type="text"
              className="search-input-modern"
              placeholder="🔍 Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredProducts.length === 0 ? (
            <div className="no-products-modern"><p>No products found matching "{searchTerm}"</p></div>
          ) : (
            <div className="products-grid-modern">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} onViewReviews={handleViewReviews} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="orders-tab-modern">
          <OrdersList orders={orders} currentUserEmail={user?.user?.email} />
        </div>
      )}

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} onCheckout={handleCheckout} />

      {showReviews && selectedProduct && (
        <ProductReviews product={selectedProduct} userId={user?.user?.id} onClose={() => setShowReviews(false)} />
      )}
    </div>
  );
}