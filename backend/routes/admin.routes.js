const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middlewares/auth');

router.use(authenticate, authorize('admin'));

router.get('/dashboard', (req, res, next) => adminController.getDashboard(req, res, next));
router.get('/users', (req, res, next) => adminController.getUsers(req, res, next));
router.patch('/users/:id/toggle', (req, res, next) => adminController.toggleUserActive(req, res, next));
router.get('/courses', (req, res, next) => adminController.getCourses(req, res, next));
router.get('/semesters', (req, res, next) => adminController.getSemesters(req, res, next));
router.get('/subjects', (req, res, next) => adminController.getSubjects(req, res, next));
router.get('/notes', (req, res, next) => adminController.getNotes(req, res, next));
router.delete('/notes/:id', (req, res, next) => adminController.deleteNote(req, res, next));

module.exports = router;
