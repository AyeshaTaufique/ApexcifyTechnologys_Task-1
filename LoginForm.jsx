import { useState } from "react";

export default function LoginForm({ onAdminLogin, onUserLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";

    setIsLoading(true);
    setErrorMessage("");

    // Admin login
    if (
      email.trim().toLowerCase() === adminEmail &&
      password === adminPassword
    ) {
      onAdminLogin();
      setIsLoading(false);
      return;
    }

    try {
      const result = await onUserLogin(email, password);
      setIsLoading(false);

      if (result === "register") {
        onShowRegister({ email, password });
      }
    } catch (err) {
      setIsLoading(false);
      // Display user-friendly error message
      setErrorMessage(err.message);
      
      // Auto clear error after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="auth-card-modern">
      <div className="auth-logo">
        <div className="logo-icon">🛒</div>
        <h1 className="logo-text">FoodMart</h1>
      </div>

      <div className="auth-header">
        <h2 className="auth-welcome">Welcome Back</h2>
        <p className="auth-subtext">Login to manage your groceries</p>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="error-message-box">
          <span className="error-icon"></span>
          <div className="error-content">
            <strong>Login Failed</strong>
            <p>{errorMessage}</p>
          </div>
          <button className="error-close" onClick={() => setErrorMessage("")}>×</button>
        </div>
      )}

      <div className="auth-fields-modern">
        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input
            className="input-modern"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-wrapper">
            <input
              className="input-modern password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? (
                <svg className="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                </svg>
              ) : (
                <svg className="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="forgot-password">
          <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>
      </div>

      <button 
        className="btn-login" 
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <div className="auth-footer">
        <p className="footer-text">
          New to FoodMart?{" "}
          <button className="register-link" onClick={onShowRegister}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}