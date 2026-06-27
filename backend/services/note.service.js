const noteRepository = require('../repositories/note.repository');
const { NotFoundError } = require('../utils/errors');
const { slugify, generatePagination } = require('../utils/helpers');

class NoteService {
  async getAll(queryParams) {
    const { page, limit, offset } = generatePagination(queryParams.page, queryParams.limit);
    const options = {
      page,
      limit,
      offset,
      courseId: queryParams.courseId,
      semesterId: queryParams.semesterId,
      subjectId: queryParams.subjectId,
      isActive: queryParams.showAll === 'true' ? undefined : true,
    };
    return noteRepository.findAll(options);
  }

  async getBySlug(slug) {
    const note = await noteRepository.findBySlug(slug);
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return note;
  }

  async getById(id) {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return note;
  }

  async create(data) {
    const slug = data.slug || slugify(data.title);
    return noteRepository.create({ ...data, slug });
  }

  async update(id, data) {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return noteRepository.update(id, data);
  }

  async delete(id) {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return noteRepository.delete(id);
  }

  async incrementView(id) {
    const result = await noteRepository.incrementView(id);
    if (!result) {
      throw new NotFoundError('Note not found');
    }
    return result;
  }

  async incrementDownload(id) {
    const result = await noteRepository.incrementDownload(id);
    if (!result) {
      throw new NotFoundError('Note not found');
    }
    return result;
  }

  async search(query, queryParams) {
    if (!query || query.trim().length < 2) {
      return { notes: [], total: 0 };
    }
    const { page, limit, offset } = generatePagination(queryParams.page, queryParams.limit);
    return noteRepository.search(query, { page, limit, offset });
  }

  async findBySubject(subjectId) {
    return noteRepository.findBySubject(subjectId);
  }

  async findBySemester(semesterId) {
    return noteRepository.findBySemester(semesterId);
  }

  async findFeatured(limit = 10) {
    return noteRepository.findFeatured(limit);
  }

  async getRelated(noteId, limit = 5) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return noteRepository.getRelated(noteId, limit);
  }
}

module.exports = new NoteService();
