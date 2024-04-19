const db = () => {
  return {
    host: 'localhost',
    user:'root',
    // user:'c19st08',
    // password:'IwIiJGM98B8C7L1M',
    password: '1234',
    database:'c19st08',
    charset: 'utf8mb4',
    collate:'utf8mb4_unicode_ci'
  };
};

module.exports = db;