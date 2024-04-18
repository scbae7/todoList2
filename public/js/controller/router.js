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
router.post('/login',(req,res)=>{
  const {username,password} = req.body;
  console.log(username,password);
})
router.get('/join',(req,res)=>{
  res.render('join');
})
router.post('/join',(req,res)=>{
  const data3 = req.body;
  console.log(data3)
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

