import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";   // renamed from UserDashboard
import VendorDashboard from "./components/VendorDashboard";       // new
import Homepage from "./components/Homepage";
import { addProduct, createOrder, getOrders, getProducts, getUsers, loginUser } from "./services/api";

function AppContent() {
  const [page, setPage] = useState("home");
  const [pendingRegister, setPendingRegister] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  const loadAllData = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (err) { setUsers([]); }
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (err) { setProducts([]); }
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (err) { setOrders([]); }
  };

  useEffect(() => {
    if (page === "admin" || page === "customer" || page === "vendor") {
      loadAllData();
    }
  }, [page]);

  const handleAdminLogin = () => {
    setAuthUser({ role: "admin", username: "Admin", email: "admin@shop.com" });
    setMessage("Admin login successful");
    setPage("admin");
    loadAllData();
  };

  const handleUserLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const userData = data.user || data;
      setAuthUser({ role: userData.role || "customer", user: userData });
      setMessage("Login successful");
      // redirect based on role
      if (userData.role === "admin") setPage("admin");
      else if (userData.role === "vendor") setPage("vendor");
      else setPage("customer");
      await loadAllData();
      return "ok";
    } catch (err) {
      setMessage(err.message);
      throw err;
    }
  };

  const handleShowRegister = (prefill = null) => {
    setPendingRegister(prefill);
    setPage("register");
  };

  const handleRegistered = async (registeredUser) => {
    setAuthUser({ role: registeredUser.role || "customer", user: registeredUser });
    setMessage("Registration successful");
    if (registeredUser.role === "admin") setPage("admin");
    else if (registeredUser.role === "vendor") setPage("vendor");
    else setPage("customer");
    await loadAllData();
  };

  const handleAddProduct = async (product) => {
    try {
      const result = await addProduct(product);
      setMessage(result.message);
      await loadAllData();
      return result;
    } catch (err) {
      setMessage(err.message);
      return { message: err.message, updated: false };
    }
  };

  const handleCartCheckout = async (cartItems, paymentMethod) => {
    const currentUser = authUser?.user;
    if (!currentUser || !currentUser.id) throw new Error("User not authenticated");
    if (!cartItems.length) throw new Error("Cart is empty");

    const items = cartItems.map(item => ({
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const result = await createOrder({
        user_id: currentUser.id,
        items,
        payment_method: paymentMethod,
        total_amount: totalAmount
      });
      await loadAllData();
      return { success: true, message: result.message || "Order placed successfully!" };
    } catch (err) {
      return { success: false, message: err.message || "Checkout failed" };
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    setPage("home");
    setPendingRegister(null);
    setMessage("");
    setCart([]);
  };

  const userForDashboard = authUser ? { ...authUser, onLogout: handleLogout } : null;

  const navigateToLogin = () => setPage("login");
  const navigateToRegister = () => setPage("register");

  return (
    <div className="app-root">
      {page === "home" && <Homepage onLoginClick={navigateToLogin} onRegisterClick={navigateToRegister} />}
      {page === "login" && (
        <div className="auth-page">
          <div className="auth-container">
            <LoginForm onAdminLogin={handleAdminLogin} onUserLogin={handleUserLogin} onShowRegister={handleShowRegister} />
          </div>
        </div>
      )}
      {page === "register" && (
        <div className="auth-page">
          <div className="auth-container">
            <RegisterForm prefill={pendingRegister} onRegistered={handleRegistered} onCancel={() => setPage("login")} />
          </div>
        </div>
      )}
      {page === "admin" && (
        <AdminDashboard user={authUser} users={users} products={products} orders={orders}
          onLogout={handleLogout} onAddProduct={handleAddProduct} message={message} />
      )}
      {page === "customer" && (
        <CustomerDashboard user={userForDashboard} products={products} orders={orders}
          onLogout={handleLogout} cart={cart} setCart={setCart} onCheckout={handleCartCheckout} message={message} />
      )}
      {page === "vendor" && (
        <VendorDashboard user={userForDashboard} products={products} orders={orders}
          onLogout={handleLogout} onAddProduct={handleAddProduct} message={message} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
// import AdminDashboard from "./components/AdminDashboard";
// import UserDashboard from "./components/UserDashboard";
// import Homepage from "./components/Homepage";
// import { addProduct, createOrder, getOrders, getProducts, getUsers, loginUser } from "./services/api";

// function AppContent() {
//   const [page, setPage] = useState("home");
//   const [pendingRegister, setPendingRegister] = useState(null);
//   const [authUser, setAuthUser] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [message, setMessage] = useState("");
//   const [cart, setCart] = useState([]);

//   const loadAllData = async () => {
//     console.log("🔄 Loading all data...");

//     // Load users independently
//     try {
//       const usersData = await getUsers();
//       setUsers(usersData);
//       console.log("✅ Users loaded:", usersData.length);
//     } catch (err) {
//       console.error("❌ User service error:", err.message);
//       setUsers([]);
//     }

//     // Load products independently
//     try {
//       const productsData = await getProducts();
//       setProducts(productsData);
//       console.log("✅ Products loaded:", productsData.length);
//     } catch (err) {
//       console.error("❌ Product service error:", err.message);
//       setProducts([]);
//     }

//     // Load orders independently
//     try {
//       const ordersData = await getOrders();
//       setOrders(ordersData);
//       console.log("✅ Orders loaded:", ordersData.length);
//     } catch (err) {
//       console.error("❌ Order service error:", err.message);
//       setOrders([]);
//     }
//   };

//   useEffect(() => {
//     if (page === "admin" || page === "user") {
//       loadAllData();
//     }
//   }, [page]);

//   const handleAdminLogin = () => {
//     setAuthUser({ role: "admin", username: "Admin", email: "admin@shop.com" });
//     setMessage("Admin login successful");
//     setPage("admin");
//     loadAllData();
//   };

//   const handleUserLogin = async (email, password) => {
//     try {
//       const data = await loginUser(email, password);
//       setAuthUser({ role: "user", user: data.user || data });
//       setMessage("Login successful");
//       setPage("user");
//       await loadAllData();
//       return "ok";
//     } catch (err) {
//       // Set message for toast notification
//       setMessage(err.message);
//       // Re-throw the error so LoginForm can catch it
//       throw err;
//     }
//   };
//   const handleShowRegister = (prefill = null) => {
//     setPendingRegister(prefill);
//     setPage("register");
//   };

//   const handleRegistered = async (registeredUser) => {
//     setAuthUser({ role: "user", user: registeredUser });
//     setMessage("Registration successful");
//     setPage("user");
//     await loadAllData();
//   };

//   const handleAddProduct = async (product) => {
//     try {
//       const result = await addProduct(product);
//       setMessage(result.message);
//       await loadAllData();
//       return result;
//     } catch (err) {
//       setMessage(err.message);
//       return { message: err.message, updated: false };
//     }
//   };

//   const handlePlaceOrder = async (product, quantity, paymentMethod) => {
//     try {
//       const currentUser = authUser?.user;
//       if (!currentUser || !currentUser.id) {
//         throw new Error("User not authenticated");
//       }
//       const result = await createOrder({
//         user_id: currentUser.id,
//         product_id: product.id,
//         quantity: Number(quantity),
//         payment_method: paymentMethod,
//       });
//       setMessage(result.message);
//       await loadAllData();
//       return { ok: true, message: result.message };
//     } catch (err) {
//       setMessage(err.message);
//       return { ok: false, message: err.message };
//     }
//   };

//   const handleCartCheckout = async (cartItems, paymentMethod) => {
//     const currentUser = authUser?.user;
//     if (!currentUser || !currentUser.id) {
//       throw new Error("User not authenticated");
//     }

//     if (!cartItems || cartItems.length === 0) {
//       throw new Error("Cart is empty");
//     }

//     const items = cartItems.map(item => ({
//       product_id: item.id,
//       product_name: item.name,
//       quantity: item.quantity,
//       price: item.price
//     }));

//     const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//     try {
//       const result = await createOrder({
//         user_id: currentUser.id,
//         items: items,
//         payment_method: paymentMethod,
//         total_amount: totalAmount
//       });

//       await loadAllData();
//       return {
//         success: true,
//         message: result.message || `✅ Order placed successfully!`
//       };
//     } catch (err) {
//       console.error("Checkout error:", err);
//       return {
//         success: false,
//         message: err.message || "Checkout failed. Please try again."
//       };
//     }
//   };

//   const handleLogout = () => {
//     setAuthUser(null);
//     setPage("home");
//     setPendingRegister(null);
//     setMessage("");
//     setCart([]);
//   };

//   const userForDashboard = authUser?.role === "user"
//     ? { ...authUser, onLogout: handleLogout }
//     : authUser;

//   const navigateToLogin = () => setPage("login");
//   const navigateToRegister = () => setPage("register");

//   return (
//     <div className="app-root">
//       {page === "home" && (
//         <Homepage
//           onLoginClick={navigateToLogin}
//           onRegisterClick={navigateToRegister}
//         />
//       )}

//       {page === "login" && (
//         <div className="auth-page">
//           <div className="auth-container">
//             <LoginForm
//               onAdminLogin={handleAdminLogin}
//               onUserLogin={handleUserLogin}
//               onShowRegister={handleShowRegister}
//             />
//           </div>
//         </div>
//       )}

//       {page === "register" && (
//         <div className="auth-page">
//           <div className="auth-container">
//             <RegisterForm
//               prefill={pendingRegister}
//               onRegistered={handleRegistered}
//               onCancel={() => setPage("login")}
//             />
//           </div>
//         </div>
//       )}

//       {page === "admin" && (
//         <AdminDashboard
//           user={authUser}
//           users={users}
//           products={products}
//           orders={orders}
//           onLogout={handleLogout}
//           onAddProduct={handleAddProduct}
//           message={message}
//         />
//       )}

//       {page === "user" && (
//         <UserDashboard
//           user={userForDashboard}
//           products={products}
//           orders={orders}
//           onLogout={handleLogout}
//           cart={cart}
//           setCart={setCart}
//           onCheckout={handleCartCheckout}
//           message={message}
//         />
//       )}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;