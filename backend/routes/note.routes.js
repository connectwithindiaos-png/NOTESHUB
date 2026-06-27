const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { authenticate } = require('../middlewares/auth');
const { createNoteValidation, updateNoteValidation } = require('../validators/note.validator');

router.get('/', (req, res, next) => noteController.getAll(req, res, next));
router.get('/featured', (req, res, next) => noteController.getFeatured(req, res, next));
router.get('/search', (req, res, next) => noteController.search(req, res, next));
router.get('/subject/:subjectId', (req, res, next) => noteController.findBySubject(req, res, next));
router.get('/semester/:semesterId', (req, res, next) => noteController.findBySemester(req, res, next));
router.get('/related/:noteId', (req, res, next) => noteController.getRelated(req, res, next));
router.get('/:slug', (req, res, next) => noteController.getBySlug(req, res, next));
router.post('/', authenticate, createNoteValidation, (req, res, next) => noteController.create(req, res, next));
router.put('/:id', authenticate, updateNoteValidation, (req, res, next) => noteController.update(req, res, next));
router.delete('/:id', authenticate, (req, res, next) => noteController.delete(req, res, next));
router.patch('/:id/view', (req, res, next) => noteController.incrementView(req, res, next));
router.patch('/:id/download', (req, res, next) => noteController.incrementDownload(req, res, next));

module.exports = router;
