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
  async userIdCheck (req,res) {
    try {
      const { userId } = req.body;
      console.log(req.body);
      const count = await userModel.idCheck(userId);
      console.log("count",count[0].count);
      if(count[0].count > 0){
        return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.'});
      }else{
        return res.status(200).json({success: true,message:"사용가능한 아이디입니다."});
      }

    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userJoin (req,res) {
    try {
      const { userId, password, email, name } = req.body;
      console.log(req.body);
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
      console.log(userInfo.userId);
      res.status(200).json({success:true, message: `아이디는 ${userInfo.userId} 입니다.`});
      console.log('아이디 찾기 성공');
    } catch (err) {
      console.error('에러발생:',err);
      res.status(500).json({success:false, message:'서버 오류'});
    }
  }
  async userFindPw (req, res){
    try {
      const { userId,userEmail } = req.body;
      console.log(req.body);
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
      const userId = req.session.user.userId;
      const {currentPassword,newPassword} = req.body;
      console.log("cu",typeof currentPassword);
      console.log("new",typeof newPassword);
      console.log(req.body);
      console.log(userId);
      const userInfo = await userModel.userResetPw(userId,currentPassword,newPassword);
      console.log(userInfo);
      if (userInfo.affectedRows === 0) {
        res.status(400).json({ success: false, message: '비밀번호 변경 실패: 유효하지 않은 사용자 ID 또는 현재 비밀번호.' });
      } else {
        res.status(200).json({ success: true, message: '비밀번호가 성공적으로 변경되었습니다.' });
        console.log('비밀번호 재설정 성공!');
      }
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
        res.clearCookie('connect.sid');
        res.redirect('/user/login'); 
      }
    });
  }
  async userDelete(req, res) {
    try {
      const sessionId = req.session.user.userId;
      console.log(sessionId);
      const { userId, userPw } = req.body;
      if(sessionId == userId){
        const result = await userModel.userDelete(userId, userPw);
        res.status(200).json({ success: true, message: '회원 탈퇴 성공!' });
      }else{
        res.status(200).json({ success: true, message: '아이디가 틀렸음!' });
      }
     
    } catch (err) {
      console.error('에러 발생:', err.message);
      if (err.message === 'User not found or incorrect password') {
        res.status(400).json({ success: false, message: '사용자를 찾을 수 없거나 비밀번호가 틀렸습니다.' });
      } else {
        res.status(500).json({ success: false, message: '서버 오류' });
      }
    }
  }
}
const userController = new UserController('userController');
export default userController;