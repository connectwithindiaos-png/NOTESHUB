const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate, authorize } = require('../middlewares/auth');
const { createCourseValidation, updateCourseValidation } = require('../validators/course.validator');

router.get('/', (req, res, next) => courseController.getAll(req, res, next));
router.get('/:slug', (req, res, next) => courseController.getBySlug(req, res, next));
router.post('/', authenticate, authorize('admin'), createCourseValidation, (req, res, next) => courseController.create(req, res, next));
router.put('/:slug', authenticate, authorize('admin'), updateCourseValidation, (req, res, next) => courseController.update(req, res, next));
router.delete('/:slug', authenticate, authorize('admin'), (req, res, next) => courseController.delete(req, res, next));

module.exports = router;
