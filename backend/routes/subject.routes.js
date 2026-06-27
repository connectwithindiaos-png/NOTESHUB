const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller');
const { authenticate, authorize } = require('../middlewares/auth');

router.get('/search', (req, res, next) => subjectController.search(req, res, next));
router.get('/semester/:semesterId', (req, res, next) => subjectController.getAll(req, res, next));
router.get('/:semesterId/:slug', (req, res, next) => subjectController.getBySlug(req, res, next));
router.post('/', authenticate, authorize('admin'), (req, res, next) => subjectController.create(req, res, next));
router.put('/:id', authenticate, authorize('admin'), (req, res, next) => subjectController.update(req, res, next));
router.delete('/:id', authenticate, authorize('admin'), (req, res, next) => subjectController.delete(req, res, next));

module.exports = router;
