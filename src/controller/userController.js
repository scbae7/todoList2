import userModel from '../model/user/userModel.js';

class UserController {
  constructor(id){
    this.id = id;
  }
  async userLogin (req, res) {
    try {
      const { userId, password } = req.body;
      const results = await userModel.userLogin(userId, password);
      if (results.length > 0) {
        const userName = await userModel.getUserInfoByUserId(userId); // 사용자의 이름만 가져옵니다.
        req.session.user = {
          userId: userId,
          name: results[0].userName // 예를 들어, results 객체에서 사용자의 이름을 가져옵니다.
        };
        console.log("1"+req.session.user.userId);
        console.log("2"+req.session.user.name);
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
      const count = await userModel.idCheck(userId);
      if(count > 0){
        return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.'});
      }
      await userModel.userJoin(userId, password, email, name);
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
      
      const userInfo = await userModel.userFindId(userName, userEmail);
      console.log(userInfo);
      res.status(200).json({success:true, message: userInfo});
      console.log('아이디 찾기 성공');
    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userFindPw (req, res){
    try {
      const { userId,userEmail } = req.body;
      console.log(userId);
      console.log(userEmail);
      await userModel.userFindPw(userId,userEmail);
      res.status(200).json({success:true,message:`비밀번호가 1234!a로 변경됐습니다.`});
      console.log('비밀번호 변경 성공!');
    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userResetPw (req,res) {
    try {
      const {userId,userPw,newPw} = req.body;
      const userInfo = await userModel.userResetPw(userId,userPw,newPw);
      res.status(200).json({success:true,message:'비밀번호 재설정 성공!'});
      console.log('비밀번호 재설정 성공!');
    } catch (err) {
      console.error('에러 발생:',err);
      res.status(500).json({success:false,message:'서버 오류'});
    }
  }
  userLogout(req, res) {
    console.log(req.session); 
    req.session.destroy(err => {
      console.log("2"+req.session); 
      if (err) {
        console.error('세션 삭제 중 에러 발생:', err);
        res.status(500).send('서버 에러');
      } else {
        console.log('로그아웃 성공');
        res.redirect('/user/login'); 
      }
    });
  }
  userDelete (req,res) {
    try {
      const {userId,userPw} = req.body;
      userModel.userDelete(userId,userPw);
      res.status(200).json({success:true,message:'회원 탈퇴 성공!'});
    } catch (err) {
      console.error('에러 발생: ',err);
      res.status(500).json({success:false,message:'서버 오류'})
    }
  }
}
const userController = new UserController('userController');
export default userController;