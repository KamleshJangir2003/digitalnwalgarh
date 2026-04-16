export default function UserDashboard({ user, onLogout, onShop }) {
  return (
    <section className="auth-page container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h2>Welcome, {user.name}! 👋</h2>
            <p className="auth-sub">{user.email}</p>
            <span className="role-badge role-badge--user">User</span>
          </div>
        </div>

        <div className="dashboard-stats">
          {[
            { icon: '🛒', label: 'My Orders', value: '0' },
            { icon: '❤️', label: 'Wishlist', value: '0' },
            { icon: '📦', label: 'Downloads', value: '0' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="dash-stat-card">
              <span className="dash-stat-icon">{icon}</span>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="dashboard-actions">
          <button type="button" className="primary-action" onClick={onShop}>
            🛍 Browse Products
          </button>
          <button type="button" className="ghost-button" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </section>
  )
}
