const ErrorHandler = require('./errorHandler')

module.exports = (err, req, res, next) => {
  err.code = err.code || 500
  err.message = err.message || 'internal server error'

  res.status(err.code).json({
    success: false,
    message: err.message,
  })
}
