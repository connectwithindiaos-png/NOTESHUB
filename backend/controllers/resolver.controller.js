const resolverService = require('../services/resolver.service');
const ApiResponse = require('../utils/response');

class ResolverController {
  async getSubjects(req, res, next) {
    try {
      const { courseSlug, semesterNumber } = req.params;
      const subjects = await resolverService.getSubjects(courseSlug, semesterNumber);
      return ApiResponse.success(res, subjects);
    } catch (error) {
      next(error);
    }
  }

  async getNotes(req, res, next) {
    try {
      const { courseSlug, semesterNumber, subjectSlug } = req.params;
      const notes = await resolverService.getNotes(courseSlug, semesterNumber, subjectSlug);
      return ApiResponse.success(res, notes);
    } catch (error) {
      next(error);
    }
  }

  async getPYQs(req, res, next) {
    try {
      const { courseSlug, semesterNumber, subjectSlug } = req.params;
      const pyqs = await resolverService.getPYQs(courseSlug, semesterNumber, subjectSlug);
      return ApiResponse.success(res, pyqs);
    } catch (error) {
      next(error);
    }
  }

  async getSyllabus(req, res, next) {
    try {
      const { courseSlug, semesterNumber, subjectSlug } = req.params;
      const syllabus = await resolverService.getSyllabus(courseSlug, semesterNumber, subjectSlug);
      return ApiResponse.success(res, syllabus);
    } catch (error) {
      next(error);
    }
  }

  async getOrganiser(req, res, next) {
    try {
      const { courseSlug, semesterNumber, subjectSlug } = req.params;
      const organiser = await resolverService.getOrganiser(courseSlug, semesterNumber, subjectSlug);
      return ApiResponse.success(res, organiser);
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { query } = req.params;
      const results = await resolverService.search(query);
      return ApiResponse.success(res, results);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResolverController();
