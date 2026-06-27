const db = require('../config/database');

class SubjectRepository {
  async findAll(semesterId) {
    const result = await db.query(
      'SELECT * FROM subjects WHERE semester_id = $1 ORDER BY name ASC',
      [semesterId]
    );
    return result.rows;
  }

  async findBySlug(semesterId, slug) {
    const result = await db.query(
      'SELECT * FROM subjects WHERE semester_id = $1 AND slug = $2',
      [semesterId, slug]
    );
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM subjects WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(data) {
    const { semesterId, courseId, name, slug, code, description, longDescription, syllabus } = data;
    const result = await db.query(
      `INSERT INTO subjects (semester_id, course_id, name, slug, code, description, long_description, syllabus)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [semesterId, courseId, name, slug, code, description, longDescription, syllabus ? JSON.stringify(syllabus) : null]
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
        values.push(key === 'syllabus' ? JSON.stringify(value) : value);
        idx++;
      }
    }
    if (fields.length === 0) return null;
    values.push(id);
    const result = await db.query(
      `UPDATE subjects SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${idx} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await db.query('DELETE FROM subjects WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  }

  async search(query) {
    const searchPattern = `%${query}%`;
    const result = await db.query(
      `SELECT * FROM subjects WHERE (name ILIKE $1 OR code ILIKE $1 OR description ILIKE $1) AND is_active = true ORDER BY name ASC LIMIT 20`,
      [searchPattern]
    );
    return result.rows;
  }

  async getStats() {
    const result = await db.query(`
      SELECT COUNT(*) as total, COUNT(CASE WHEN is_active = true THEN 1 END) as active
      FROM subjects
    `);
    return result.rows[0];
  }
}

module.exports = new SubjectRepository();
