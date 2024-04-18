const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../model/db')();
const data = mysql.createConnection(db);
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/login',(req,res)=>{
  res.render('login');
})
// router.post('/login',(req,res)=>{
//   const {username,password} = req.body;
//   console.log(username,password);
//   data.query('select * from userTable',(err,results)=>{
//     if(err){
//       console.error('쿼리 실행 중 오류 발생 : ', err);
//       res.redirect('/login');
//     }else{
//       results.forEach(row=>{
//         console.log(row);
//       })
//     }
//   })
// })
// router.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   data.query('select * from userTable where userID =? and userPassword =?',[username, password],(err,results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('서버 오류');
//     } else {
//       if (results.length > 0) {
//         // req.session.user = results[0];
//         res.redirect('/todo');
//       } else {
//         res.redirect('/login')
//       }
//     }
//   });
// });
router.post('/login', (req, res) => {
  const { userId, password } = req.body;

  data.query('select * from userTable where userID = ? and userPassword = ?', [userId, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: '서버 오류' });
    } else {
      if (results.length > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: '아이디나 비밀번호가 잘못되었습니다.' });
      }
    }
  });
});

router.get('/join',(req,res)=>{
  res.render('join');
})
router.post('/join',(req,res)=>{
  const { userId, password,email,name } = req.body;
  console.log(`userId:${userId}`);
  console.log(`password:${password}`);
  console.log(`email:${email}`);
  console.log(`name:${name}`);

  data.query('select count(*) as count from userTable where userId = ?', [userId],(err,results)=>{
    if(err){
      console.error('쿼리 실행 중 오류 발생:',err);
      return res.status(500).json({ success: false, message: '서버 오류' });
    }
    const count = results[0].count;

    if(count > 0){
      return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.' });
    }
    data.query('insert into userTable (userId, userPassword, userEmail, userName) values (?,?,?,?)',
    [userId, password, email, name],(err,results)=>{
      if(err){
        console.err('쿼리 실행 중 오류 발생:',err);
        return res.status(500).json({ success: false, message: '서버 오류' });
      }else{
        console.log(results);
        res.status(200).json({ success: true })
      }
    });
  })
})

router.get('/findId',(req,res)=>{
  res.render('findId');
})
router.get('/findPw',(req,res)=>{
  res.render('findPw');
})
router.get('/resetPw',(req,res)=>{
  res.render('resetPw');
})
router.get('/admin/login',(req,res)=>{
  res.render('adminLogin');
})
router.get('/admin/request',(req,res)=>{
  res.render('adminRequest');
})

router.get('/admin',(req,res)=>{
  res.render('admin');
})
router.get('/todo',(req,res)=>{
  res.render('todo');
})
router.get('/deleteUser',(req,res)=>{
  res.render('deleteUser');
})
module.exports = router;

