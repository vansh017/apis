const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  phoneNo: {
    type: Number,
    required: true,
    minlength: 10,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // required: true,
  },
  userName: {
    type: String,
  },
  orderStatus: {
    type: String,

    default: 'processing',
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Order', OrderSchema)
