const express = require('express');
const router = express.Router();
const settingController = require('../controllers/setting.controller');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/public', (req, res, next) => settingController.getAll(req, res, next));
router.get('/', authenticate, authorize('admin'), (req, res, next) => settingController.getAll(req, res, next));
router.put('/', authenticate, authorize('admin'), (req, res, next) => settingController.update(req, res, next));

module.exports = router;
