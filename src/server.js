// TodoList main js
// programmed by bae

// 2024/04/25 v1
// import express from 'express';
import webServerConf from './conf/webServerConf.js';
import webService from './daemon/webServer.js'
// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.static('./src/public'));

// const controller = require('./src/controller/controller.js');
// import controller from './controller/controller.js';
import todoRouter from './router/todoRouter.js'
import userRouter from './router/userRouter.js'
import adminRouter from './router/adminRouter.js'

// app.set('view engine', 'pug');
// app.set('views','./src/views');

// app.use('/',controller);

// app.listen(port,()=>{
//   console.log(`${port} port open!`);
// })
class TodoList {  
  constructor(id, webServerConf){
    this.id = id;
    this.webServerConf = webServerConf;
  }
  run(){
    webService.use('/user',todoRouter);
    webService.use('/',userRouter);
    webService.use('/admin',adminRouter);
    webService.listen(this.webServerConf.port,()=>{
      console.log(`${this.webServerConf.port} port open!`);
    })
  }
}
const todoList = new TodoList(
  'todoList',
  webServerConf
)
todoList.run();