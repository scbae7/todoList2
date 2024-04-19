const db = require('../db')()
const mysql = require('mysql');
const data = mysql.createConnection(db);
class TodoModel {
  constructor(id) {
    this.id = id;
  }
  async getTodoUserId(userId) {
    try {
      const todos = await new Promise((resolve, reject) => {
        data.query('select * from todoTable where userId =?',
          [userId],
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
      });
      return todos;
    } catch (err) {
      throw err;
    }
  }
  async getTodosForUser(userId) {
    // 데이터베이스 쿼리를 사용하여 해당 사용자에게 할당된 모든 할 일과 사용자 이름 조회
    try {
      const todos = await new Promise((resolve, reject) => {
        data.query(`SELECT *, usertable.userName FROM todotable INNER JOIN usertable ON todotable.userId = usertable.userId WHERE todotable.userId = ?;`,
          [userId],
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
      });
      return todos;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = TodoModel;