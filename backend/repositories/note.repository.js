const db = require('../config/database');

class NoteRepository {
  async findAll(options = {}) {
    const { page = 1, limit = 20, offset = 0, isActive = true, courseId, semesterId, subjectId, category } = options;
    const conditions = ['n.is_active = $1'];
    const params = [isActive];
    let paramIdx = 2;

    if (courseId) {
      conditions.push(`n.course_id = $${paramIdx++}`);
      params.push(courseId);
    }
    if (semesterId) {
      conditions.push(`n.semester_id = $${paramIdx++}`);
      params.push(semesterId);
    }
    if (subjectId) {
      conditions.push(`n.subject_id = $${paramIdx++}`);
      params.push(subjectId);
    }
    if (category) {
      conditions.push(`n.category = $${paramIdx++}`);
      params.push(category);
    }

    const whereClause = conditions.join(' AND ');

    const countResult = await db.query(
      `SELECT COUNT(*) FROM notes n WHERE ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count);

    params.push(limit, offset);
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE ${whereClause}
       ORDER BY n.created_at DESC
       LIMIT $${paramIdx++} OFFSET $${paramIdx}`,
      params
    );

    return { notes: result.rows, total };
  }

  async findBySlug(slug) {
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.slug = $1`,
      [slug]
    );
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async create(data) {
    const { subjectId, semesterId, courseId, title, slug, description, content, category, fileType, fileId, driveUrl, previewUrl, downloadUrl, thumbnailUrl, fileSize, pageCount, authorName, authorId, tags, isFeatured, isFree } = data;
    const result = await db.query(
      `INSERT INTO notes (subject_id, semester_id, course_id, title, slug, description, content, category, file_type, file_id, drive_url, preview_url, download_url, thumbnail_url, file_size, page_count, author_name, author_id, tags, is_featured, is_free)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
       RETURNING *`,
      [subjectId, semesterId, courseId, title, slug, description, content, category || 'note', fileType, fileId, driveUrl, previewUrl, downloadUrl, thumbnailUrl, fileSize, pageCount, authorName, authorId, tags ? JSON.stringify(tags) : null, isFeatured || false, isFree !== undefined ? isFree : true]
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
        values.push(key === 'tags' ? JSON.stringify(value) : value);
        idx++;
      }
    }
    if (fields.length === 0) return null;
    values.push(id);
    const result = await db.query(
      `UPDATE notes SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${idx} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  async delete(id) {
    const result = await db.query('DELETE FROM notes WHERE id = $1 RETURNING id', [id]);
    return result.rows[0] || null;
  }

  async incrementView(id) {
    const result = await db.query(
      'UPDATE notes SET view_count = view_count + 1 WHERE id = $1 RETURNING view_count',
      [id]
    );
    return result.rows[0] || null;
  }

  async incrementDownload(id) {
    const result = await db.query(
      'UPDATE notes SET download_count = download_count + 1 WHERE id = $1 RETURNING download_count',
      [id]
    );
    return result.rows[0] || null;
  }

  async search(query, options = {}) {
    const { page = 1, limit = 20, offset = 0 } = options;
    const searchPattern = `%${query}%`;
    const countResult = await db.query(
      `SELECT COUNT(*) FROM notes n WHERE (n.title ILIKE $1 OR n.description ILIKE $1 OR n.author_name ILIKE $1) AND n.is_active = true`,
      [searchPattern]
    );
    const total = parseInt(countResult.rows[0].count);
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE (n.title ILIKE $1 OR n.description ILIKE $1 OR n.author_name ILIKE $1) AND n.is_active = true
       ORDER BY n.download_count DESC, n.view_count DESC
       LIMIT $2 OFFSET $3`,
      [searchPattern, limit, offset]
    );
    return { notes: result.rows, total };
  }

  async findBySubject(subjectId) {
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.subject_id = $1 AND n.is_active = true
       ORDER BY n.created_at DESC`,
      [subjectId]
    );
    return result.rows;
  }

  async findBySemester(semesterId) {
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.semester_id = $1 AND n.is_active = true
       ORDER BY n.created_at DESC`,
      [semesterId]
    );
    return result.rows;
  }

  async findFeatured(limit = 10) {
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.is_featured = true AND n.is_active = true
       ORDER BY n.download_count DESC
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  }

  async getRelated(noteId, limit = 5) {
    const note = await this.findById(noteId);
    if (!note) return [];
    const result = await db.query(
      `SELECT n.*, s.name as subject_name, s.slug as subject_slug, sem.name as semester_name, sem.semester_number, c.name as course_name, c.slug as course_slug
       FROM notes n
       LEFT JOIN subjects s ON n.subject_id = s.id
       LEFT JOIN semesters sem ON n.semester_id = sem.id
       LEFT JOIN courses c ON n.course_id = c.id
       WHERE n.subject_id = $1 AND n.id != $2 AND n.is_active = true
       ORDER BY n.download_count DESC
       LIMIT $3`,
      [note.subject_id, noteId, limit]
    );
    return result.rows;
  }

  async getStats() {
    const result = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN is_featured = true THEN 1 END) as featured,
        COUNT(CASE WHEN is_active = true THEN 1 END) as active,
        COALESCE(SUM(view_count), 0) as total_views,
        COALESCE(SUM(download_count), 0) as total_downloads
      FROM notes
    `);
    return result.rows[0];
  }
}

module.exports = new NoteRepository();
