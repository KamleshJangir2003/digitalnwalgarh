import { useState } from 'react'

const API = 'http://localhost:5000/api/auth'

export default function AdminLoginPage({ onLogin, onBack }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      if (data.user.role !== 'admin') throw new Error('Access denied. Admins only.')
      localStorage.setItem('token', data.token)
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page container">
      <div className="auth-card">
        <div className="dashboard-avatar admin-avatar" style={{ margin: '0 auto 1rem', width: 56, height: 56, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡</div>
        <h2>Admin Login</h2>
        <p className="auth-sub">Restricted access — Admins only.</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="email" placeholder="Admin Email" required
            value={form.email} onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))}
          />
          <input
            type="password" placeholder="Password" required
            value={form.password} onChange={(e) => setForm(v => ({ ...v, password: e.target.value }))}
          />
          <button type="submit" className="primary-action" disabled={loading}>
            {loading ? 'Logging in...' : '🔐 Admin Login'}
          </button>
        </form>
        <p className="auth-switch">
          <button type="button" className="auth-link" onClick={onBack}>← Back to Site</button>
        </p>
      </div>
    </section>
  )
}
