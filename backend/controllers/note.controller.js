const noteService = require('../services/note.service');
const ApiResponse = require('../utils/response');

class NoteController {
  async getAll(req, res, next) {
    try {
      const result = await noteService.getAll(req.query);
      return ApiResponse.paginated(res, result.notes, result.total, parseInt(req.query.page) || 1, parseInt(req.query.limit) || 20);
    } catch (error) {
      next(error);
    }
  }

  async getBySlug(req, res, next) {
    try {
      const note = await noteService.getBySlug(req.params.slug);
      return ApiResponse.success(res, note);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = { ...req.body, authorId: req.user.id, authorName: req.user.full_name };
      const note = await noteService.create(data);
      return ApiResponse.created(res, note);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const note = await noteService.update(req.params.id, req.body);
      return ApiResponse.success(res, note, 'Note updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await noteService.delete(req.params.id);
      return ApiResponse.success(res, null, 'Note deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { q } = req.query;
      const result = await noteService.search(q, req.query);
      return ApiResponse.paginated(res, result.notes, result.total, parseInt(req.query.page) || 1, parseInt(req.query.limit) || 20);
    } catch (error) {
      next(error);
    }
  }

  async incrementView(req, res, next) {
    try {
      const result = await noteService.incrementView(req.params.id);
      return ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async incrementDownload(req, res, next) {
    try {
      const result = await noteService.incrementDownload(req.params.id);
      return ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getFeatured(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const notes = await noteService.findFeatured(limit);
      return ApiResponse.success(res, notes);
    } catch (error) {
      next(error);
    }
  }

  async getRelated(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 5;
      const notes = await noteService.getRelated(req.params.noteId, limit);
      return ApiResponse.success(res, notes);
    } catch (error) {
      next(error);
    }
  }

  async findBySubject(req, res, next) {
    try {
      const notes = await noteService.findBySubject(req.params.subjectId);
      return ApiResponse.success(res, notes);
    } catch (error) {
      next(error);
    }
  }

  async findBySemester(req, res, next) {
    try {
      const notes = await noteService.findBySemester(req.params.semesterId);
      return ApiResponse.success(res, notes);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NoteController();
