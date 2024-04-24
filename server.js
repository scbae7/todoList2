const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('src/public'));

const controller = require('./src/public/js/controller/router');

app.set('view engine', 'pug');
app.set('views','./src/views');

app.use('/',controller);

app.listen(port,()=>{
  console.log(`${port} port open!`);
})