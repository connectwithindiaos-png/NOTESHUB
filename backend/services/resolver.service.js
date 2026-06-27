const courseRepository = require('../repositories/course.repository');
const semesterRepository = require('../repositories/semester.repository');
const subjectRepository = require('../repositories/subject.repository');
const noteRepository = require('../repositories/note.repository');
const db = require('../config/database');
const { NotFoundError } = require('../utils/errors');

class ResolverService {
  async resolveSubjectIds(courseSlug, semesterIdentifier) {
    const course = await courseRepository.findBySlug(courseSlug);
    if (!course) throw new NotFoundError('Course not found');

    const semesters = await semesterRepository.findAll(course.id);
    const semesterNumber = parseInt(semesterIdentifier);
    const semester = isNaN(semesterNumber)
      ? semesters.find(s => s.slug === semesterIdentifier)
      : semesters.find(s => s.semester_number === semesterNumber);
    if (!semester) throw new NotFoundError('Semester not found');

    return { courseId: course.id, semesterId: semester.id };
  }

  async getSubjects(courseSlug, semesterNumber) {
    const { semesterId } = await this.resolveSubjectIds(courseSlug, semesterNumber);
    return subjectRepository.findAll(semesterId);
  }

  async getNotes(courseSlug, semesterNumber, subjectSlug) {
    const { semesterId } = await this.resolveSubjectIds(courseSlug, semesterNumber);
    const subject = await subjectRepository.findBySlug(semesterId, subjectSlug);
    if (!subject) throw new NotFoundError('Subject not found');
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.subject_id = $1 AND n.is_active = true AND (n.category = 'note' OR n.category IS NULL)
       ORDER BY n.created_at DESC`,
      [subject.id]
    );
    return result.rows;
  }

  async getPYQs(courseSlug, semesterNumber, subjectSlug) {
    const { semesterId } = await this.resolveSubjectIds(courseSlug, semesterNumber);
    const subject = await subjectRepository.findBySlug(semesterId, subjectSlug);
    if (!subject) throw new NotFoundError('Subject not found');
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.subject_id = $1 AND n.is_active = true AND n.category = 'pyq'
       ORDER BY n.created_at DESC`,
      [subject.id]
    );
    return result.rows;
  }

  async getSyllabus(courseSlug, semesterNumber, subjectSlug) {
    const { semesterId } = await this.resolveSubjectIds(courseSlug, semesterNumber);
    const subject = await subjectRepository.findBySlug(semesterId, subjectSlug);
    if (!subject) throw new NotFoundError('Subject not found');
    return subject.syllabus || [];
  }

  async getOrganiser(courseSlug, semesterNumber, subjectSlug) {
    const { semesterId } = await this.resolveSubjectIds(courseSlug, semesterNumber);
    const subject = await subjectRepository.findBySlug(semesterId, subjectSlug);
    if (!subject) throw new NotFoundError('Subject not found');
    return subject.organiser || [];
  }

  async search(query) {
    if (!query || query.trim().length < 2) {
      return { courses: [], subjects: [], notes: [] };
    }

    const [courseResults, subjectResults, noteResults] = await Promise.all([
      courseRepository.search(query),
      subjectRepository.search(query),
      noteRepository.search(query, { page: 1, limit: 20, offset: 0 }),
    ]);

    return {
      courses: courseResults,
      subjects: subjectResults,
      notes: noteResults.notes || [],
    };
  }
}

module.exports = new ResolverService();
