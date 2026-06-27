const courseRepository = require('../repositories/course.repository');
const semesterRepository = require('../repositories/semester.repository');
const { NotFoundError, ConflictError } = require('../utils/errors');
const { slugify } = require('../utils/helpers');

class CourseService {
  async getAll(isActive = true) {
    return courseRepository.findAll(isActive);
  }

  async getBySlug(slug) {
    const course = await courseRepository.findBySlug(slug);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    const semesters = await semesterRepository.findAll(course.id);
    return { ...course, semesters };
  }

  async getById(id) {
    const course = await courseRepository.findById(id);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return course;
  }

  async create(data) {
    const slug = data.slug || slugify(data.name);
    const existing = await courseRepository.findBySlug(slug);
    if (existing) {
      throw new ConflictError('Course with this slug already exists');
    }
    return courseRepository.create({ ...data, slug });
  }

  async update(slug, data) {
    const course = await courseRepository.findBySlug(slug);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    if (data.slug && data.slug !== slug) {
      const existing = await courseRepository.findBySlug(data.slug);
      if (existing) {
        throw new ConflictError('Course with this slug already exists');
      }
    }
    return courseRepository.update(slug, data);
  }

  async delete(slug) {
    const course = await courseRepository.findBySlug(slug);
    if (!course) {
      throw new NotFoundError('Course not found');
    }
    return courseRepository.delete(slug);
  }
}

module.exports = new CourseService();
