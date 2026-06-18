export default function ProductTable({ products }) {
  return (
    <div className="admin-table-card">
      <div className="card-header">
        <span className="card-icon">🛍️</span>
        <h3>All Products</h3>
        <span className="product-count">{products.length} products</span>
      </div>
      <div className="table-container">
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="product-id">#{product.id}</td>
                  <td>
                    <div className="product-cell">
                      <span className="product-icon-small"></span>
                      {product.name}
                    </div>
                  </td>
                  <td className="product-price">RS {product.price}</td>
                  <td>
                    <span className={`stock-badge ${product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'in'}`}>
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="empty-state">
              <span>📦</span>
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
