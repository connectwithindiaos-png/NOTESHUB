const semesterService = require('../services/semester.service');
const ApiResponse = require('../utils/response');

class SemesterController {
  async getAll(req, res, next) {
    try {
      const semesters = await semesterService.getAll(req.params.courseSlug);
      return ApiResponse.success(res, semesters);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const semester = await semesterService.getBySlug(req.params.courseSlug, req.params.slug);
      return ApiResponse.success(res, semester);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const semester = await semesterService.create(req.body);
      return ApiResponse.created(res, semester);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const semester = await semesterService.update(req.params.id, req.body);
      return ApiResponse.success(res, semester, 'Semester updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await semesterService.delete(req.params.id);
      return ApiResponse.success(res, null, 'Semester deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async populate(req, res, next) {
    try {
      const slug = req.params.slug;
      if (slug === 'all') {
        const results = await semesterService.populateAll();
        return ApiResponse.success(res, results, 'All courses populated with semesters');
      }
      const result = await semesterService.populate(slug);
      return ApiResponse.success(res, result, `Semesters created for ${result.course}`);
    } catch (error) {
      next(error);
    }
  }

  async recount(req, res, next) {
    try {
      const results = await semesterService.recountAll();
      return ApiResponse.success(res, results, 'All semester subject counts recalculated');
    } catch (error) {
      next(error);
    }
  }

  async recountOne(req, res, next) {
    try {
      const result = await semesterService.recount(req.params.id);
      return ApiResponse.success(res, result, 'Semester subject count recalculated');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SemesterController();
