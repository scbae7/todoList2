import express from 'express';
import adminController from '../controller/adminController.js';
class AdminRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();

    this.router.get('/',this.renderPage('admin/adminMain'));
    this.router.get('/login',this.renderPage('admin/adminLogin'));
    // checkpage 나중에 삭제
    this.router.get('/2',this.renderPage('admin/adminMain2'));
    this.router.get('/request',this.renderPage('admin/adminRequest'));
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
export default AdminRouter;