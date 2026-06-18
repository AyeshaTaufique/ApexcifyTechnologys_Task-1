// frontend/src/components/VendorDashboard.jsx
import { useState, useMemo, useEffect } from "react";
import { getProductMeta, normalizeText } from "../data/productIcons";
import { addProduct, getVendorProducts, getOrders, updateOrderStatus } from "../services/api";

export default function VendorDashboard({ user, products, orders, onLogout, onAddProduct, message }) {
    const vendorId = user?.user?.id;
    const [vendorProducts, setVendorProducts] = useState([]);
    const [vendorOrders, setVendorOrders] = useState([]);
    const [toast, setToast] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [previewName, setPreviewName] = useState("");
    const preview = useMemo(() => getProductMeta(previewName), [previewName]);

    const showToast = (msg, type = "success") => {
        setToast({ message: msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    // Load vendor's products and relevant orders
    useEffect(() => {
        if (vendorId) {
            getVendorProducts(vendorId)
                .then(setVendorProducts)
                .catch(err => console.error("Failed to load vendor products", err));
            getOrders()
                .then(allOrders => {
                    const filtered = allOrders.filter(order =>
                        order.items.some(item => vendorProducts.some(p => p.id === item.product_id))
                    );
                    setVendorOrders(filtered);
                })
                .catch(err => console.error("Failed to load orders", err));
        }
    }, [vendorId, vendorProducts]);

    const handleSubmit = async () => {
        const cleanedName = name.trim();
        const meta = getProductMeta(cleanedName);

        if (!cleanedName) {
            showToast("Enter a product name", "error");
            return;
        }
        if (!meta) {
            showToast("This product is not in the allowed food catalog.", "error");
            return;
        }
        if (!price || Number(price) <= 0) {
            showToast("Please enter a valid price", "error");
            return;
        }
        if (!stock || Number(stock) < 0) {
            showToast("Please enter a valid stock quantity", "error");
            return;
        }

        try {
            // Use the global onAddProduct (passed from App) which already handles vendor_id
            const result = await onAddProduct({
                name: cleanedName,
                price: Number(price),
                stock: Number(stock),
                vendor_id: vendorId,
            });
            showToast(result.message, result.updated ? "info" : "success");
            setName("");
            setPrice("");
            setStock("");
            setPreviewName("");
            // Refresh products list
            const updated = await getVendorProducts(vendorId);
            setVendorProducts(updated);
        } catch (err) {
            showToast(err.message || "Failed to add product", "error");
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            showToast(`Order ${orderId} status updated to ${newStatus}`, "success");
            // Refresh orders
            const allOrders = await getOrders();
            const filtered = allOrders.filter(order =>
                order.items.some(item => vendorProducts.some(p => p.id === item.product_id))
            );
            setVendorOrders(filtered);
        } catch (err) {
            showToast(err.message, "error");
        }
    };

    return (
        <div className="admin-dashboard-container">   {/* reuse admin container styles */}
            <div className="dashboard-header">
                <div className="header-left">
                    <div className="logo-icon-small">🛒</div>
                    <div>
                        <h1>Vendor Dashboard</h1>
                        <p>Manage your products and orders</p>
                    </div>
                </div>
                <div className="header-right">
                    <div className="user-pill-modern">
                        <span className="user-avatar">👤</span>
                        <span>{user?.user?.username || "Vendor"}</span>
                    </div>
                    <button className="logout-btn" onClick={onLogout}>Logout</button>
                </div>
            </div>

            {toast && (
                <div className={`custom-toast-top ${toast.type}`}>
                    <span className="toast-message">{toast.message}</span>
                    <button className="toast-close" onClick={() => setToast(null)}>×</button>
                </div>
            )}

            <div className="admin-dashboard-grid">
                {/* Left column – Add Product card */}
                <div className="admin-left-column">
                    <div className="admin-add-product-card">
                        <div className="card-header">
                            <span className="card-icon">➕</span>
                            <h3>Add New Product</h3>
                        </div>

                        <div className="add-product-form">
                            <div className="form-group">
                                <label className="form-label">Product Name</label>
                                <input
                                    className="form-input"
                                    placeholder="e.g., Fresh Milk"
                                    list="food-products"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setPreviewName(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Price (Rs)</label>
                                    <input
                                        className="form-input"
                                        placeholder="0.00"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Stock Quantity</label>
                                    <input
                                        className="form-input"
                                        placeholder="0"
                                        type="number"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button className="submit-btn" onClick={handleSubmit}>
                                + Add Product
                            </button>
                        </div>

                        <datalist id="food-products">
                            {[
                                "milk", "yogurt", "butter", "cheese", "eggs", "cream", "ice cream", "paneer", "ghee", "buttermilk",
                                "bread", "cake", "croissant", "donut", "bagel", "muffin", "pancake", "waffle", "brownie", "cookie", "biscuits",
                                "chips", "popcorn", "pretzel", "nachos", "crackers", "granola bar", "nuts", "trail mix", "chocolate", "candy", "gum", "mints",
                                "rice", "flour", "sugar", "salt", "oil", "pasta", "noodles", "lentils", "beans", "cereal", "oatmeal", "spices", "vinegar", "soy sauce", "ketchup",
                                "tea", "coffee", "juice", "soda", "water", "energy drink", "smoothie", "milkshake", "hot chocolate", "lemonade",
                                "apple", "banana", "orange", "grapes", "strawberry", "watermelon", "pineapple", "mango", "peach", "cherry", "kiwi", "lemon", "pear", "plum", "blueberry",
                                "potato", "tomato", "onion", "carrot", "broccoli", "cucumber", "pepper", "corn", "mushroom", "spinach", "lettuce", "cabbage", "cauliflower", "pumpkin", "radish",
                                "chicken", "beef", "fish", "shrimp", "tofu", "tempeh",
                                "mayonnaise", "mustard", "hot sauce", "bbq sauce", "pesto", "hummus",
                                "frozen pizza", "frozen vegetables", "french fries",
                                "detergent", "soap", "paper towel", "trash bag",
                                "baby food", "dog food", "cat food"
                            ].map((item) => (
                                <option key={item} value={item} />
                            ))}
                        </datalist>

                        <div className="preview-section">
                            <div className="preview-icon-large">{preview?.icon || "🛒"}</div>
                            <div className="preview-info">
                                <div className="preview-label">Icon Preview</div>
                                <div className="preview-name">
                                    {previewName ? normalizeText(previewName) : "type a product name"}
                                </div>
                                <div className="preview-category">{preview?.category || "food"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-table-card" style={{ marginTop: "20px" }}>
                        <div className="card-header">
                            <span className="card-icon">📦</span>
                            <h3>Your Products</h3>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr><th>Name</th><th>Price</th><th>Stock</th></tr>
                                </thead>
                                <tbody>
                                    {vendorProducts.map(p => (
                                        <tr key={p.id}>
                                            <td style={{ maxWidth: "200px", wordBreak: "break-word" }} title={p.name}>
                                                {p.name}
                                            </td>
                                            <td>Rs {p.price}</td>
                                            <td>{p.stock}</td>
                                        </tr>
                                    ))}
                                    {vendorProducts.length === 0 && (
                                        <tr><td colSpan="3" className="empty-state">No products yet</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right column – Orders that contain vendor’s products */}
                <div className="admin-right-column">
                    <div className="admin-table-card">
                        <div className="card-header">
                            <span className="card-icon">📋</span>
                            <h3>Orders for Your Products</h3>
                        </div>
                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    {vendorOrders.map(order => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.user_email}</td>
                                            <td>{order.items.map(i => `${i.product_name} (x${i.quantity})`).join(", ")}</td>
                                            <td>Rs {order.total_amount}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    style={{ padding: "4px", borderRadius: "8px" }}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {vendorOrders.length === 0 && (
                                        <tr><td colSpan="6" className="empty-state">No orders yet</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}