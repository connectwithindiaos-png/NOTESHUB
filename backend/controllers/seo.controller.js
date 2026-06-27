const seoService = require('../services/seo.service');
const ApiResponse = require('../utils/response');

class SEOController {
  async getSitemap(req, res, next) {
    try {
      const sitemap = await seoService.generateSitemap();
      res.header('Content-Type', 'application/xml');
      return res.send(sitemap);
    } catch (error) {
      next(error);
    }
  }

  async getRobotsTxt(req, res, next) {
    try {
      const robots = seoService.generateRobotsTxt();
      res.header('Content-Type', 'text/plain');
      return res.send(robots);
    } catch (error) {
      next(error);
    }
  }

  async getStructuredData(req, res, next) {
    try {
      const { type, slug } = req.params;
      let structuredData = null;
      switch (type) {
        case 'course':
          structuredData = await seoService.generateCourseStructuredData(slug);
          break;
        case 'note':
          structuredData = await seoService.generateNoteStructuredData(slug);
          break;
        default:
          return ApiResponse.badRequest(res, 'Invalid type');
      }
      if (!structuredData) {
        return ApiResponse.notFound(res, 'Resource not found');
      }
      return ApiResponse.success(res, structuredData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SEOController();
