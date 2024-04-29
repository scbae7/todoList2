import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import TodoModel from '../model/todo/todoModel.js';

class TodoController {
  constructor(id){
    this.id = id;
    this.todoModel = new TodoModel('todoModel');
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));
  }
  async todoPage (req,res) {
    try {
      const userId = req.session.user.userId;
      const userName = req.session.user.name;
      // console.log(userId);
      // console.log(userName);
      const todos = await this.todoModel.getTodosForUser(userId);
      // console.log(todos);
      res.render('todo',{todos:todos,fUserName:userName,fUserId:userId});
    } catch(err){
      console.error(err);
      res.status(500).send('서버 오류');
    }
  }
  async addTodo (req,res) {
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
      await this.todoModel.addTodo(
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
  }
  async deleteTodo (req,res) {
    try {
      const todoNum = req.params.todoNum;
      console.log(todoNum);
      const deletedTodo = await this.todoModel.deleteTodo(todoNum);
      console.log(`할일이 삭제되었습니다:`, deletedTodo);
      res.status(200).json({success: true});
    } catch (err) {
      console.error('할일 삭제 중 오류 발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async updateTodo (req, res) {
    try {
      const todoNum = req.body.todoNum; // 클라이언트에서 전달한 todoNum
      const newStatus = String(req.body.newStatus); // 클라이언트에서 전달한 새로운 상태
      console.log(typeof newStatus);
      await this.todoModel.statusUpdate(todoNum,newStatus);
      console.log(`할일 상태가 업데이트되었습니다:`, todoNum, newStatus);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('할일 상태 업데이트 중 오류 발생:', err);
      res.status(500).json({ success: false, message: '서버 오류' });
    }
  }
}
const todoController = new TodoController('todoController');
export default todoController;