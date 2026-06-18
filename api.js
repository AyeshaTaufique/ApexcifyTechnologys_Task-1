// frontend/src/services/api.js
const USER_API = "http://localhost:5001";
const PRODUCT_API = "http://localhost:5002";
const ORDER_API = "http://localhost:5003";
const PAYMENT_API = "http://localhost:5004";
const REVIEW_API = "http://localhost:5005";

// Helper functions
const getFriendlyErrorMessage = (error, serviceName) => {
  if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
    return `⚠️ ${serviceName} service is currently unavailable. Please try again later.`;
  }
  if (error.code === 'ECONNREFUSED') {
    return `⚠️ Cannot connect to ${serviceName} service. It might be down.`;
  }
  if (error.name === 'TimeoutError') {
    return `⏱️ ${serviceName} service is taking too long. Please try again.`;
  }
  return error.message || `${serviceName} service error`;
};

const handleFetch = async (url, options, serviceName) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      let errorMessage;
      try {
        const err = await res.json();
        errorMessage = err.detail || err.message || `HTTP ${res.status}`;
      } catch {
        errorMessage = `HTTP ${res.status}: ${res.statusText}`;
      }
      if (res.status === 404) throw new Error(`❌ ${serviceName} not found. Please check if the service is running.`);
      if (res.status === 500) throw new Error(`❌ ${serviceName} internal error. Please try again.`);
      if (res.status === 503) throw new Error(`⚠️ ${serviceName} is temporarily unavailable.`);
      throw new Error(errorMessage);
    }
    return res.json();
  } catch (error) {
    console.error(`${serviceName} error:`, error);
    throw new Error(getFriendlyErrorMessage(error, serviceName));
  }
};

// ----- User Service -----
export async function loginUser(email, password) {
  return handleFetch(`${USER_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }, "Login");
}

export async function registerUser(username, email, password, address = "", phone = "", role = "customer") {
  return handleFetch(`${USER_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, address, phone, role }),
  }, "Registration");
}

export async function getUsers() {
  return handleFetch(`${USER_API}/users`, {}, "User data");
}

export async function getUserById(userId) {
  return handleFetch(`${USER_API}/users/${userId}`, {}, "User data");
}

export async function updateUserAddress(userId, address) {
  return handleFetch(`${USER_API}/users/${userId}/address`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  }, "Address update");
}

export async function updateUserPhone(userId, phone) {
  return handleFetch(`${USER_API}/users/${userId}/phone`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(phone),
  }, "Phone update");
}

export async function updateUser(userId, userData) {
  return handleFetch(`${USER_API}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }, "User update");
}

// ----- Product Service -----
export async function getProducts() {
  return handleFetch(`${PRODUCT_API}/products`, {}, "Product list");
}

export async function getProductById(productId) {
  return handleFetch(`${PRODUCT_API}/products/${productId}`, {}, "Product details");
}

export async function addProduct(product) {
  return handleFetch(`${PRODUCT_API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }, "Product addition");
}

export async function reduceStock(productId, quantity) {
  return handleFetch(`${PRODUCT_API}/products/${productId}/reduce-stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  }, "Stock update");
}

export async function getVendorProducts(vendorId) {
  return handleFetch(`${PRODUCT_API}/products?vendor_id=${vendorId}`, {}, "Vendor products");
}

// ----- Order Service -----
export async function getOrders() {
  return handleFetch(`${ORDER_API}/orders`, {}, "Order list");
}

export async function getOrderById(orderId) {
  return handleFetch(`${ORDER_API}/orders/${orderId}`, {}, "Order details");
}

export async function createOrder(orderData) {
  try {
    const res = await fetch(`${ORDER_API}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      let errorMessage;
      try {
        const err = await res.json();
        errorMessage = err.detail || err.message;
      } catch {
        errorMessage = `Server responded with ${res.status}`;
      }
      if (res.status === 0 || errorMessage.includes('Failed to fetch'))
        throw new Error("⚠️ Order service is currently unavailable. Please try again later.");
      if (res.status === 400) throw new Error(`📦 ${errorMessage || "Invalid order details"}`);
      if (res.status === 402) throw new Error("💳 Payment failed. Please check your payment method.");
      if (res.status === 404) throw new Error("🔍 Product or User not found. Please refresh and try again.");
      throw new Error(errorMessage || "Order placement failed");
    }
    return res.json();
  } catch (error) {
    console.error("Order creation error:", error);
    if (error.message === 'Failed to fetch' || error.message === 'NetworkError when attempting to fetch resource' ||
        error.message.includes('unavailable') || error.name === 'TypeError') {
      throw new Error("⚠️ Order service is currently unavailable. Please try again later.");
    }
    throw error;
  }
}

