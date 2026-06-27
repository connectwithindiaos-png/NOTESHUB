const adminService = require('../services/admin.service');
const ApiResponse = require('../utils/response');

class AdminController {
  async getDashboard(req, res, next) {
    try {
      const dashboard = await adminService.getDashboard();
      return ApiResponse.success(res, dashboard);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const result = await adminService.getUsers(req.query);
      return ApiResponse.paginated(res, result.users, result.total, parseInt(req.query.page) || 1, parseInt(req.query.limit) || 20);
    } catch (error) {
      next(error);
    }
  }

  async toggleUserActive(req, res, next) {
    try {
      const result = await adminService.toggleUserActive(req.params.id);
      return ApiResponse.success(res, result, 'User status toggled');
    } catch (error) {
      next(error);
    }
  }

  async getCourses(req, res, next) {
    try {
      const courses = await adminService.getAllCourses();
      return ApiResponse.success(res, courses);
    } catch (error) {
      next(error);
    }
  }

  async getSemesters(req, res, next) {
    try {
      const semesters = await adminService.getAllSemesters();
      return ApiResponse.success(res, semesters);
    } catch (error) {
      next(error);
    }
  }

  async getSubjects(req, res, next) {
    try {
      const subjects = await adminService.getAllSubjects();
      return ApiResponse.success(res, subjects);
    } catch (error) {
      next(error);
    }
  }

  async getNotes(req, res, next) {
    try {
      const result = await adminService.getAllNotes(req.query);
      return ApiResponse.paginated(res, result.notes, result.total, parseInt(req.query.page) || 1, parseInt(req.query.limit) || 20);
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req, res, next) {
    try {
      await adminService.deleteNote(req.params.id);
      return ApiResponse.success(res, null, 'Note deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
