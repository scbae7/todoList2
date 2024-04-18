const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const controller = require('./public/js/controller/router');



app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',controller);

app.listen(port,()=>{
  console.log(`${port} port open!`);
})