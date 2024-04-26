import express from 'express';
import userController from '../controller/userController.js';
class UserRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();

    this.router.get('/login',this.renderPage('user/userLogin'));
    this.router.get('/join',this.renderPage('user/userJoin'));
    this.router.get('/findId',this.renderPage('user/userFindId'));
    this.router.get('/findPw',this.renderPage('user/useFindPw'));
    this.router.get('/resetPw',this.renderPage('user/userResetPw'));
    this.router.get('/userDelete',this.renderPage('user/userDelete'));
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
export default UserRouter;