import { useState, useEffect } from 'react'

const API = 'http://localhost:5000/api/auth'

export default function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    await fetch(`${API}/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    setUsers(prev => prev.filter(u => u._id !== id))
  }

  return (
    <section className="auth-page container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-avatar admin-avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h2>Admin Dashboard 🛡</h2>
            <p className="auth-sub">{user.email}</p>
            <span className="role-badge role-badge--admin">Admin</span>
          </div>
          <button type="button" className="ghost-button" style={{ marginLeft: 'auto' }} onClick={onLogout}>
            🚪 Logout
          </button>
        </div>

        <div className="dashboard-stats">
          {[
            { icon: '👥', label: 'Total Users', value: users.length },
            { icon: '📦', label: 'Products', value: '80+' },
            { icon: '💰', label: 'Revenue', value: 'Rs. 0' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="dash-stat-card">
              <span className="dash-stat-icon">{icon}</span>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="admin-users-section">
          <h3>All Registered Users</h3>
          {loading && <p>Loading users...</p>}
          {error && <div className="auth-error">{error}</div>}
          {!loading && !error && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u._id}>
                      <td>{i + 1}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className={`role-badge role-badge--${u.role}`}>{u.role}</span></td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u._id !== user.id && (
                          <button type="button" className="delete-btn" onClick={() => handleDelete(u._id)}>
                            🗑 Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
