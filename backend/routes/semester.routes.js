const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semester.controller');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/course/:courseSlug', (req, res, next) => semesterController.getAll(req, res, next));
router.get('/course/:courseSlug/:slug', (req, res, next) => semesterController.getBySlug(req, res, next));
router.post('/', authenticate, authorize('admin'), (req, res, next) => semesterController.create(req, res, next));
router.put('/:id', authenticate, authorize('admin'), (req, res, next) => semesterController.update(req, res, next));
router.delete('/:id', authenticate, authorize('admin'), (req, res, next) => semesterController.delete(req, res, next));
router.get('/populate/:slug', (req, res, next) => semesterController.populate(req, res, next));
router.post('/recount', authenticate, authorize('admin'), (req, res, next) => semesterController.recount(req, res, next));
router.post('/recount/:id', authenticate, authorize('admin'), (req, res, next) => semesterController.recountOne(req, res, next));

module.exports = router;
