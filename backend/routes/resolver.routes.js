const express = require('express');
const router = express.Router();
const resolverController = require('../controllers/resolver.controller');

router.get('/subjects/:courseSlug/:semesterNumber', (req, res, next) => resolverController.getSubjects(req, res, next));
router.get('/notes/:courseSlug/:semesterNumber/:subjectSlug', (req, res, next) => resolverController.getNotes(req, res, next));
router.get('/pyqs/:courseSlug/:semesterNumber/:subjectSlug', (req, res, next) => resolverController.getPYQs(req, res, next));
router.get('/syllabus/:courseSlug/:semesterNumber/:subjectSlug', (req, res, next) => resolverController.getSyllabus(req, res, next));
router.get('/organiser/:courseSlug/:semesterNumber/:subjectSlug', (req, res, next) => resolverController.getOrganiser(req, res, next));
router.get('/search/:query', (req, res, next) => resolverController.search(req, res, next));

module.exports = router;
