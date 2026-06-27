const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seo.controller');

router.get('/sitemap.xml', (req, res, next) => seoController.getSitemap(req, res, next));
router.get('/robots.txt', (req, res, next) => seoController.getRobotsTxt(req, res, next));
router.get('/structured-data/:type/:slug', (req, res, next) => seoController.getStructuredData(req, res, next));

module.exports = router;
