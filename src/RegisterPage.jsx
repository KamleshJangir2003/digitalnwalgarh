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
    <section className="auth-page container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-sub">Join DigiHook and start selling digital products!</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="text" placeholder="Full Name" required
            value={form.name} onChange={(e) => setForm(v => ({ ...v, name: e.target.value }))}
          />
          <input
            type="email" placeholder="Email Address" required
            value={form.email} onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))}
          />
          <input
            type="password" placeholder="Password (min 6 chars)" required minLength={6}
            value={form.password} onChange={(e) => setForm(v => ({ ...v, password: e.target.value }))}
          />
          <select
            value={form.role}
            onChange={(e) => setForm(v => ({ ...v, role: e.target.value }))}
            className="auth-select"
          >
            <option value="user">Register as User</option>
            <option value="admin">Register as Admin</option>
          </select>
          <button type="submit" className="primary-action" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{' '}
          <button type="button" className="auth-link" onClick={onSwitch}>Login here</button>
        </p>
      </div>
    </section>
  )
}
