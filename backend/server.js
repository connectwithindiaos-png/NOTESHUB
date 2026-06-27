require('dotenv').config();
const app = require('./app');
const config = require('./config');

const server = app.listen(config.port, () => {
  console.log(`\n========================================`);
  console.log(`  Notes Hub Backend API`);
  console.log(`  Environment: ${config.nodeEnv}`);
  console.log(`  Port: ${config.port}`);
  console.log(`  URL: http://localhost:${config.port}`);
  console.log(`========================================\n`);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
