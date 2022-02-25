const ErrorHandler = require('./errorHandler')

module.exports = (err, req, res, next) => {
  err.code = err.code || 500
  err.message = err.message || 'internal server error'

  // duplicate user
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`
    err = new ErrorHandler(message, 400)
  }
  res.status(err.code).json({
    success: false,
    message: err.message,
  })
}
