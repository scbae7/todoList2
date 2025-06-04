// TodoList main js
// programmed by bae

import dotenv from 'dotenv';
dotenv.config();

// 2024/04/25 v1
import webServerConf from './conf/webServerConf.js';
import webService from './daemon/webServer.js'
import { startKeepAlive } from './daemon/keepAlive.js';

import todoRouter from './router/todoRouter.js'
import userRouter from './router/userRouter.js'
import adminRouter from './router/adminRouter.js'

webService.get('/', (req, res) => {
  res.redirect('/todo/todoMain');
});
class TodoList {  
  constructor(id, webServerConf){
    this.id = id;
    this.webServerConf = webServerConf;
  }
  run(){
    webService.use('/user',userRouter);
    webService.use('/todo',todoRouter);
    webService.use('/admin',adminRouter);
    webService.listen(this.webServerConf.port,()=>{
      console.log(`${this.webServerConf.port} port open!`);
      // startKeepAlive();
    })
  }
}

const todoList = new TodoList(
  'todoList',
  webServerConf
)
todoList.run();

