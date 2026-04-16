const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  userEmail: String,
  items: [{ name: String, category: String, price: Number, quantity: Number }],
  total: Number,
  paymentMethod: String,
  status: { type: String, default: 'Pending' },
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)
