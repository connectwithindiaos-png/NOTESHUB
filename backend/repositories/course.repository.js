const db = require('../config/database');

class CourseRepository {
  async findAll(isActive = null) {
    let query = 'SELECT * FROM courses'
    const params = []
    if (isActive !== null) {
      query += ' WHERE is_active = $1'
      params.push(isActive)
    }
    query += ' ORDER BY name ASC'
    const result = await db.query(query, params)
    return result.rows;
  }

  async findBySlug(slug) {
    const result = await db.query('SELECT * FROM courses WHERE slug = $1', [slug]);
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(data) {
    const { name, fullName, slug, description, longDescription, icon, color, bgColor, duration, totalSemesters, totalSubjects, keywords, brochurePoints } = data;
    const result = await db.query(
      `INSERT INTO courses (name, full_name, slug, description, long_description, icon, color, bg_color, duration, total_semesters, total_subjects, keywords, brochure_points)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [name, fullName, slug, description, longDescription, icon, color, bgColor, duration, totalSemesters, totalSubjects, keywords, JSON.stringify(brochurePoints)]
    );
    return result.rows[0];
  }

  async update(slug, data) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        const dbKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        fields.push(`${dbKey} = $${idx}`);
        values.push(key === 'brochurePoints' ? JSON.stringify(value) : value);
        idx++;
      }
    }
    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(slug);
    const result = await db.query(
      `UPDATE courses SET ${fields.join(', ')} WHERE slug = $${idx} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(slug) {
    const result = await db.query('DELETE FROM courses WHERE slug = $1 RETURNING id', [slug]);
    return result.rows[0] || null;
  }

  async search(query) {
    const searchPattern = `%${query}%`;
    const result = await db.query(
      `SELECT * FROM courses WHERE (name ILIKE $1 OR full_name ILIKE $1 OR slug ILIKE $1 OR keywords ILIKE $1 OR description ILIKE $1) AND is_active = true ORDER BY name ASC LIMIT 10`,
      [searchPattern]
    );
    return result.rows;
  }

  async getStats() {
    const result = await db.query(`
      SELECT COUNT(*) as total, COUNT(CASE WHEN is_active = true THEN 1 END) as active
      FROM courses
    `);
    return result.rows[0];
  }
}

module.exports = new CourseRepository();
