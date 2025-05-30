import cloudinary from '../conf/cloudinary.js';
import streamifier from 'streamifier';

import todoModel from '../model/todo/todoModel.js';
import path from 'path';
import fs from 'fs';

class TodoController {
  constructor(id){
    this.id = id;
  }
  async todoPage (req,res) {
    if(req.session && req.session.user ){
      console.log("req.session",req.session.user)
      try {
        let userId = '';
        let userName = '';
        let todos = '';
        let userInfo = '';
        console.log("req",req.session);
        if(req.session.user.userId && req.session.user.name){
          userId = req.session.user.userId;
          userName = req.session.user.name;
        }
        console.log("userId"+typeof userId);
  
        console.log("userName"+userName);
        todos = await todoModel.getTodosForUser(userId);
        [userInfo] = await todoModel.getUserInfo(userId);
        console.log("todos"+todos);
        console.log("userInfo",userInfo);
  
        // for(let key in userInfo){
        //   if(userInfo.hasOwnProperty(key)){
        //     console.log(key + ":" + JSON.stringify(userInfo[key]));
        //   }
        // }
        console.log("userEmail:" + userInfo.userEmail)
        
        res.render('todo/todoMain',{todos:todos,userName:userName,userId:userId, userEmail:userInfo.userEmail});
        // res.render('todo/todoMain');
      } catch(err){
        console.error(err);
        res.status(500).send('서버 오류');
      }
    }else{
      res.redirect("/user/login");
    }
   
  }
  async addTodo (req,res) {
    try{
      const {
        todoCont,
        todoDate,
        todoDesc,
        todoTag,
        todoUserId
      } = req.body;

      console.log(
        req.body
      );

      let todoFile = null;

      // 이미지가 있을 경우 cloudinary 업로드
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'todo' }, // 원하는 cloudinary 폴더
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        todoFile = result.secure_url; // ✅ Cloudinary URL만 저장
      }

      console.log(req.file);

      await todoModel.addTodo(
        todoCont,
        todoDate,
        todoDesc,
        todoUserId,
        todoTag,
        todoFile,
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
      let todoFile;
      console.log(req.body);
      console.log(req.body.requestBody.todoNum);
      let todoNum = req.body.requestBody.todoNum;
      
      // console.log(req.body.requestBody.todoFile);
      // const {todoNum,todoFile} = req.body;
      // console.log(todoNum);
      // console.log(todoFile);
      if(!todoFile){
        todoFile = null;
      }else {
        todoFile = null;
        todoFile = req.body.requestBody.todoFile;
        console.log("3"+todoFile);
        fs.unlink(todoFile,(err)=>{
          if(err){
            console.err('파일삭제실패',err);
            return;
          }
          console.log('파일삭제성공')
        })
      }
      const deletedTodo = await todoModel.deleteTodo(todoNum);
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
      await todoModel.statusUpdate(todoNum,newStatus);
      console.log(`할일 상태가 업데이트되었습니다:`, todoNum, newStatus);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('할일 상태 업데이트 중 오류 발생:', err);
      res.status(500).json({ success: false, message: '서버 오류' });
    }
  }
  async editTodo (req,res) {
    try{
      const {
        todoCont,
        todoDate,
        todoDesc,
        todoTag,
        todoUserId,
        todoNum
      } = req.body;

      console.log(
        "reqBody",req.body
      );

      let todoFile = null;
      let oldTodoFile = null;

      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'todo' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
        todoFile = result.secure_url; // Cloudinary URL 저장
      }

      if(req.body.oldTodoFile){
        oldTodoFile = req.body.oldTodoFile;
      }

      console.log("oldTodo",oldTodoFile);
      console.log("reqFile",req.file);

      await todoModel.editTodo(
        todoCont,
        todoDate,
        todoDesc,
        todoUserId,
        todoTag,
        todoFile,
        todoNum,
      );
      
      if(oldTodoFile && req.file){
        // fs.unlink(oldTodoFile,(err)=>{
        //   if(err){
        //     console.error("파일 삭제 실패:",err);
        //   }else{
        //     console.log("기존 파일 삭제 성공")
        //   }
        // })
        console.log("기존 파일 삭제 필요 시 Cloudinary API 활용");
      }
      console.log('투두수정 성공');
      res.status(200).json({success: true});
    }catch(err){
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
}
const todoController = new TodoController('todoController');
export default todoController;