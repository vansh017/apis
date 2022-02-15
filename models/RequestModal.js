const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  requestName: {
    type: String,
    // required: [true, 'please enter product name'],
  },

  description: {
    type: String,
  },
  //   userId: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  //   userName: {
  //     type: String,
  //     // required: true,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Request', requestSchema)
