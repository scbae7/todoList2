import express from 'express';
import todoController from '../controller/todoController.js';
class TodoRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();

    this.router.get('/',this.renderPage('todo/todoMain'));
    // checkpage 나중에 삭제
    this.router.get('/2',this.renderPage('todo/todoMain2'));
  }
  renderPage(page){
    return (req,res)=>{
      try {
        res.render(page);
      } catch (err) {
        console.error('서버 오류', err);
        res.status(500).json({success: false, message: '서버 오류'});
      }
    }
  }
}
export default TodoRouter;