export async function updateOrderStatus(orderId, status) {
  return handleFetch(`${ORDER_API}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  }, "Order status update");
}

// ----- Payment Service -----
export async function processPayment(paymentData) {
  return handleFetch(`${PAYMENT_API}/pay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  }, "Payment processing");
}

export async function getPayments() {
  return handleFetch(`${PAYMENT_API}/payments`, {}, "Payment history");
}

// ----- Review Service -----
export async function getReviews(productId) {
  return handleFetch(`${REVIEW_API}/reviews/${productId}`, {}, "Product reviews");
}

export async function addReview(productId, userId, rating, comment) {
  return handleFetch(`${REVIEW_API}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, user_id: userId, rating, comment }),
  }, "Add review");
}
// // Use environment variables for cloud URLs
// // frontend/src/services/api.js
// const USER_API = "http://localhost:5001";
// const PRODUCT_API = "http://localhost:5002";
// const ORDER_API = "http://localhost:5003";
// const PAYMENT_API = "http://localhost:5004";
// const REVIEW_API = "http://localhost:5005";

// export async function getReviews(productId) {
//   const res = await fetch(`${REVIEW_API}/reviews/${productId}`);
//   return res.json();
// }

// export async function addReview(productId, userId, rating, comment) {
//   const res = await fetch(`${REVIEW_API}/reviews`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ product_id: productId, user_id: userId, rating, comment })
//   });
//   return res.json();
// }

// // Vendor products
// export async function getVendorProducts(vendorId) {
//   const res = await fetch(`${PRODUCT_API}/products?vendor_id=${vendorId}`);
//   return res.json();
// }

// // Update order status (admin/vendor)
// export async function updateOrderStatus(orderId, status) {
//   const res = await fetch(`${ORDER_API}/orders/${orderId}/status`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status })
//   });
//   return res.json();
// }

// // … rest of your api.js unchanged, but ensure all functions use these variables.


// // Helper function to get user-friendly error messages
// const getFriendlyErrorMessage = (error, serviceName) => {
//   // Network errors (service down)
//   if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
//     return `⚠️ ${serviceName} service is currently unavailable. Please try again later.`;
//   }
  
//   // Connection refused
//   if (error.code === 'ECONNREFUSED') {
//     return `⚠️ Cannot connect to ${serviceName} service. It might be down.`;
//   }
  
//   // Timeout errors
//   if (error.name === 'TimeoutError') {
//     return `⏱️ ${serviceName} service is taking too long to respond. Please try again.`;
//   }
  
//   // Return the original error message if available
//   return error.message || `${serviceName} service error`;
// };

// // Helper to handle fetch with better error messages
// const handleFetch = async (url, options, serviceName) => {
//   try {
//     const res = await fetch(url, options);
    
//     if (!res.ok) {
//       let errorMessage;
//       try {
//         const err = await res.json();
//         errorMessage = err.detail || err.message || `HTTP ${res.status}`;
//       } catch {
//         errorMessage = `HTTP ${res.status}: ${res.statusText}`;
//       }
      
//       // Custom messages for specific status codes
//       if (res.status === 404) {
//         throw new Error(`❌ ${serviceName} not found. Please check if the service is running.`);
//       } else if (res.status === 500) {
//         throw new Error(`❌ ${serviceName} internal error. Please try again.`);
//       } else if (res.status === 503) {
//         throw new Error(`⚠️ ${serviceName} is temporarily unavailable.`);
//       }
      
//       throw new Error(errorMessage);
//     }
    
//     return res.json();
//   } catch (error) {
//     console.error(`${serviceName} error:`, error);
//     throw new Error(getFriendlyErrorMessage(error, serviceName));
//   }
// };

// // User Service APIs
// export async function loginUser(email, password) {
//   return handleFetch(
//     `${USER_API}/login`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     },
//     "Login"
//   );
// }

// export async function registerUser(username, email, password, address = "", phone = "") {
//   return handleFetch(
//     `${USER_API}/register`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, email, password, address, phone }),
//     },
//     "Registration"
//   );
// }

// export async function getUsers() {
//   return handleFetch(`${USER_API}/users`, {}, "User data");
// }

// export async function getUserById(userId) {
//   return handleFetch(`${USER_API}/users/${userId}`, {}, "User data");
// }

// export async function updateUserAddress(userId, address) {
//   return handleFetch(
//     `${USER_API}/users/${userId}/address`,
//     {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(address),
//     },
//     "Address update"
//   );
// }

// export async function updateUserPhone(userId, phone) {
//   return handleFetch(
//     `${USER_API}/users/${userId}/phone`,
//     {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(phone),
//     },
//     "Phone update"
//   );
// }

// export async function updateUser(userId, userData) {
//   return handleFetch(
//     `${USER_API}/users/${userId}`,
//     {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     },
//     "User update"
//   );
// }

// // Product Service APIs
// export async function getProducts() {
//   return handleFetch(`${PRODUCT_API}/products`, {}, "Product list");
// }

// export async function getProductById(productId) {
//   return handleFetch(`${PRODUCT_API}/products/${productId}`, {}, "Product details");
// }

// export async function addProduct(product) {
//   return handleFetch(
//     `${PRODUCT_API}/products`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     },
//     "Product addition"
//   );
// }

// export async function reduceStock(productId, quantity) {
//   return handleFetch(
//     `${PRODUCT_API}/products/${productId}/reduce-stock`,
//     {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity }),
//     },
//     "Stock update"
//   );
// }

// // Order Service APIs
// export async function getOrders() {
//   return handleFetch(`${ORDER_API}/orders`, {}, "Order list");
// }

// export async function getOrderById(orderId) {
//   return handleFetch(`${ORDER_API}/orders/${orderId}`, {}, "Order details");
// }

// export async function createOrder(orderData) {
//   try {
//     const res = await fetch(`${ORDER_API}/orders`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     });

//     if (!res.ok) {
//       let errorMessage;
//       try {
//         const err = await res.json();
//         errorMessage = err.detail || err.message;
//       } catch {
//         errorMessage = `Server responded with ${res.status}`;
//       }
      
//       if (res.status === 0 || errorMessage.includes('Failed to fetch')) {
//         throw new Error("⚠️ Order service is currently unavailable. Please try again later.");
//       }
      
//       if (res.status === 400) {
//         throw new Error(`📦 ${errorMessage || "Invalid order details"}`);
//       }
      
//       if (res.status === 402) {
//         throw new Error("💳 Payment failed. Please check your payment method.");
//       }
      
//       if (res.status === 404) {
//         throw new Error("🔍 Product or User not found. Please refresh and try again.");
//       }
      
//       throw new Error(errorMessage || "Order placement failed");
//     }

//     return res.json();
//   } catch (error) {
//     console.error("Order creation error:", error);
    
//     // Handle all network-related errors
//     if (error.message === 'Failed to fetch' || 
//         error.message === 'NetworkError when attempting to fetch resource' ||
//         error.message.includes('unavailable') ||
//         error.name === 'TypeError') {
//       throw new Error("⚠️ Order service is currently unavailable. Please try again later.");
//     }
    
//     throw error;
//   }
// }
// // Payment Service APIs
// export async function processPayment(paymentData) {
//   return handleFetch(
//     `${PAYMENT_API}/pay`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(paymentData),
//     },
//     "Payment processing"
//   );
// }

// export async function getPayments() {
//   return handleFetch(`${PAYMENT_API}/payments`, {}, "Payment history");
// }
