import express from 'express';
import adminController from '../controller/adminController.js';
class AdminRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();

    this.router.get('/',adminController.adminPage);
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

// 회원인지 아닌지 확인하고 맞으면 저장만
// 수락 누르면 role admin
// 둘다 뭘하든 삭제