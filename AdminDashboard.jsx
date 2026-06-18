import { useMemo, useState } from "react";
import Header from "./Header";
import StatsCards from "./StatsCards";
import UsersTable from "./UsersTable";
import ProductTable from "./ProductTable";
import OrdersTable from "./OrdersTable";
import { getProductMeta, normalizeText } from "../data/productIcons";

export default function AdminDashboard({
  user,
  users,
  products,
  orders,
  onLogout,
  onAddProduct,
  message,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [previewName, setPreviewName] = useState("");
  const [toast, setToast] = useState(null);

  const preview = useMemo(() => getProductMeta(previewName), [previewName]);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3500);
  };

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

    const result = await onAddProduct({
      name: cleanedName,
      price: Number(price),
      stock: Number(stock),
      vendor_id: 0,   // admin can use 0

    });

    if (result && result.updated) {
      showToast(result.message, "info");
    } else {
      showToast(result.message, "success");
    }

    setName("");
    setPrice("");
    setStock("");
    setPreviewName("");
  };

  return (
    <div className="admin-dashboard-container">
      <Header
        title="Admin Dashboard"
        subtitle="Manage users, products, and orders."
        user={user}
        onLogout={onLogout}
      />

      <StatsCards users={users} products={products} orders={orders} />

      {/* Toast Notification */}
      {toast && (
        <div className={`custom-toast-top ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✅" : toast.type === "info" ? "ℹ️" : "❌"}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)}>×</button>
        </div>
      )}

      <div className="admin-dashboard-grid">
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
                // Dairy Products
                "milk", "yogurt", "butter", "cheese", "eggs", "cream",
                "ice cream", "paneer", "ghee", "buttermilk",

                // Bakery Products
                "bread", "cake", "croissant", "donut", "bagel", "muffin",
                "pancake", "waffle", "brownie", "cookie", "biscuits",

                // Snacks
                "cookies", "chips", "popcorn", "pretzel", "nachos", "crackers",
                "granola bar", "nuts", "trail mix", "chocolate", "candy", "gum", "mints",

                // Grocery
                "rice", "flour", "sugar", "salt", "oil", "pasta", "noodles",
                "lentils", "beans", "cereal", "oatmeal", "spices", "vinegar",
                "soy sauce", "ketchup",

                // Beverages
                "tea", "coffee", "juice", "soda", "water", "energy drink",
                "smoothie", "milkshake", "hot chocolate", "lemonade",

                // Fruits
                "apple", "banana", "orange", "grapes", "strawberry", "watermelon",
                "pineapple", "mango", "peach", "cherry", "kiwi", "lemon", "pear",
                "plum", "blueberry",

                // Vegetables
                "potato", "tomato", "onion", "carrot", "broccoli", "cucumber",
                "pepper", "corn", "mushroom", "spinach", "lettuce", "cabbage",
                "cauliflower", "pumpkin", "radish",

                // Meat & Protein
                "chicken", "beef", "fish", "shrimp", "tofu", "tempeh",

                // Sauces & Condiments
                "mayonnaise", "mustard", "hot sauce", "bbq sauce", "pesto", "hummus",

                // Frozen Foods
                "frozen pizza", "frozen vegetables", "french fries",

                // Household
                "detergent", "soap", "paper towel", "trash bag",

                // Baby & Pet
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
                <div className="preview-category">
                  {preview?.category || "food"}
                </div>
              </div>
            </div>
          </div>

          <UsersTable users={users} />
        </div>

        <div className="admin-right-column">
          <ProductTable products={products} />
          <OrdersTable orders={orders} currentUserEmail={null} users={users} />
        </div>
      </div>
    </div>
  );
}