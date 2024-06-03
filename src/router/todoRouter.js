import express from 'express';
import multer from 'multer';
import path from 'path';
import todoController from '../controller/todoController.js';
class TodoRouter {
  constructor(id){
    this.id = id;
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(express.urlencoded({ extended: true }));

    this.storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'src/public/file'); // 파일이 저장될 폴더 지정
      },
      filename: function (req, file, cb) {
          cb(null, Date.now() + path.extname(file.originalname)); // 파일명 설정
      }
    });

    this.fileFilter = (req,file,cb)=>{
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // 허용
      } else {
        cb(new Error('Only .jpg and .png files are allowed!'), false); // 허용 안 함
      }
    }

    this.upload = multer({ 
      storage: this.storage,
      fileFilter: this.fileFilter
     });

    this.router.get('/todoMain',todoController.todoPage);
    // checkpage 나중에 삭제
    this.router.get('/2',this.renderPage('todo/todoMain2'));
    this.router.post('/addTodo',this.upload.single('todoFile'),todoController.addTodo);
    this.router.post('/deleteTodo/:todoNum',todoController.deleteTodo);
    this.router.post('/updateTodo',todoController.updateTodo);
    this.router.post('/editTodo',this.upload.single('todoFile'),todoController.editTodo);

   
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