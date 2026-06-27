const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const courseRoutes = require('./course.routes');
const semesterRoutes = require('./semester.routes');
const subjectRoutes = require('./subject.routes');
const noteRoutes = require('./note.routes');
const adminRoutes = require('./admin.routes');
const seoRoutes = require('./seo.routes');
const resolverRoutes = require('./resolver.routes');
const settingRoutes = require('./setting.routes');

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/semesters', semesterRoutes);
router.use('/subjects', subjectRoutes);
router.use('/notes', noteRoutes);
router.use('/admin', adminRoutes);
router.use('/seo', seoRoutes);
router.use('/resolve', resolverRoutes);
router.use('/settings', settingRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date().toISOString() });
});

module.exports = router;
