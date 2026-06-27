require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function migrate() {
  console.log('Starting database migration...');
  const client = await pool.connect();
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const indexesPath = path.join(__dirname, 'indexes.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    const indexes = fs.readFileSync(indexesPath, 'utf-8');

    console.log('Creating tables...');
    await client.query(schema);
    console.log('Tables created successfully');

    console.log('Creating indexes...');
    await client.query(indexes);
    console.log('Indexes created successfully');

    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
