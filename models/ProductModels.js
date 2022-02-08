const mongoose = require('mongoose')
// const User = require('../models/UserModels')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter product name'],
  },
  // userId: {
  //   type: String,
  // },
  description: {
    type: String,
    required: [true, 'please enter product description'],
  },
  price: {
    type: Number,
    required: [true, 'please enter price'],
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      alt: {
        type: String,
      },
    },
  ],
  department: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'please enter category'],
  },

  tags: [
    {
      type: String,
      // required: [true, 'please enter category'],
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Product', productSchema)
