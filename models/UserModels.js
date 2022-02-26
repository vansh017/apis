const mongoose = require('mongoose')
const validator = require('email-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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
  department: {
    type: String,
  },
  mobileNo: {
    type: Number,
    minlength: 10,
  },
  sem: {
    type: Number,
  },

  address: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },

  createdAt: {
    type: Date,
    default: Date.now,
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

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}

module.exports = mongoose.model('User', userSchema)
