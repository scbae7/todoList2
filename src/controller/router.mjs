// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
// const UserModel = require('../model/user/userModel');
// const myUser = new UserModel('myUser');
// const TodoModel = require('../model/todo/todoModel');
// const myTodo = new TodoModel('myTodo');
// const session = require('express-session');
// const nodemailer = require('nodemailer');

import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import UserModel from '../model/user/userModel.mjs';
import TodoModel from '../model/todo/todoModel.mjs';
import session from 'express-session';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const myUser = new UserModel('myUser');
const myTodo = new TodoModel('myTodo');


router.use(session({
  secret: 'your_secret_key', // 세션을 서명하는 데 사용되는 비밀키 (필수)
  resave: false, // 변경되지 않은 세션을 다시 저장할지 여부를 나타내는 옵션 (권장: false)
  saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장할지 여부를 나타내는 옵션 (권장: false)
  // store: sessionStore, // 세션을 저장할 저장소 설정 (선택 사항)
  cookie: { secure: false } // 클라이언트에 전송되는 세션 쿠키 설정 (예: HTTPS를 사용할 때 true로 설정)
}));


router.get('/login',(req,res)=>{
  res.render('login');
})
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const results = await myUser.userLogin(userId, password);
    if (results.length > 0) {
      const userName = await myUser.getUserInfoByUserId(userId); // 사용자의 이름만 가져옵니다.
      req.session.user = {
        userId: userId,
        name: userName // 여기서는 사용자 이름만 저장합니다.
      };
      console.log(req.session.user.userId);
      console.log(req.session.user.name);
      console.log('로그인 성공!')
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: '아이디나 비밀번호가 잘못되었습니다.' })
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: '서버 오류' });
  }
});

router.get('/join',(req,res)=>{
  res.render('join');
})
router.post('/join', async (req,res)=>{
  try {
    const { userId, password, email, name } = req.body;
    const count = await myUser.idCheck(userId);
    if(count > 0){
      return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.'});
    }
    await myUser.userJoin(userId, password, email, name);
    console.log('회원가입 성공');
    res.status(200).json({success: true});
  } catch (err) {
    console.error('에러발생:',err);
    res.status(500).json({success:false, message:'서버 오류'});
  }
})

router.get('/findId',(req,res)=>{
  res.render('findId');
})
// 구글 앱 비밀번호나 보안설정을 풀어야함
// router.post('/findId', (req,res)=>{
//   console.log('findId');
//   const { userName, email } = req.body;
//   console.log(userName, email);
//   try {
//     const trans = nodemailer.createTransport({
//       service: 'google',
//       auth: {
//         // 내 구글 아이디
//         user:'scbae27@gmail.com',
//         pass:'구글 비밀번호'
//       }
//     });
//     const userId = '배석찬 아이디';
//     const userEmail = 'sna12345@naver.com';

//     const mailOptions = {
//       from : 'scbae27@gmail.com',
//       to : userEmail,
//       subject: '유저 아이디를 보냅니다.',
//       text: `유저 아이디는 ${userId}`
//     };

//     trans.sendMail(mailOptions,(error,info)=>{
//       if(error){
//         console.error('이메일 전송 실패:',error);
//         // res.status(500).send('이메일 전송에 실패했습니다.');
//       }else{
//         console.log('이메일 전송 성공:',info.response);
//         res.send('이메일을 성공적으로 보냈습니다.');
//       }
//     })
//   } catch (err) {
//     console.error('에러발생:',err);
//     res.status(500).json({success:false, message:'서버 오류'});
//   }
// })
router.get('/findPw',(req,res)=>{
  res.render('findPw');
})
router.post('/findPw',(req,res)=>{
  const { userId, email } = req.body;
  console.log(req.body);
})
router.get('/resetPw',(req,res)=>{
  res.render('resetPw');
})
router.get('/admin/login',(req,res)=>{
  res.render('adminLogin');
})
router.post('/admin/login', async (req,res)=>{
  try {
    const { userId, password } = req.body;
    const results = await myUser.adminUserLogin(userId, password);
    if(results.length>0){
      console.log('관리자 로그인 성공!')
      req.session.user = {
        userId: userId,
        name: results[0].userName // 예를 들어, results 객체에서 사용자의 이름을 가져옵니다.
      };
      console.log(results);
      console.log(req.session.user.userId);
      console.log(req.session.user.name);
      return res.status(200).json({success:true});
    }else{
      const userResults = await myUser.userLogin(userId, password);
      if(userResults.length>0){
        return res.status(401).json({success:false, message: '관리자 권한이 없습니다.'});
      }else{
        return res.status(401).json({success:false, message: '아이디나 비밀번호가 잘못되었습니다.'});
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({success:false, message:'서버 오류'});
  }
})
router.get('/admin/request',(req,res)=>{
  res.render('adminRequest');
})

router.get('/admin', async (req,res)=>{
  try {
    const users = await myUser.getUserAll();
    const todos = await myTodo.getTodoAll();
    const userId = req.session.user.userId;
    const userName = req.session.user.name;
   
    console.log(userId);
    console.log(userName);
    res.render('admin',{todos:todos,users:users,userName:userName});
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
  
})

router.get('/admin2',(req,res)=>{
  res.render('admin2');
})

router.get('/todo', async(req,res)=>{
  try {
    const userId = req.session.user.userId;
    const userName = req.session.user.name;
    // console.log(userId);
    // console.log(userName);
    const todos = await myTodo.getTodosForUser(userId);
    // console.log(todos);
    res.render('todo',{todos:todos,fUserName:userName,fUserId:userId});
  } catch(err){
    console.error(err);
    res.status(500).send('서버 오류');
  }
})
router.get('/todo2', async(req,res)=>{
  res.render('todo2')
})
router.post('/addTodo', async(req,res)=>{
  try{
    const {
      todoCont,
      todoDate,
      todoDesc,
      todoTag,
      todoFile,
      todoSound,
      todoUserId
    } = req.body;
    console.log(
      req.body
    );
    await myTodo.addTodo(
      todoCont,
      todoDate,
      todoDesc,
      todoUserId,
      todoTag,
      todoFile,
      todoSound
    );
    console.log('투두추가 성공');
    res.status(200).json({success: true});
  }catch(err){
    console.error('에러발생:',err);
    res.status(500).json({success:false, message:'서버 오류'});
  }
})

router.get('/deleteUser',(req,res)=>{
  res.render('deleteUser');
})

router.delete('/deleteTodo/:todoNum', async (req,res)=>{
  try {
    const todoNum = req.params.todoNum;
    console.log(todoNum);
    const deletedTodo = await myTodo.deleteTodo(todoNum);
    console.log(`할일이 삭제되었습니다:`, deletedTodo);
    res.status(200).json({success: true});
  } catch (err) {
    console.error('할일 삭제 중 오류 발생:',err);
    res.status(500).json({success:false, message:'서버 오류'});
  }
})
// module.exports = router;
export default router;
