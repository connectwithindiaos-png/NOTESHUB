require('dotenv').config();
const { pool } = require('../config/database');

async function migrateSettings() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Settings table ready');

    const defaults = [
      { key: 'telegram_url', value: process.env.DEFAULT_TELEGRAM_URL || 'https://t.me/noteshub' },
      { key: 'whatsapp_url', value: process.env.DEFAULT_WHATSAPP_URL || 'https://wa.me/1234567890' },
      { key: 'email', value: process.env.DEFAULT_EMAIL || 'hello@noteshub.com' },
    ];

    for (const { key, value } of defaults) {
      await client.query(
        `INSERT INTO settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO NOTHING`,
        [key, value]
      );
      console.log(`  Setting: ${key} = ${value}`);
    }

    console.log('Settings migration completed');
  } catch (error) {
    console.error('Migration failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrateSettings().catch((err) => {
  console.error(err);
  process.exit(1);
});
