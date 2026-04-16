const router = require('express').Router()
const Order = require('../models/Order')
const Contact = require('../models/Contact')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

// Place order (any logged in user)
router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const { items, total, paymentMethod, userName, userEmail } = req.body
    const order = await Order.create({ user: req.user.id, userName, userEmail, items, total, paymentMethod })
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin: get all orders
router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin: update order status
router.patch('/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin: delete order
router.delete('/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id)
  res.json({ message: 'Order deleted' })
})

// Submit contact message (public)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    await Contact.create({ name, email, message })
    res.status(201).json({ message: 'Message received' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin: get all contact messages
router.get('/contact', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Admin: delete contact message
router.delete('/contact/:id', authMiddleware, adminMiddleware, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id)
  res.json({ message: 'Message deleted' })
})

module.exports = router
