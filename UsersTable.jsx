import { useState } from "react";

export default function UsersTable({ users }) {
  const [expandedUser, setExpandedUser] = useState(null);

  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  if (users.length === 0) {
    return (
      <div className="users-empty-modern">
        <div className="empty-icon">👥</div>
        <p>No users found</p>
        <span>Users will appear here after registration</span>
      </div>
    );
  }

  return (
    <div className="users-list-modern">
      <div className="users-header">
        <h3>Registered Users</h3>
        <span className="user-count">{users.length} total</span>
      </div>
      <div className="users-cards-container">
        {users.map((user) => (
          <UserCard 
            key={user.id} 
            user={user} 
            isExpanded={expandedUser === user.id}
            onToggle={() => toggleExpand(user.id)}
          />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user, isExpanded, onToggle }) {
  return (
    <div className="user-card-modern">
      <div className="user-card-header" onClick={onToggle}>
        <div className="user-summary">
          <div className="user-avatar-large">
            <span>👤</span>
          </div>
          <div className="user-basic-info">
            <div className="user-name">{user.username}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <div className="user-quick-stats">
            <span className="user-stat">
              📅 {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className={`user-status ${user.address ? "has-address" : "no-address"}`}>
            {user.address ? "✓ Address Set" : "⚠️ No Address"}
          </div>
        </div>
        <span className="expand-icon-user">{isExpanded ? "▲" : "▼"}</span>
      </div>
      
      {isExpanded && (
        <div className="user-details">
          {/* Contact Information */}
          <div className="detail-section">
            <div className="section-title">📞 Contact Information</div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{user.phone || "Not provided"}</span>
            </div>
          </div>

          {/* Address Information */}
          <div className="detail-section">
            <div className="section-title">📍 Delivery Address</div>
            <div className="address-card">
              {user.address ? (
                <>
                  <div className="address-line">{user.address}</div>
                  <div className="address-note">
                    🚚 This address will be used for all deliveries
                  </div>
                </>
              ) : (
                <div className="no-address-message">
                  <span>⚠️ No address provided</span>
                  <p>User hasn't added a delivery address yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="detail-section">
            <div className="section-title">📋 Account Information</div>
            <div className="detail-row">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{user.username}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">User ID:</span>
              <span className="detail-value">#{user.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Registered:</span>
              <span className="detail-value">
                {user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"}
              </span>
            </div>
            {user.updated_at && user.updated_at !== user.created_at && (
              <div className="detail-row">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">
                  {new Date(user.updated_at).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
