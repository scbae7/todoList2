import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import UserModel from '../model/user/userModel.js';

class UserController {
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
  async userLogin (req, res) {
    try {
      const { userId, password } = req.body;
      const results = await this.userModel.userLogin(userId, password);
      if (results.length > 0) {
        const userName = await this.userModel.getUserInfoByUserId(userId); // 사용자의 이름만 가져옵니다.
        req.session.user = {
          userId: userId,
          name: userName // 여기서는 사용자 이름만 저장합니다.
        };
        console.log(req.session.user.userId);
        console.log(req.session.user.name);
        console.log('로그인 성공!')
        return res.status(200).json({ success: true });
      } else {
        return res.status(401).json({ success: false, message: '아이디나 비밀번호가 잘못되었습니다.' })
      }
    } catch (err) {
      console.error('서버 오류:'+err);
      return res.status(500).json({ success: false });
    }
  }
  async userJoin (req,res) {
    try {
      const { userId, password, email, name } = req.body;
      const count = await this.userModel.idCheck(userId);
      if(count > 0){
        return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.'});
      }
      await this.userModel.userJoin(userId, password, email, name);
      console.log('회원가입 성공');
      res.status(200).json({success: true});
    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userFindId (req, res){
    try {
      const { userName, userEmail } = req.body;
      console.log('아이디 찾기 성공');
      const userInfo = await this.userModel.userFindId(userName, userEmail);
      res.status(200).json({success:true, userInfo: userInfo});
    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userFindPw (req, res){
    try {
      const { userId,userEmail } = req.body;
      const userInfo =  await this.userModel.userFindPw(userId,userEmail);
      res.status(200).json({success:true,message:'비밀번호가 1234!a로 변경됐습니다.'});
      console.log('비밀번호 변경 성공!');
    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userResetPw (req,res) {
    try {
      const {userId,userPw,newPw} = req.body;
      const userInfo = await this.userModel.userResetPw(userId,userPw,newPw);
      res.status(200).json({success:true,message:'비밀번호 재설정 성공!'});
      console.log('비밀번호 재설정 성공!');
    } catch (err) {
      console.error('에러 발생:',err);
      res.status(500).json({success:false,message:'서버 오류'});
    }
  }
}
const userController = new UserController('userController');
export default userController;