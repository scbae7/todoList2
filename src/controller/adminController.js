import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import UserModel from '../model/user/userModel.js';

class AdminController {
  constructor(id){
    this.id = id;
    this.userModel = new UserModel('userModel');
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
  async adminLogin (req,res) {
    try {
      const { userId, password } = req.body;
      const results = await this.userModel.adminUserLogin(userId, password);
      if(results.length>0){
        console.log('관리자 로그인 성공!')
        req.session.user = {
          userId: userId,
          name: results[0].userName // 예를 들어, results 객체에서 사용자의 이름을 가져옵니다.
        };
        console.log(results);
        console.log(req.session.user.userId);
        console.log(req.session.user.name);
        return res.status(200).json({success:true});
      }else{
        const userResults = await this.userModel.userLogin(userId, password);
        if(userResults.length>0){
          return res.status(401).json({success:false, message: '관리자 권한이 없습니다.'});
        }else{
          return res.status(401).json({success:false, message: '아이디나 비밀번호가 잘못되었습니다.'});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async adminRequest (req,res) {
    try {
      const {userId, password} = req.body;
      const userResults = await this.userModel.userLogin(userId,password);
      // res.status(200).json({success:true});
      if(userResults.length>0){
        const adminResults = await this.userModel.adminRequest(userId,password);
      }else{
        return res.status(401).json({success:false,message:'아이디나 비밀번호가 잘못되었습니다.'})
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message:'서버 오류'});
    }

  }
  async adminAccept (req,res) {
    try {
      const {adminId} = req.body; 
      const statusResult = await this.userModel.adminAccept(adminId); 
      await this.userModel. requestDelete(adminId);
      console.log(adminId);
      return res.status(200).json({success:true});
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async adminReject (req,res) {
    try {
      const {adminId} = req.body;
      console.log(adminId);
      await this.userModel. requestDelete(adminId);
      return res.status(200).json({success:true});
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async adminPage (req, res) {
    try {
      const users = await this.userModel.getUserAll();
      const todos = await this.todoModel.getTodoAll();
      const requests = await this.userModel.getAdminsAll();
      const userId = req.session.user.userId;
      const userName = req.session.user.name;
     
      console.log(userId);
      console.log(userName);
      console.log(users.length);
      console.log(todos.length);
      console.log(requests.length);
      res.render('admin',{todos:todos,users:users,userName:userName,requests:requests});
    } catch (err) {
      console.error(err);
      res.status(500).send('서버 오류');
    }
  }
}
const adminController = new AdminController('adminController');
export default adminController;