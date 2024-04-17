const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));

app.get('/login',(req,res)=>{
  res.render('login');
})
app.get('/findId',(req,res)=>{
  res.render('findId');
})
app.get('/findPw',(req,res)=>{
  res.render('findPw');
})
app.get('/resetPw',(req,res)=>{
  res.render('resetPw');
})
app.get('/admin/login',(req,res)=>{
  res.render('adminLogin');
})
app.get('/admin/request',(req,res)=>{
  res.render('adminRequest');
})
app.get('/join',(req,res)=>{
  res.render('join');
})
app.get('/admin',(req,res)=>{
  res.render('admin');
})

app.listen(port,()=>{
  console.log(`${port} port open!`);
})