const subjectRepository = require('../repositories/subject.repository');
const semesterRepository = require('../repositories/semester.repository');
const courseRepository = require('../repositories/course.repository');
const db = require('../config/database');
const { NotFoundError, ConflictError } = require('../utils/errors');
const { slugify } = require('../utils/helpers');

class SubjectService {
  async getAll(semesterId) {
    const semester = await this._resolveSemester(semesterId);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    return subjectRepository.findAll(semester.id);
  }

  async getBySlug(semesterId, slug) {
    const semester = await this._resolveSemester(semesterId);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    const subject = await subjectRepository.findBySlug(semester.id, slug);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    return subject;
  }

  async getById(id) {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    return subject;
  }

  async _resolveSemester(semesterId) {
    let semester = null;
    try {
      semester = await semesterRepository.findById(semesterId);
    } catch (_) {}
    if (!semester && typeof semesterId === 'string' && semesterId.includes(':')) {
      const [courseSlug, semValue] = semesterId.split(':');
      const course = await courseRepository.findBySlug(courseSlug);
      if (course) {
        const semNumber = parseInt(semValue);
        if (!isNaN(semNumber)) {
          const result = await db.query(
            'SELECT * FROM semesters WHERE course_id = $1 AND semester_number = $2',
            [course.id, semNumber]
          );
          semester = result.rows[0];
        }
      }
    }
    return semester;
  }

  async create(data) {
    const { semesterId, name } = data;
    const semester = await this._resolveSemester(semesterId);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    const slug = data.slug || slugify(name);
    const existing = await subjectRepository.findBySlug(semester.id, slug);
    if (existing) {
      throw new ConflictError('Subject with this slug already exists in this semester');
    }
    const subject = await subjectRepository.create({ ...data, semesterId: semester.id, slug, courseId: semester.course_id });
    await semesterRepository.recountSubjects(semester.id);
    return subject;
  }

  async update(id, data) {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    const { semesterId, ...rest } = data;
    if (semesterId) {
      const semester = await this._resolveSemester(semesterId);
      if (!semester) throw new NotFoundError('Semester not found');
      data.semesterId = semester.id;
      data.courseId = semester.course_id;
    }
    const updated = await subjectRepository.update(id, data);
    if (semesterId && semesterId !== subject.semester_id) {
      await semesterRepository.recountSubjects(subject.semester_id);
      await semesterRepository.recountSubjects(data.semesterId);
    }
    return updated;
  }

  async delete(id) {
    const subject = await subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    await subjectRepository.delete(id);
    await semesterRepository.recountSubjects(subject.semester_id);
  }

  async search(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }
    return subjectRepository.search(query);
  }
}

module.exports = new SubjectService();
