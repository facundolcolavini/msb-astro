const { initDB } = require('./setup.db');

(async () => {
  await initDB();
})() 