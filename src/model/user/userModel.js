// const db = require('../db')()
// const mysql = require('mysql');
// const data = mysql.createConnection(db);

import db from '../../conf/db.js';
import mysql from 'mysql';
const data = mysql.createConnection(db());
class UserModel {
  constructor(id){
    this.id = id;
  }
  async getUserAll(){
    try {
      const users = await new Promise((resolve, reject) =>{
        data.query('select * from usertable',
        (err,results)=>{
          if(err) reject(err);
          resolve(results);
        });
      });
      return users;
    } catch (err) {
      throw err;
    }
  }
  async getAdminsAll(){
    try {
      const admins = await new Promise((resolve, reject) =>{
        data.query('select * from requestTable',
        (err,results)=>{
          if(err) reject(err);
          resolve(results);
        });
      });
      return admins;
    } catch (err) {
      throw err;
    }
  }
  async userLogin(userId, password){
    try {
      const results = await new Promise ((resolve, reject)=>{
        data.query(
          'select * from usertable where userId = ? and userPassword = ?', 
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
          'select * from usertable where userId = ? and userPassword = ? and userRole = "admin"',
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
          'select count(*) as count from usertable where userId =?', [userId],
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
          'insert into usertable (userId, userPassword, userEmail, userName) values (?, ?, ?, ?)',
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
      const query = 'SELECT userId,userName FROM usertable WHERE userId = ?';
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
  async userFindId(userName,userEmail) {
    try {
      const query = 'SELECT userId FROM usertable WHERE userName = ? and userEmail';
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [userName,userEmail], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
  async userFindPw(userId,userEmail) {
    try {
      const query = 'update usertable set userPassword = "1234!a" where userId = ? and userEmail =? ';
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [userId,userEmail], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
  async userResetPw(userId,userPw,newPw) {
    try {
      const query = 'update usertable set userPassword = ? where userId = ? and userPassword =? ';
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [newPw,userId,userPw], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
  async adminRequest(userId,passwod) {
    try {
      const query = 'insert into requestTable (userId,userPassword) values (?,?)';
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [newPw,userId,passwod], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
  async adminAccept(adminId) {
    try {
      const query = 'update usertable set userRole = "admin" where userId = ?';
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [adminId], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
      return userInfo;
    } catch (err) {
      throw err;
    }
  }
  async requestDelete(adminId) {
    try {
      const query = "DELETE FROM request_table WHERE userId = ?";
      const [userInfo] = await new Promise((resolve, reject) => {
        data.query(query, [adminId], (err, result) => {
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
// module.exports = UserModel;
export default UserModel;