import express from 'express';
import todoController from '../controller/todoController.js';
class TodoRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));

    this.router.get('/todoMain',todoController.todoPage);
    // checkpage 나중에 삭제
    this.router.get('/2',this.renderPage('todo/todoMain2'));
    this.router.post('/addTodo',todoController.addTodo);
    this.router.post('/deleteTodo/:todoNum',todoController.deleteTodo)
    this.router.post('/updateTodo',todoController.updateTodo)
  }
  // renderPage(page){
  //   return (req,res)=>{
  //     try {
  //       res.render(page);
  //     } catch (err) {
  //       console.error('서버 오류', err);
  //       res.status(500).json({success: false, message: '서버 오류'});
  //     }
  //   }
  // }
  renderPage(page) {
    return (req, res) => {
      res.render(page);
    };
  }
}
export default new TodoRouter('TodoRouter').router;