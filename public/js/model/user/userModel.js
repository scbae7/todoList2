const db = require('../db')()
const mysql = require('mysql');
const data = mysql.createConnection(db);
class UserModel {
  constructor(id){
    this.id = id;
  }
  async userLogin(userId, password){
    try {
      const results = await new Promise ((resolve, reject)=>{
        data.query(
          'select * from userTable where userId = ? and userPassword = ?', 
          [userId, password],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      return results;
    }catch (err) {
      throw err;
    }
  }
  async adminUserLogin(userId, password){
    try {
      console.log('s')
      const results = await new Promise ( (resolve, reject)=>{
        data.query(
          'select * from userTable where userId = ? and userPassword = ? and userRole = "admin"',
          [userId, password],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
      return results;
    } catch (err) {
      throw err;
    }
  }
  
  async idCheck(userId){
    try{
      const results = await new Promise( (resolve, reject)=>{
        data.query(
          'select count(*) as count from userTable where userId =?', [userId],
          (err,results)=> {
            if (err) reject(err);
            resolve(results);
          }
        );
      });
      return results;
    } catch (err) {
      throw err;
    }
  }
  async userJoin(userId, password, email, name){
    try {
      const count = await this.idCheck(userId);
      if(count > 0){
        throw new Error('이미 존재하는 아이디입니다.');
      }
      await new Promise((resolve, reject)=>{
        data.query(
          'insert into userTable (userId, userPassword, userEmail, userName) values (?, ?, ?, ?)',
          [userId, password, email, name],
          (err,results)=>{
            if(err){
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
      return {success:true, message:'회원가입 성공'};
    } catch (err) {
      throw err;
    }
  }
  async getUserInfoByUserId(userId) {
    try {
      const query = 'SELECT userId,userName FROM userTable WHERE userId = ?';
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [userId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserModel;