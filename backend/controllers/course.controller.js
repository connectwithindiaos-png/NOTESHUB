const courseService = require('../services/course.service');
const ApiResponse = require('../utils/response');

class CourseController {
  async getAll(req, res, next) {
    try {
      const courses = await courseService.getAll();
      return ApiResponse.success(res, courses);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const course = await courseService.getBySlug(req.params.slug);
      return ApiResponse.success(res, course);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const course = await courseService.create(req.body);
      return ApiResponse.created(res, course);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const course = await courseService.update(req.params.slug, req.body);
      return ApiResponse.success(res, course, 'Course updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await courseService.delete(req.params.slug);
      return ApiResponse.success(res, null, 'Course deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
