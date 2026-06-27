const subjectService = require('../services/subject.service');
const ApiResponse = require('../utils/response');

class SubjectController {
  async getAll(req, res, next) {
    try {
      const subjects = await subjectService.getAll(req.params.semesterId);
      return ApiResponse.success(res, subjects);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const { semesterId, slug } = req.params;
      const subject = await subjectService.getBySlug(semesterId, slug);
      return ApiResponse.success(res, subject);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const subject = await subjectService.create(req.body);
      return ApiResponse.created(res, subject);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const subject = await subjectService.update(req.params.id, req.body);
      return ApiResponse.success(res, subject, 'Subject updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await subjectService.delete(req.params.id);
      return ApiResponse.success(res, null, 'Subject deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { q } = req.query;
      const subjects = await subjectService.search(q);
      return ApiResponse.success(res, subjects);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SubjectController();
