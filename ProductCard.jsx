// frontend/src/components/ProductCard.jsx
import { useState } from "react";
import { getProductIcon, getProductCategory } from "../data/productIcons";

export default function ProductCard({ product, onAddToCart, onViewReviews }) {
  const stock = Number(product.stock || 0);
  const isOutOfStock = stock === 0;
  const [quantity, setQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const handleIncrement = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };
  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity);
      setQuantity(0);
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 500);
    }
  };

  return (
    <div className="product-card-modern">
      <div className="product-icon-modern">{getProductIcon(product.name)}</div>
      <div className="product-name-modern" title={product.name}>
        {product.name.length > 15 ? product.name.substring(0, 12) + '...' : product.name}
      </div>
      <div className="product-category-modern">{getProductCategory(product.name)}</div>
      <div className="product-price-modern">Rs{product.price}</div>

      {/* Reviews button */}
      <button className="btn secondary small" onClick={() => onViewReviews(product)} style={{ marginBottom: "8px" }}>
        📝 Reviews
      </button>

      {isOutOfStock ? (
        <button className="add-to-cart-btn out-of-stock-btn" disabled>Out of Stock</button>
      ) : quantity === 0 ? (
        <button className="add-to-cart-btn" onClick={() => setQuantity(1)}>Add to Cart</button>
      ) : (
        <div className="quantity-selector">
          <button className="qty-btn" onClick={handleDecrement} disabled={quantity === 0}>−</button>
          <span className="qty-value">{quantity}</span>
          <button className="qty-btn" onClick={handleIncrement} disabled={quantity >= stock}>+</button>
          <button className={`add-btn ${isAdding ? 'added' : ''}`} onClick={handleAddToCart}>
            {isAdding ? '✓ Added!' : 'Add'}
          </button>
        </div>
      )}
    </div>
  );
}
// import { useState } from "react";
// import { getProductIcon, getProductCategory } from "../data/productIcons";

// export default function ProductCard({ product, onAddToCart }) {
//   const stock = Number(product.stock || 0);
//   const isOutOfStock = stock === 0;
//   const [quantity, setQuantity] = useState(0);
//   const [isAdding, setIsAdding] = useState(false);

//   const handleIncrement = () => {
//     if (quantity < stock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const handleDecrement = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//   };

//   // ... inside the return, after the price or before the add-to-cart section:
//   <button
//     className="btn secondary small"
//     onClick={() => onViewReviews(product)}
//     style={{ marginBottom: "8px" }}
//   >
//     📝 Reviews
//   </button>

//   const handleAddToCart = () => {
//     if (quantity > 0) {
//       onAddToCart(product, quantity);
//       setQuantity(0);
//       setIsAdding(true);
//       setTimeout(() => setIsAdding(false), 500);
//     }
//   };

//   return (
//     <div className="product-card-modern">
//       <div className="product-icon-modern">{getProductIcon(product.name)}</div>
//       <div className="product-name-modern" title={product.name}>
//         {product.name.length > 15 ? product.name.substring(0, 12) + '...' : product.name}
//       </div>
//       <div className="product-category-modern">{getProductCategory(product.name)}</div>
//       <div className="product-price-modern">RS {product.price}</div>



//       {isOutOfStock ? (
//         <button className="add-to-cart-btn out-of-stock-btn" disabled>
//           Out of Stock
//         </button>
//       ) : quantity === 0 ? (
//         <button
//           className="add-to-cart-btn"
//           onClick={() => setQuantity(1)}
//         >
//           Add to Cart
//         </button>
//       ) : (
//         <div className="quantity-selector">
//           <button
//             className="qty-btn"
//             onClick={handleDecrement}
//             disabled={quantity === 0}
//           >
//             −
//           </button>
//           <span className="qty-value">{quantity}</span>
//           <button
//             className="qty-btn"
//             onClick={handleIncrement}
//             disabled={quantity >= stock}
//           >
//             +
//           </button>
//           <button
//             className={`add-btn ${isAdding ? 'added' : ''}`}
//             onClick={handleAddToCart}
//           >
//             {isAdding ? '✓ Added!' : 'Add'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }