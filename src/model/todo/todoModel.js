import db from '../../conf/db.js';
import mysql from 'mysql';

const data = mysql.createConnection(db());

data.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err.message);
  } else {
    console.log('DB 연결 성공');
  }
})
class TodoModel {
  constructor(id) {
    this.id = id;
  }
  async getTodoAll(){
    try {
      const todos = await new Promise((resolve, reject) =>{
        data.query('select * from todotable',
        (err,results)=>{
          if(err) reject(err);
          resolve(results);
        });
      });
      return todos;
    } catch (err) {
      throw err;
    }
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
  async getUserInfo(userId) {
    try {
      const userInfo = await new Promise((resolve, reject) => {
        data.query('select * from usertable where userId =?',
          [userId],
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
  async getTodosForUser(userId) {
    // 데이터베이스 쿼리를 사용하여 해당 사용자에게 할당된 모든 할 일과 사용자 이름 조회
    try {
      const str = `SELECT *, u.userName,u.userEmail FROM todotable as t INNER JOIN usertable as u ON t.userId = u.userId WHERE t.userId = ${userId} order by t.due_date asc;`;
      console.log(str);
      const todos = await new Promise((resolve, reject) => {
        data.query(`SELECT *, u.userName,u.userEmail FROM todotable as t INNER JOIN usertable as u ON t.userId = u.userId WHERE t.userId = ? order by t.due_date asc;`,
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
  async addTodo(
    todoCont,
    todoDate,
    todoDesc,
    todoUserId,
    todoTag = null,
    todoFile = null,
  ){
    try {
      await new Promise((resolve, reject)=>{
        data.query(
          'insert into todotable (todolist_cont, due_date, todo_desc, userId, todo_tag, todo_file) values (?, ?, ?, ?, ?, ?)',
          [
            todoCont,
            todoDate,
            todoDesc,
            todoUserId,
            todoTag,
            todoFile,
          ],
          (err,results)=>{
            if(err){
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
      return {success:true, message:'투두 추가 성공'};
    } catch (err) {
      throw err;
    }
  }
  async deleteTodo(todoNum) {
    // 데이터베이스 쿼리를 사용하여 해당 사용자에게 할당된 모든 할 일과 사용자 이름 조회
    try {
      const todos = await new Promise((resolve, reject) => {
        data.query(`delete from todotable where todo_num = ?`,
          [todoNum],
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
  async statusUpdate(todoNum) {
    // 데이터베이스 쿼리를 사용하여 해당 사용자에게 할당된 모든 할 일과 사용자 이름 조회
    try {
      const todos = await new Promise((resolve, reject) => {
        data.query(`UPDATE todotable SET status = '완료' WHERE todo_num = ?`,
          [todoNum],
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
  async editTodo(
    todoCont,
    todoDate,
    todoDesc,
    todoUserId,
    todoTag,
    todoFile,
    todoNum,
) {
    try {
        const todos = await new Promise((resolve, reject) => {
            data.query(
                `UPDATE todotable SET todolist_cont=?, due_date=?, todo_desc=?, userId=?, todo_tag=?, todo_file=? WHERE todo_num=?`,
                [
                    todoCont,
                    todoDate,
                    todoDesc,
                    todoUserId,
                    todoTag,
                    todoFile,
                    todoNum,
                ],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
        return todos;
    } catch (err) {
        throw err;
    }
}

}
const todoModel = new TodoModel('todoModel');
export default todoModel;