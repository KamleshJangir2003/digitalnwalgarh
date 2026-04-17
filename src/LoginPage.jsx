import { useState } from 'react'

const API = 'http://localhost:5000/api/auth'

export default function LoginPage({ onLogin, onSwitch }) {
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
      if (data.user.role === 'admin') throw new Error('Admin? Use Admin Login instead.')
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
        <h2>Login to DigiBuddy</h2>
        <p className="auth-sub">Welcome back! Enter your credentials.</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="email" placeholder="Email Address" required
            value={form.email} onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))}
          />
          <input
            type="password" placeholder="Password" required
            value={form.password} onChange={(e) => setForm(v => ({ ...v, password: e.target.value }))}
          />
          <button type="submit" className="primary-action" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <button type="button" className="auth-link" onClick={onSwitch}>Register here</button>
        </p>
      </div>
    </section>
  )
}
