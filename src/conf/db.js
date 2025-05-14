import dotenv from 'dotenv';
const db = () => {
  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  };
};
export default db;