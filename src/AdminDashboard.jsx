import { useState, useEffect } from 'react'
import './AdminDashboard.css'

const API = 'http://localhost:5000/api/auth'
const SHOP_API = 'http://localhost:5000/api/shop'

const CATEGORIES = ['Marketing', 'Course', 'E-Books', 'Business']
const PRODUCT_COUNTS = { Marketing: 20, Course: 20, 'E-Books': 20, Business: 20 }

const NAV = [
  { key: 'overview', icon: '📊', label: 'Overview' },
  { key: 'orders',   icon: '🛒', label: 'Orders' },
  { key: 'users',    icon: '👥', label: 'Users' },
  { key: 'messages', icon: '💬', label: 'Messages' },
]

export default function AdminDashboard({ user, onLogout }) {
  const [tab, setTab] = useState('overview')
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [regError, setRegError] = useState('')
  const [regSuccess, setRegSuccess] = useState('')
  const [regLoading, setRegLoading] = useState(false)
  const [showRegForm, setShowRegForm] = useState(false)

  const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [uRes, oRes, mRes] = await Promise.all([
        fetch(`${API}/users`, { headers }),
        fetch(`${SHOP_API}/orders`, { headers }),
        fetch(`${SHOP_API}/contact`, { headers }),
      ])
      setUsers(await uRes.json())
      setOrders(await oRes.json())
      setMessages(await mRes.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user?')) return
    await fetch(`${API}/users/${id}`, { method: 'DELETE', headers })
    setUsers(prev => prev.filter(u => u._id !== id))
  }

  const handleDeleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return
    await fetch(`${SHOP_API}/orders/${id}`, { method: 'DELETE', headers })
    setOrders(prev => prev.filter(o => o._id !== id))
  }

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return
    await fetch(`${SHOP_API}/contact/${id}`, { method: 'DELETE', headers })
    setMessages(prev => prev.filter(m => m._id !== id))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError(''); setRegSuccess(''); setRegLoading(true)
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setRegSuccess(`"${regForm.name}" registered successfully!`)
      setRegForm({ name: '', email: '', password: '', role: 'user' })
      fetchAll()
    } catch (err) {
      setRegError(err.message)
    } finally {
      setRegLoading(false)
    }
  }

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed'
    await fetch(`${SHOP_API}/orders/${id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o))
  }

  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [replySending, setReplySending] = useState(false)

  const handleReply = async (m) => {
    if (!replyText.trim()) return
    setReplySending(true)
    try {
      await fetch(`${SHOP_API}/contact/reply`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: m.email, name: m.name, message: replyText }),
      })
      setReplyingTo(null)
      setReplyText('')
      alert(`Reply sent to ${m.email}`)
    } catch (err) {
      alert('Failed to send reply')
    } finally {
      setReplySending(false)
    }
  }

  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)

  const tabLabel = NAV.find(n => n.key === tab)?.label || ''

  return (
    <div className="admin-shell">

      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <h1>⚡ DigiHook</h1>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-sidebar__nav">
          {NAV.map(n => (
            <button
              key={n.key}
              type="button"
              className={`admin-nav-btn${tab === n.key ? ' active' : ''}`}
              onClick={() => setTab(n.key)}
            >
              <span className="nav-icon">{n.icon}</span>
              {n.label}
              {n.key === 'messages' && messages.length > 0 && (
                <span className="admin-nav-badge">{messages.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div className="admin-sidebar__user-info">
              <p>{user.name.split(' ')[0]}</p>
              <span>Administrator</span>
            </div>
          </div>
          <button type="button" className="admin-logout-btn" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="admin-main">

        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h2>{tabLabel}</h2>
            <p>Welcome back, {user.name} · {user.email}</p>
          </div>
          <div className="admin-topbar__right">
            <span className="admin-status-dot" />
            <span style={{ fontSize: '.78rem', color: '#64748b' }}>Live</span>
          </div>
        </div>

        <div className="admin-content">
          {loading && <div className="admin-loading">⏳ Loading data...</div>}
          {error && <div className="admin-alert admin-alert--error">⚠ {error}</div>}

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && !loading && (
            <>
              <div className="admin-stats-grid">
                {[
                  { icon: '👥', label: 'Total Users',   value: users.length },
                  { icon: '🛒', label: 'Total Orders',  value: orders.length },
                  { icon: '💰', label: 'Revenue',       value: `Rs. ${revenue.toFixed(0)}` },
                  { icon: '💬', label: 'Messages',      value: messages.length },
                  { icon: '📦', label: 'Products',      value: 80 },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="admin-stat-card">
                    <span className="admin-stat-card__icon">{icon}</span>
                    <strong className="admin-stat-card__value">{value}</strong>
                    <span className="admin-stat-card__label">{label}</span>
                  </div>
                ))}
              </div>

              {/* Products by Category */}
              <div className="admin-section">
                <div className="admin-section__head">
                  <h3>📦 Products by Category</h3>
                </div>
                <div className="admin-cat-grid">
                  {CATEGORIES.map(cat => (
                    <div key={cat} className="admin-cat-card">
                      <strong>{PRODUCT_COUNTS[cat]}</strong>
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="admin-section">
                <div className="admin-section__head">
                  <h3>🛒 Recent Orders</h3>
                  <span>Last 5</span>
                </div>
                {orders.length === 0 ? (
                  <p className="admin-empty">No orders yet.</p>
                ) : (
                  <div className="admin-tbl-wrap">
                    <table className="admin-tbl">
                      <thead>
                        <tr><th>#</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th></tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((o, i) => (
                          <tr key={o._id}>
                            <td>{i + 1}</td>
                            <td>{o.userName}<br /><small style={{ color: '#64748b' }}>{o.userEmail}</small></td>
                            <td>{o.items?.length} item(s)</td>
                            <td><strong style={{ color: '#a78bfa' }}>Rs. {o.total?.toFixed(0)}</strong></td>
                            <td>{o.paymentMethod}</td>
                            <td><span className={`a-badge a-badge--${o.status === 'Completed' ? 'completed' : 'pending'}`}>{o.status || 'Pending'}</span></td>
                            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── ORDERS ── */}
          {tab === 'orders' && !loading && (
            <div className="admin-section">
              <div className="admin-section__head">
                <h3>All Orders</h3>
                <span>{orders.length} total</span>
              </div>
              {orders.length === 0 ? (
                <p className="admin-empty">No orders yet.</p>
              ) : (
                <div className="admin-tbl-wrap">
                  <table className="admin-tbl">
                    <thead>
                      <tr><th>#</th><th>Customer</th><th>Products</th><th>Total</th><th>Payment</th><th>Status</th><th>Date</th><th></th></tr>
                    </thead>
                    <tbody>
                      {orders.map((o, i) => (
                        <tr key={o._id}>
                          <td>{i + 1}</td>
                          <td>{o.userName}<br /><small style={{ color: '#64748b' }}>{o.userEmail}</small></td>
                          <td>
                            {o.items?.map((item, idx) => (
                              <div key={idx} style={{ fontSize: '.78rem', color: '#94a3b8' }}>{item.name} ×{item.quantity}</div>
                            ))}
                          </td>
                          <td><strong style={{ color: '#a78bfa' }}>Rs. {o.total?.toFixed(0)}</strong></td>
                          <td>{o.paymentMethod}</td>
                          <td>
                            <button
                              type="button"
                              className={`a-badge a-badge--${o.status === 'Completed' ? 'completed' : 'pending'}`}
                              style={{ cursor: 'pointer', border: 'none' }}
                              title="Click to toggle status"
                              onClick={() => handleStatusToggle(o._id, o.status)}
                            >{o.status || 'Pending'}</button>
                          </td>
                          <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td><button type="button" className="a-del-btn" onClick={() => handleDeleteOrder(o._id)}>🗑</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── USERS ── */}
          {tab === 'users' && !loading && (
            <div className="admin-section">
              <div className="admin-section__head">
                <h3>All Users</h3>
                <button
                  type="button"
                  className="admin-add-btn"
                  onClick={() => { setShowRegForm(v => !v); setRegError(''); setRegSuccess('') }}
                >
                  {showRegForm ? '✕ Cancel' : '+ Add User'}
                </button>
              </div>

              {showRegForm && (
                <form onSubmit={handleRegister} className="admin-reg-form">
                  {regError && <div className="admin-alert admin-alert--error">{regError}</div>}
                  {regSuccess && <div className="admin-alert admin-alert--success">{regSuccess}</div>}
                  <input type="text" placeholder="Full Name" required value={regForm.name}
                    onChange={(e) => setRegForm(v => ({ ...v, name: e.target.value }))} />
                  <input type="email" placeholder="Email Address" required value={regForm.email}
                    onChange={(e) => setRegForm(v => ({ ...v, email: e.target.value }))} />
                  <input type="password" placeholder="Password (min 6 chars)" required minLength={6} value={regForm.password}
                    onChange={(e) => setRegForm(v => ({ ...v, password: e.target.value }))} />
                  <select value={regForm.role} onChange={(e) => setRegForm(v => ({ ...v, role: e.target.value }))}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" className="admin-submit-btn" disabled={regLoading}>
                    {regLoading ? 'Registering...' : 'Register User'}
                  </button>
                </form>
              )}

              <div className="admin-tbl-wrap">
                <table className="admin-tbl">
                  <thead>
                    <tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th></th></tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u._id}>
                        <td>{i + 1}</td>
                        <td>{u.name}</td>
                        <td style={{ color: '#64748b' }}>{u.email}</td>
                        <td><span className={`a-badge a-badge--${u.role}`}>{u.role}</span></td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                          {u._id !== user.id && (
                            <button type="button" className="a-del-btn" onClick={() => handleDeleteUser(u._id)}>🗑 Delete</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MESSAGES ── */}
          {tab === 'messages' && !loading && (
            <div className="admin-section">
              <div className="admin-section__head">
                <h3>Contact Messages</h3>
                <span>{messages.length} total</span>
              </div>
              {messages.length === 0 ? (
                <p className="admin-empty">No messages yet.</p>
              ) : (
                messages.map((m) => (
                  <div key={m._id} className="admin-msg-card">
                    <div className="admin-sidebar__avatar" style={{ width: 38, height: 38, fontSize: '.9rem', flexShrink: 0 }}>
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="admin-msg-card__body">
                      <h4>{m.name} <span style={{ color: '#64748b', fontWeight: 400 }}>— {m.email}</span></h4>
                      <p>{m.message}</p>
                      <small>{new Date(m.createdAt).toLocaleString()}</small>
                      {replyingTo === m._id ? (
                        <div style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                          <textarea
                            rows={3}
                            placeholder={`Reply to ${m.name}...`}
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            style={{ background: '#1a1d27', border: '1px solid #2d3148', color: '#e2e8f0', borderRadius: 6, padding: '.5rem .75rem', fontSize: '.83rem', resize: 'vertical' }}
                          />
                          <div style={{ display: 'flex', gap: '.5rem' }}>
                            <button type="button" className="admin-submit-btn"
                              style={{ padding: '.4rem 1rem', fontSize: '.8rem' }}
                              onClick={() => handleReply(m)} disabled={replySending}>
                              {replySending ? 'Sending...' : '📤 Send Reply'}
                            </button>
                            <button type="button" className="a-del-btn"
                              style={{ padding: '.4rem .75rem' }}
                              onClick={() => { setReplyingTo(null); setReplyText('') }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button type="button" className="admin-add-btn"
                          style={{ marginTop: '.5rem', fontSize: '.78rem', padding: '.3rem .75rem' }}
                          onClick={() => { setReplyingTo(m._id); setReplyText('') }}>✉ Reply</button>
                      )}
                    </div>
                    <button type="button" className="a-del-btn" onClick={() => handleDeleteMessage(m._id)}>🗑</button>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
