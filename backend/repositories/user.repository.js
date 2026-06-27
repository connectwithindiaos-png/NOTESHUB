const db = require('../config/database');

class UserRepository {
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async findById(id) {
    const result = await db.query('SELECT id, email, full_name, role, avatar_url, is_active, last_login, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create({ email, passwordHash, fullName, role = 'student' }) {
    const result = await db.query(
      'INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, role, created_at',
      [email, passwordHash, fullName, role]
    );
    return result.rows[0];
  }

  async updateLastLogin(id) {
    await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [id]);
  }

  async updatePassword(id, passwordHash) {
    await db.query('UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [passwordHash, id]);
  }

  async updateProfile(id, { fullName, avatarUrl }) {
    const result = await db.query(
      'UPDATE users SET full_name = COALESCE($1, full_name), avatar_url = COALESCE($2, avatar_url), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, email, full_name, role, avatar_url',
      [fullName, avatarUrl, id]
    );
    return result.rows[0];
  }

  async findAll(page = 1, limit = 20, offset = 0) {
    const countResult = await db.query('SELECT COUNT(*) FROM users');
    const total = parseInt(countResult.rows[0].count);
    const result = await db.query(
      'SELECT id, email, full_name, role, avatar_url, is_active, last_login, created_at FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return { users: result.rows, total };
  }

  async toggleActive(id) {
    const result = await db.query(
      'UPDATE users SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id, is_active',
      [id]
    );
    return result.rows[0];
  }

  async getStats() {
    const result = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN role = 'student' THEN 1 END) as students,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
        COUNT(CASE WHEN is_active = true THEN 1 END) as active
      FROM users
    `);
    return result.rows[0];
  }
}

module.exports = new UserRepository();
