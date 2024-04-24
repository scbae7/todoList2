// const db = require('../db')()
// const mysql = require('mysql');
// const data = mysql.createConnection(db);

import db from '../db.js';
import mysql from 'mysql';

const data = mysql.createConnection(db());
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
  async addTodo(
    todoCont,
    todoDate,
    todoDesc,
    todoUserId,
    todoTag = null,
    todoFile = null,
    todoSound = null
  ){
    try {
      await new Promise((resolve, reject)=>{
        data.query(
          'insert into todotable (todolist_cont, due_date, todo_desc, userId, todo_tag, todo_file, todo_sound) values (?, ?, ?, ?, ?, ?, ?)',
          [
            todoCont,
            todoDate,
            todoDesc,
            todoUserId,
            todoTag,
            todoFile,
            todoSound,
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
}
// module.exports = TodoModel;
export default TodoModel;