// frontend/src/components/RegisterForm.jsx
import { useState } from "react";
import { registerUser } from "../services/api";

export default function RegisterForm({ prefill, onRegistered, onCancel }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(prefill?.email || "");
  const [password, setPassword] = useState(prefill?.password || "");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("customer");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "", email: "", password: "", address: "", phone: ""
  });

  const validateUsername = (value) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscore";
    return "";
  };
  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(value)) return "Email must be a valid Gmail address (example@gmail.com)";
    return "";
  };
  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Za-z]/.test(value)) return "Password must contain at least one letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password must contain at least one symbol (!@#$%^&* etc.)";
    return "";
  };
  const validateAddress = (value) => {
    if (!value) return "Delivery address is required";
    if (value.length < 10) return "Please enter a complete address (min 10 characters)";
    if (value.length > 200) return "Address is too long";
    return "";
  };
  const validatePhone = (value) => {
    if (!value) return "Phone number is required";
    if (!/^\d+$/.test(value)) return "Phone number can only contain digits";
    if (value.length !== 11) return "Phone number must be exactly 11 digits (03XXXXXXXXX)";
    return "";
  };

  const handleFieldChange = (field, value) => {
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "address") setAddress(value);
    if (field === "phone") setPhone(value);
    let error = "";
    if (field === "username") error = validateUsername(value);
    if (field === "email") error = validateEmail(value);
    if (field === "password") error = validatePassword(value);
    if (field === "address") error = validateAddress(value);
    if (field === "phone") error = validatePhone(value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateAllFields = () => {
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const addressError = validateAddress(address);
    const phoneError = validatePhone(phone);
    setErrors({ username: usernameError, email: emailError, password: passwordError, address: addressError, phone: phoneError });
    return !usernameError && !emailError && !passwordError && !addressError && !phoneError;
  };

  const handleRegister = async () => {
    if (!validateAllFields()) {
      setMessage("Please fix all errors before submitting");
      return;
    }
    setIsLoading(true);
    try {
      const result = await registerUser(username, email, password, address, phone, role);
      setMessage("Registration successful!");
      onRegistered(result.user);
    } catch (err) {
      setMessage(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card-modern">
      <div className="auth-logo">
        <div className="logo-icon">🛒</div>
        <h1 className="logo-text">FoodMart</h1>
      </div>
      <div className="auth-header">
        <h2 className="auth-welcome">Create Account</h2>
        <p className="auth-subtext">Join FoodMart and start ordering</p>
      </div>

      <div className="auth-fields-modern">
        <div className="input-group">
          <label className="input-label">Username *</label>
          <input className={`input-modern ${errors.username ? "error" : ""}`} type="text" placeholder="Choose a username" value={username} onChange={(e) => handleFieldChange("username", e.target.value)} />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Email Address *</label>
          <input className={`input-modern ${errors.email ? "error" : ""}`} type="email" placeholder="username@gmail.com" value={email} onChange={(e) => handleFieldChange("email", e.target.value)} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Password *</label>
          <div className="password-wrapper">
            <input className={`input-modern password-input ${errors.password ? "error" : ""}`} type={showPassword ? "text" : "password"} placeholder="Min 8 chars, letter, number & symbol" value={password} onChange={(e) => handleFieldChange("password", e.target.value)} />
            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)} tabIndex="-1">
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
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Delivery Address *</label>
          <input className={`input-modern ${errors.address ? "error" : ""}`} type="text" placeholder="House No, Street, City, Pin Code" value={address} onChange={(e) => handleFieldChange("address", e.target.value)} />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Phone Number *</label>
          <input className={`input-modern ${errors.phone ? "error" : ""}`} type="tel" placeholder="03XXXXXXXXX (11 digits)" value={phone} onChange={(e) => handleFieldChange("phone", e.target.value)} />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        <div className="input-group">
          <label className="input-label">Account Type *</label>
          <select className="input-modern" value={role} onChange={e => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor (Sell products)</option>
          </select>
        </div>
      </div>

      <button className="btn-login" onClick={handleRegister} disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="auth-footer">
        <p className="footer-text">Already have an account? <button className="register-link" onClick={onCancel}>Login</button></p>
      </div>

      {message && <div className={`auth-message ${message.includes("successful") ? "success" : "error"}`}>{message}</div>}
    </div>
  );
}
// import { useState } from "react";
// import { registerUser } from '../services/api';

// // Then simplify handleRegister to:
// const handleRegister = async () => {
//   if (!validateAllFields()) {
//     setMessage("Please fix all errors before submitting");
//     return;
//   }
  
//   setIsLoading(true);
//   try {
//     const result = await registerUser(username, email, password, address, phone);
//     setMessage("Registration successful!");
//     onRegistered(result.user);
//   } catch (err) {
//     setMessage(err.message || "Registration failed");
//   } finally {
//     setIsLoading(false);
//   }
// };

// export default function RegisterForm({ prefill, onRegistered, onCancel }) {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState(prefill?.email || "");
//   const [password, setPassword] = useState(prefill?.password || "");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  
//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: ""
//   });

//   const validateUsername = (value) => {
//     if (!value) return "Username is required";
//     if (value.length < 3) return "Username must be at least 3 characters";
//     if (value.length > 20) return "Username must be less than 20 characters";
//     if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscore";
//     return "";
//   };

//   const validateEmail = (value) => {
//     if (!value) return "Email is required";
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     if (!emailRegex.test(value)) return "Email must be a valid Gmail address (example@gmail.com)";
//     return "";
//   };

//   const validatePassword = (value) => {
//     if (!value) return "Password is required";
//     if (value.length < 8) return "Password must be at least 8 characters long";
//     if (!/[A-Za-z]/.test(value)) return "Password must contain at least one letter";
//     if (!/[0-9]/.test(value)) return "Password must contain at least one number";
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password must contain at least one symbol (!@#$%^&* etc.)";
//     return "";
//   };

//   const validateAddress = (value) => {
//     if (!value) return "Delivery address is required";
//     if (value.length < 10) return "Please enter a complete address (min 10 characters)";
//     if (value.length > 200) return "Address is too long";
//     return "";
//   };

//   const validatePhone = (value) => {
//     if (!value) return "Phone number is required";
//     if (!/^\d+$/.test(value)) return "Phone number can only contain digits";
//     if (value.length !== 11) return "Phone number must be exactly 11 digits (03XXXXXXXXX)";
//     return "";
//   };

//   const handleFieldChange = (field, value) => {
//     if (field === "username") setUsername(value);
//     if (field === "email") setEmail(value);
//     if (field === "password") setPassword(value);
//     if (field === "address") setAddress(value);
//     if (field === "phone") setPhone(value);
    
//     let error = "";
//     if (field === "username") error = validateUsername(value);
//     if (field === "email") error = validateEmail(value);
//     if (field === "password") error = validatePassword(value);
//     if (field === "address") error = validateAddress(value);
//     if (field === "phone") error = validatePhone(value);
    
//     setErrors(prev => ({ ...prev, [field]: error }));
//   };

//   const validateAllFields = () => {
//     const usernameError = validateUsername(username);
//     const emailError = validateEmail(email);
//     const passwordError = validatePassword(password);
//     const addressError = validateAddress(address);
//     const phoneError = validatePhone(phone);
    
//     setErrors({
//       username: usernameError,
//       email: emailError,
//       password: passwordError,
//       address: addressError,
//       phone: phoneError
//     });
    
//     return !usernameError && !emailError && !passwordError && !addressError && !phoneError;
//   };
//   const handleRegister = async () => {
//     if (!validateAllFields()) {
//       setMessage("Please fix all errors before submitting");
//       return;
//     }
    
//     setIsLoading(true);
//     try {
//       const result = await registerUser(username, email, password, address, phone);
//       setMessage("Registration successful!");
//       onRegistered(result.user);
//     } catch (err) {
//       setMessage(err.message || "Registration failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-card-modern">
//       <div className="auth-logo">
//         <div className="logo-icon">🛒</div>
//         <h1 className="logo-text">FoodMart</h1>
//       </div>

//       <div className="auth-header">
//         <h2 className="auth-welcome">Create Account</h2>
//         <p className="auth-subtext">Join FoodMart and start ordering</p>
//       </div>

//       <div className="auth-fields-modern">
//         <div className="input-group">
//           <label className="input-label">Username *</label>
//           <input
//             className={`input-modern ${errors.username ? "error" : ""}`}
//             type="text"
//             placeholder="Choose a username"
//             value={username}
//             onChange={(e) => handleFieldChange("username", e.target.value)}
//           />
//           {errors.username && <span className="error-text">{errors.username}</span>}
//         </div>

//         <div className="input-group">
//           <label className="input-label">Email Address *</label>
//           <input
//             className={`input-modern ${errors.email ? "error" : ""}`}
//             type="email"
//             placeholder="username@gmail.com"
//             value={email}
//             onChange={(e) => handleFieldChange("email", e.target.value)}
//           />
//           {errors.email && <span className="error-text">{errors.email}</span>}
//         </div>

//         <div className="input-group">
//           <label className="input-label">Password *</label>
//           <div className="password-wrapper">
//             <input
//               className={`input-modern password-input ${errors.password ? "error" : ""}`}
//               type={showPassword ? "text" : "password"}
//               placeholder="Min 8 chars, letter, number & symbol"
//               value={password}
//               onChange={(e) => handleFieldChange("password", e.target.value)}
//             />
//             <button
//               type="button"
//               className="eye-btn"
//               onClick={() => setShowPassword(!showPassword)}
//               tabIndex="-1"
//             >
//               {showPassword ? (
//                 <svg className="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                   <circle cx="12" cy="12" r="3" />
//                   <line x1="3" y1="3" x2="21" y2="21" />
//                 </svg>
//               ) : (
//                 <svg className="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                   <circle cx="12" cy="12" r="3" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           {errors.password && <span className="error-text">{errors.password}</span>}
//         </div>

//         <div className="input-group">
//           <label className="input-label">Delivery Address *</label>
//           <input
//             className={`input-modern ${errors.address ? "error" : ""}`}
//             type="text"
//             placeholder="House No, Street, City, Pin Code"
//             value={address}
//             onChange={(e) => handleFieldChange("address", e.target.value)}
//           />
//           {errors.address && <span className="error-text">{errors.address}</span>}
//         </div>

//         <div className="input-group">
//           <label className="input-label">Phone Number *</label>
//           <input
//             className={`input-modern ${errors.phone ? "error" : ""}`}
//             type="tel"
//             placeholder="03XXXXXXXXX (11 digits)"
//             value={phone}
//             onChange={(e) => handleFieldChange("phone", e.target.value)}
//           />
//           {errors.phone && <span className="error-text">{errors.phone}</span>}
//         </div>
//       </div>

//       <button 
//         className="btn-login" 
//         onClick={handleRegister}
//         disabled={isLoading}
//       >
//         {isLoading ? "Creating Account..." : "Sign Up"}
//       </button>

//       <div className="auth-footer">
//         <p className="footer-text">
//           Already have an account?{" "}
//           <button className="register-link" onClick={onCancel}>
//             Login
//           </button>
//         </p>
//       </div>

//       {message && (
//         <div className={`auth-message ${message.includes("successful") ? "success" : "error"}`}>
//           {message}
//         </div>
//       )}
//     </div>
//   );
// }