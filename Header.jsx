export default function Header({ title, subtitle, user, onLogout }) {
  return (
    <div className="dashboard-header-modern">
      <div className="header-left">
        <div className="logo-icon-small">🛒</div>
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {user && (
          <div className="user-pill-modern">
            <span className="user-avatar">{user.role === "admin" ? "👑" : "👤"}</span>
            <span>{user.username || user.user?.username || user.name || "Account"}</span>
            <span className="user-role">{user.role === "admin" ? "Admin" : "User"}</span>
          </div>
        )}
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}