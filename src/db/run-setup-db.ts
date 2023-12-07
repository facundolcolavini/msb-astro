const { initDB } = require('./setup.db');

initDB().catch(error => {
  console.error(error);
  process.exit(1);
});