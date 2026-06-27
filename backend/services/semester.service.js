const semesterRepository = require('../repositories/semester.repository');
const courseRepository = require('../repositories/course.repository');
const { NotFoundError, ConflictError } = require('../utils/errors');
const { slugify } = require('../utils/helpers');

class SemesterService {
  async getAll(courseSlug) {
    const course = await courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return semesterRepository.findAll(course.id);
  }

  async getBySlug(courseSlug, slug) {
    const course = await courseRepository.findBySlug(courseSlug);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    const semester = await semesterRepository.findBySlug(course.id, slug);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    return semester;
  }

  async getById(id) {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    return semester;
  }

  async create(data) {
    const { courseId, name, semesterNumber } = data;
    let course = await courseRepository.findById(courseId);
    if (!course) {
      course = await courseRepository.findBySlug(courseId);
    }
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    const slug = data.slug || slugify(name || `Semester ${semesterNumber}`);
    return semesterRepository.create({ ...data, courseId: course.id, slug });
  }

  async update(id, data) {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    return semesterRepository.update(id, data);
  }

  async delete(id) {
    const semester = await semesterRepository.findById(id);
    if (!semester) {
      throw new NotFoundError('Semester not found');
    }
    return semesterRepository.delete(id);
  }

  async populate(slug) {
    const course = await courseRepository.findBySlug(slug);
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    const existing = await semesterRepository.findAll(course.id);
    if (existing.length >= course.total_semesters) {
      return { course: course.name, semesters: existing.length, created: 0 };
    }

    let created = 0;
    for (let i = 1; i <= course.total_semesters; i++) {
      const semExists = existing.find(s => s.semester_number === i);
      if (!semExists) {
        await semesterRepository.create({
          courseId: course.id,
          semesterNumber: i,
          name: `Semester ${i}`,
          slug: `semester-${i}`,
          totalSubjects: 0,
        });
        created++;
      }
    }

    return { course: course.name, semesters: course.total_semesters, created };
  }

  async populateAll() {
    const allCourses = await courseRepository.findAll();
    const results = [];
    for (const c of allCourses) {
      const result = await this.populate(c.slug);
      results.push(result);
    }
    return results;
  }

  async recount(semesterId) {
    const semester = await semesterRepository.findById(semesterId);
    if (!semester) throw new NotFoundError('Semester not found');
    return semesterRepository.recountSubjects(semesterId);
  }

  async recountAll() {
    return semesterRepository.recountAll();
  }
}

module.exports = new SemesterService();
