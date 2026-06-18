import { useState } from "react";

export default function OrdersTable({ orders, currentUserEmail, users }) {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getUserDetails = (email) => {
    if (!users || !email) return { username: "-", address: "-", phone: "-" };
    const user = users.find(u => u.email === email);
    if (user) {
      return {
        username: user.username || "-",
        address: user.address || "Not provided",
        phone: user.phone || "-"
      };
    }
    return { username: "-", address: "-", phone: "-" };
  };

  const filteredOrders = currentUserEmail
    ? orders.filter((order) => order.user_email === currentUserEmail)
    : orders;

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getItemsDisplay = (order) => {
    if (order.items && order.items.length > 0) {
      const firstItem = order.items[0].product_name;
      const count = order.items.length;
      if (count === 1) return firstItem;
      return `${firstItem} + ${count - 1} more`;
    }
    return order.product_name || "-";
  };

  const getTotalAmount = (order) => {
    if (order.total_amount) return order.total_amount;
    if (order.amount) return order.amount;
    return order.product?.price * order.quantity || 0;
  };

  if (filteredOrders.length === 0) {
    return (
      <div className="orders-empty-modern">
        <div className="empty-icon">📦</div>
        <p>No orders found</p>
        <span>{currentUserEmail ? "Start shopping to see your orders here" : "Orders will appear here after customers place orders"}</span>
      </div>
    );
  }

  return (
    <div className="orders-list-container">
      <div className="orders-header">
        <h3>{currentUserEmail ? "My Orders" : "All Orders"}</h3>
        <span className="order-count">{filteredOrders.length} orders</span>
      </div>
      <div className="orders-cards-container">
        {filteredOrders.map((order) => {
          const paymentMethod = 
            order.payment_method || 
            order.payment?.payment_method || 
            order.payment?.method || 
            "-";
          
          const userDetails = !currentUserEmail ? getUserDetails(order.user_email) : null;
          const isExpanded = expandedOrder === order.id;
          const totalAmount = getTotalAmount(order);
          const itemsDisplay = getItemsDisplay(order);
          const itemCount = order.items ? order.items.length : 1;
          
          return (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={isExpanded}
              onToggle={() => toggleExpand(order.id)}
              paymentMethod={paymentMethod}
              userDetails={userDetails}
              totalAmount={totalAmount}
              itemsDisplay={itemsDisplay}
              itemCount={itemCount}
              currentUserEmail={currentUserEmail}
            />
          );
        })}
      </div>
    </div>
  );
}

function OrderCard({ 
  order, 
  isExpanded, 
  onToggle, 
  paymentMethod, 
  userDetails, 
  totalAmount, 
  itemsDisplay, 
  itemCount,
  currentUserEmail 
}) {
  const hasItems = order.items && order.items.length > 0;

  return (
    <div className="order-card-table">
      <div className="order-card-header-table" onClick={onToggle}>
        <div className="order-summary-table">
          {/* Order ID Badge */}
          <div className="order-id-badge">
            <span className="badge-icon"></span>
            <span className="badge-text"># {order.id}</span>
          </div>

          {/* Customer Info (Admin only) */}
          {!currentUserEmail && userDetails && (
            <div className="customer-info-table">
              <div className="customer-avatar-small">👤</div>
              <div className="customer-details">
                <div className="customer-name">{userDetails.username}</div>
                <div className="customer-contact">{order.user_email}</div>
              </div>
            </div>
          )}

          {/* Items Summary */}
          <div className="items-summary">
            <span className="items-icon">🛒</span>
            <div className="items-info">
              <div className="items-display">{itemsDisplay}</div>
              <div className="items-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="total-amount-badge">
            <span className="amount-icon">💰</span>
            <span className="amount-value">Rs {totalAmount}</span>
          </div>


       

          {/* Expand Button */}
          <button className="expand-btn-table">
            {isExpanded ? "▲" : "▼"}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="order-details-table">
          {/* Order Items */}
          <div className="detail-section-table">
            <div className="section-title-table">
              <span>📋</span> Order Items
            </div>
            <div className="items-list-table">
              {hasItems ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row-table">
                    <div className="item-info-table">
                      <span className="item-name-table">{item.product_name}</span>
                      <span className="item-qty-table">× {item.quantity}</span>
                    </div>
                    <span className="item-price-table">Rs {item.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <div className="order-item-row-table">
                  <div className="item-info-table">
                    <span className="item-name-table">{order.product_name || "-"}</span>
                    <span className="item-qty-table">× {order.quantity || 1}</span>
                  </div>
                  <span className="item-price-table">Rs {order.amount || (order.product?.price * order.quantity)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div className="detail-section-table">
            <div className="section-title-table">
              <span>💳</span> Payment Details
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">{paymentMethod}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Amount:</span>
                <span className="detail-value total">Rs {totalAmount}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Order Date:</span>
                <span className="detail-value">
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="detail-section-table">
            <div className="section-title-table">
              <span>🚚</span> Delivery Information
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Delivery Time:</span>
                <span className="detail-value">
                  {order.delivery_days ? `${order.delivery_days} days` : "3 days"}
                </span>
              </div>
              {order.status === "completed" && (
                <div className="delivery-estimate-table">
                  🚚 Estimated delivery in {order.delivery_days || 3} days
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address (Admin only) */}
          {!currentUserEmail && userDetails && (
            <div className="detail-section-table">
              <div className="section-title-table">
                <span>📍</span> Delivery Address
              </div>
              <div className="address-card-table">
                <div className="address-line">{userDetails.address}</div>
                <div className="phone-line">📞 {userDetails.phone}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}