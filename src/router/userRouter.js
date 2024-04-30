import express from 'express';
// import session from 'express-session';
import userController from '../controller/userController.js';
class UserRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));
    // this.router.use(session({
    //   secret: 'your_secret_key',
    //   resave: false,
    //   saveUninitialized: false,
    //   cookie: { secure: false }
    // }));

    this.router.get('/login',this.renderPage('user/userLogin'));
    this.router.get('/join',this.renderPage('user/userJoin'));
    this.router.get('/findId',this.renderPage('user/userFindId'));
    this.router.get('/findPw',this.renderPage('user/userFindPw'));
    this.router.get('/resetPw',this.renderPage('user/userResetPw'));
    this.router.get('/userDelete',this.renderPage('user/userDelete'));
    this.router.post('/login',userController.userLogin);
    this.router.post('/join',userController.userJoin);
    this.router.post('/findId',userController.userFindId);
    this.router.post('/findPw',userController.userFindPw);
    this.router.post('/resetPw',userController.userResetPw);
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
export default new UserRouter('UserRouter').router;