const config = require('../config');
const ApiResponse = require('../utils/response');

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  if (err.code === '23505') {
    statusCode = 409;
    message = 'Resource already exists';
  } else if (err.code === '23503') {
    statusCode = 400;
    message = 'Referenced resource not found';
  } else if (err.code === '22P02') {
    statusCode = 400;
    message = 'Invalid input format';
  }

  if (config.nodeEnv === 'development') {
    console.error('Error:', err);
  }

  if (!err.isOperational) {
    if (config.nodeEnv === 'production') {
      message = 'Internal Server Error';
    }
  }

  return ApiResponse.error(res, message, statusCode, errors);
}

module.exports = errorHandler;
