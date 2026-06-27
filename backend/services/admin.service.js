const userRepository = require('../repositories/user.repository');
const courseRepository = require('../repositories/course.repository');
const semesterRepository = require('../repositories/semester.repository');
const subjectRepository = require('../repositories/subject.repository');
const noteRepository = require('../repositories/note.repository');
const { generatePagination } = require('../utils/helpers');
const { NotFoundError } = require('../utils/errors');

class AdminService {
  async getDashboard() {
    const userStats = await userRepository.getStats();
    const courseStats = await courseRepository.getStats();
    const semesterStats = await semesterRepository.getStats();
    const subjectStats = await subjectRepository.getStats();
    const noteStats = await noteRepository.getStats();

    return {
      users: {
        total: parseInt(userStats.total),
        students: parseInt(userStats.students),
        admins: parseInt(userStats.admins),
        active: parseInt(userStats.active),
      },
      courses: {
        total: parseInt(courseStats.total),
        active: parseInt(courseStats.active),
      },
      semesters: {
        total: parseInt(semesterStats.total),
        active: parseInt(semesterStats.active),
      },
      subjects: {
        total: parseInt(subjectStats.total),
        active: parseInt(subjectStats.active),
      },
      notes: {
        total: parseInt(noteStats.total),
        featured: parseInt(noteStats.featured),
        active: parseInt(noteStats.active),
        totalViews: parseInt(noteStats.total_views),
        totalDownloads: parseInt(noteStats.total_downloads),
      },
    };
  }

  async getUsers(queryParams) {
    const { page, limit, offset } = generatePagination(queryParams.page, queryParams.limit);
    return userRepository.findAll(page, limit, offset);
  }

  async toggleUserActive(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return userRepository.toggleActive(id);
  }

  async getAllCourses() {
    return courseRepository.findAll();
  }

  async getAllSemesters() {
    const result = await require('../config/database').query(
      `SELECT sem.*, c.name as course_name, c.slug as course_slug
       FROM semesters sem
       LEFT JOIN courses c ON sem.course_id = c.id
       ORDER BY c.name ASC, sem.semester_number ASC`
    );
    return result.rows;
  }

  async getAllSubjects() {
    const result = await require('../config/database').query(
      `SELECT sub.*, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM subjects sub
       LEFT JOIN semesters sem ON sub.semester_id = sem.id
       LEFT JOIN courses c ON sub.course_id = c.id
       ORDER BY c.name ASC, sem.semester_number ASC, sub.name ASC`
    );
    return result.rows;
  }

  async getAllNotes(queryParams) {
    const { page, limit, offset } = generatePagination(queryParams.page, queryParams.limit);
    const options = { page, limit, offset, isActive: undefined };
    if (queryParams.category) options.category = queryParams.category;
    return noteRepository.findAll(options);
  }

  async deleteNote(id) {
    const note = await noteRepository.findById(id);
    if (!note) {
      throw new NotFoundError('Note not found');
    }
    return noteRepository.delete(id);
  }
}

module.exports = new AdminService();
