const db = require('../config/database');

class SemesterRepository {
  async findAll(courseId) {
    const result = await db.query(
      'SELECT * FROM semesters WHERE course_id = $1 ORDER BY semester_number ASC',
      [courseId]
    );
    return result.rows;
  }

  async findBySlug(courseId, slug) {
    const result = await db.query(
      'SELECT * FROM semesters WHERE course_id = $1 AND slug = $2',
      [courseId, slug]
    );
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM semesters WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(data) {
    const { courseId, semesterNumber, name, slug, totalSubjects } = data;
    const result = await db.query(
      `INSERT INTO semesters (course_id, semester_number, name, slug, total_subjects)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [courseId, semesterNumber, name, slug, totalSubjects || 0]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        fields.push(`${dbKey} = $${idx}`);
        values.push(value);
        idx++;
      }
    }
    if (fields.length === 0) return null;
    values.push(id);
    const result = await db.query(
      `UPDATE semesters SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await db.query('DELETE FROM semesters WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  }

  async recountSubjects(semesterId) {
    const result = await db.query(
      `UPDATE semesters s SET total_subjects = (
        SELECT COUNT(*) FROM subjects WHERE semester_id = $1 AND is_active = true
      ) WHERE s.id = $1 RETURNING *`,
      [semesterId]
    );
    return result.rows[0] || null;
  }

  async recountAll() {
    const result = await db.query(`
      UPDATE semesters s SET total_subjects = (
        SELECT COUNT(*) FROM subjects WHERE semester_id = s.id AND is_active = true
      )
      RETURNING id, slug, name, total_subjects
    `);
    return result.rows;
  }

  async getStats() {
    const result = await db.query(`
      SELECT COUNT(*) as total, COUNT(CASE WHEN is_active = true THEN 1 END) as active
      FROM semesters
    `);
    return result.rows[0];
  }
}

module.exports = new SemesterRepository();
