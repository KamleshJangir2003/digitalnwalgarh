const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already exists' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: role === 'admin' ? 'admin' : 'user' })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid email or password' })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
})

// Admin: get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
})

// Admin: delete user
router.delete('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'User deleted' })
})

module.exports = router
