const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth');
const { authLimiter } = require('../middlewares/rateLimiter');
const { registerValidation, loginValidation, updateProfileValidation } = require('../validators/auth.validator');

router.post('/register', authLimiter, registerValidation, (req, res, next) => authController.register(req, res, next));
router.post('/login', authLimiter, loginValidation, (req, res, next) => authController.login(req, res, next));
router.post('/refresh-token', (req, res, next) => authController.refreshToken(req, res, next));
router.get('/profile', authenticate, (req, res, next) => authController.getProfile(req, res, next));
router.put('/profile', authenticate, updateProfileValidation, (req, res, next) => authController.updateProfile(req, res, next));
router.post('/change-password', authenticate, (req, res, next) => authController.changePassword(req, res, next));

module.exports = router;
