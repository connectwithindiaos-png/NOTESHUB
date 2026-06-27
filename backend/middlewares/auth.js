const { verifyAccessToken } = require('../utils/jwt');
const ApiResponse = require('../utils/response');
const db = require('../config/database');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.unauthorized(res, 'Access token required');
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    const result = await db.query('SELECT id, email, full_name, role, is_active FROM users WHERE id = $1', [decoded.userId]);
    if (result.rows.length === 0 || !result.rows[0].is_active) {
      return ApiResponse.unauthorized(res, 'User not found or inactive');
    }
    req.user = result.rows[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.unauthorized(res, 'Token expired');
    }
    return ApiResponse.unauthorized(res, 'Invalid token');
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res);
    }
    if (!roles.includes(req.user.role)) {
      return ApiResponse.forbidden(res, 'Insufficient permissions');
    }
    next();
  };
}

module.exports = { authenticate, authorize };
