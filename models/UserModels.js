const mongoose = require('mongoose')
const validator = require('email-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    validate: [validator.validate, 'please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

//check password
userSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password)
}

//forgot password

module.exports = mongoose.model('User', userSchema)
