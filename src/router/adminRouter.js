import express from 'express';
import session from 'express-session';
import adminController from '../controller/adminController.js';
class AdminRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));
    this.router.use(session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));

    this.router.get('/1',adminController.adminPage);
    this.router.get('/login',this.renderPage('admin/adminLogin'));
    // checkpage 나중에 삭제
    this.router.get('/2',this.renderPage('admin/adminMain2'));
    this.router.get('/request',this.renderPage('admin/adminRequest'));
    this.router.post('/login',adminController.adminLogin);
    this.router.post('/request',adminController.adminRequest);
    this.router.post('/request/accept',adminController.adminAccept);
    this.router.post('/request/reject',adminController.adminReject);
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
export default new AdminRouter('AdminRouter').router;
