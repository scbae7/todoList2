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
}
module.exports = TodoModel;