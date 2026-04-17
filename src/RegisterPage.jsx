import { useState } from 'react'

const API = 'http://localhost:5000/api/auth'

export default function RegisterPage({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      localStorage.setItem('token', data.token)
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-dot">🛍</div>
          <span>DigiBuddy</span>
        </div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join DigiBuddy and start selling digital products!</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text" placeholder="John Doe" required
              value={form.name} onChange={(e) => setForm(v => ({ ...v, name: e.target.value }))}
            />
          </div>
          <div className="auth-field">
            <label>Email Address</label>
            <input
              type="email" placeholder="you@example.com" required
              value={form.email} onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))}
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password" placeholder="Minimum 6 characters" required minLength={6}
              value={form.password} onChange={(e) => setForm(v => ({ ...v, password: e.target.value }))}
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>
        <div className="auth-divider">or</div>
        <p className="auth-switch">
          Already have an account?{' '}
          <button type="button" className="auth-link" onClick={onSwitch}>Login here</button>
        </p>
      </div>
    </section>
  )
}
