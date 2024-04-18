const db = () => {
  return {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'c19st08',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  };
};

module.exports = db;