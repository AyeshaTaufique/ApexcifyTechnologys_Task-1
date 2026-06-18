export default function StatsCards({ users, products, orders }) {
  const totalStock = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0
  );

  const cards = [
    { label: "Registered Users", value: users.length, icon: "👥", color: "#FF7A00" },
    { label: "Products", value: products.length, icon: "🛍️", color: "#4CAF50" },
    { label: "Orders", value: orders.length, icon: "📦", color: "#FF7A00" },
    { label: "Total Stock", value: totalStock, icon: "📊", color: "#0F172A" },
  ];

  return (
    <div className="stats-grid-modern">
      {cards.map((card) => (
        <div className="stat-card-modern" key={card.label}>
          <div className="stat-icon-modern" style={{ background: `${card.color}15`, color: card.color }}>
            {card.icon}
          </div>
          <div className="stat-content">
            <div className="stat-value-modern">{card.value}</div>
            <div className="stat-label-modern">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}