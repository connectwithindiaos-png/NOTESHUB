const db = require('../config/database');

class SettingRepository {
  async findAll() {
    const result = await db.query('SELECT key, value FROM settings ORDER BY key ASC');
    const obj = {};
    for (const row of result.rows) {
      obj[row.key] = row.value;
    }
    return obj;
  }

  async findByKey(key) {
    const result = await db.query('SELECT * FROM settings WHERE key = $1', [key]);
    return result.rows[0] || null;
  }

  async upsert(key, value) {
    const result = await db.query(
      `INSERT INTO settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [key, value]
    );
    return result.rows[0];
  }

  async bulkUpsert(entries) {
    for (const { key, value } of entries) {
      await this.upsert(key, value);
    }
    return this.findAll();
  }
}

module.exports = new SettingRepository();
