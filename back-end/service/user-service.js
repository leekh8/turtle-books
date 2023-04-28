// user-service.js

// 사용자 관련 로직 수행
// 컨트롤러에서 요청을 받아 db에서 데이터 조회, 수정 작업 수행
// 회원 가입, 로그인, 정보 조회, 사용자 정보 수정

/*
--- user schema ---
userId:    사용자 id
password:  비밀번호
email:     이메일
fullName:  이름
address:   배송지
birthDate: 생년월일
role:  사용자 권한
*/

// user model
const userModel = require("../db/models/user-models");

const bcrypt = require("bcrypt"); // 비밀번호 해쉬
const jwt = require("jsonwebtoken");

class UserService {
  constructor(userModel) {
    // 모델을 프로퍼티로 묶어 db와 상호작용 하는 모든 기능을 하나의 객체로 묶음
    this.userModel = userModel;
  }

  // register
  async addUser(userInfo) {
    const { password, email, role } = userInfo;
    /*
    // 입력값 확인
    if (!password || !userId || !email) {
      throw new Error(`please check your input 입력값 확인`);
    }
    */
    // 중복 확인
    /*const existId = await this.userModel.findById(userId);
    if (existId) {
      throw new Error(`already registered ID: ${userId}`);
    }*/
    const existEmail = await this.userModel.findByEmail(email);
    if (existEmail) {
      throw new Error("already registered email");
    }

    // 비밀번호 해쉬
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 정보
    const newUserInfo = {
      password: hashedPassword,
      email,
      role,
      //lastName,
      //firstName,
      //address,
      //birthDate,
    };

    // db에 저장
    const createNewUser = await this.userModel.create(newUserInfo);

    console.log(`create new user: ${createNewUser}`);

    return createNewUser;
  }

  // login
  async loginUser(userInfo) {
    const { userId, password } = userInfo;

    // ID가 db에 존재하는 지 확인
    const user = await this.userModel.findByEmail(userId);
    if (!user) {
      console.log(`email error ${userId}`);
      throw new Error("not our registerd email. check again please");
    }

    // 비밀번호
    const correctHashedPassword = user.password; // user.password는 hashedPassword

    // front에서 온 비밀번호와 db의 비밀번호가 맞는지 확인
    // password: front에서 온 비밀번호
    // correctHashedPassword: db에서 온 비밀번호
    const isCorrectPassword = await bcrypt.compare(
      password,
      correctHashedPassword
    );

    // 비밀번호가 다르다면 401 unauthorized 에러
    if (!isCorrectPassword) {
      throw new Error(`not our password. check again please.`);
    }

    // jwt token
    // 로그인에 성공하면 토큰 생성해서 돌려줌
    // 클라이언트에서 서버로 요청 보낼때마다 http 헤더 인증에 담아 보냄
    // secretKey: jwt token 생성시 사용될 비밀키
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

    // 토큰 내부에 포함될 정보: userId, role
    // jwt.sign()
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

    const isAdmin = user.role === "admin";

    return { token, isAdmin };
  }

  // 사용자 목록 조회
  // 관리자 사용
  async getUsers() {
    const users = await this.userModel.findAll();

    console.log(`get every users`);

    return users;
  }

  async getUserData(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("가입 내역 없음!");
    }

    return user;
  }

  // edit my info
  // 비밀번호 필요
  async editUser(userInfo, updateUserInfo) {
    const { userId, currentPassword } = userInfo;

    // 주어진 userId로 사용자 찾기
    const user = await this.userModel.findById(userId);
    // 없는 id면 에러
    if (!user) {
      throw new Error(`not registered Id. check again please`);
    }

    // 비밀번호 확인
    const correctHashedPassword = user.password; // user.password는 hashedPassword
    // 입력한 비밀번호와 db의 비밀번호가 맞는지 확인
    // currentPassword: 입력한 비밀번호
    // correctHashedPassword: db에서 온 비밀번호
    const MatchPassword = await bcrypt.compare(
      currentPassword,
      correctHashedPassword
    );

    if (!MatchPassword) {
      throw new Error(`not correct password. check again please.`);
    }

    // 업데이트 할 필드 객체
    const updateFeilds = {};

    // 비밀번호 변경 시
    // 새 비밀번호 해싱해서 저장
    if (updateUserInfo.password) {
      const newHashedPassword = await bcrypt.hash(updateUserInfo.password, 10);
      updateFeilds.password = newHashedPassword;
    }

    // 그 외 나머지 필드 업데이트
    if (updateUserInfo.email) {
      updateFeilds.email = updateUserInfo.email;
    }
    if (updateUserInfo.lastName) {
      updateFeilds.lastName = updateUserInfo.lastName;
    }
    if (updateUserInfo.firstName) {
      updateFeilds.firstName = updateUserInfo.firstName;
    }
    if (updateUserInfo.address) {
      updateFeilds.address = updateUserInfo.address;
    }
    if (updateUserInfo.birthDate) {
      updateFeilds.birthDate = updateUserInfo.birthDate;
    }

    // 업데이트
    const updateUser = await this.userModel.update({
      userId,
      update: updateFeilds,
    });

    console.log(`edit user info: ${updateUser}`);

    return updateUser;
  }

  // delete my info
  // user/:userId로 userId를 요청 파라미터로 받아와 deleteUser 호출
  async deleteUser(userId, currentPassword) {
    try {
      // 입력받은 id로 db에서 사용자 조회
      const user = await this.userModel.findById(userId);

      if (!user) {
        // 조회된 사용자 없으면 에러
        throw new Error(`User with Id: ${userId} not founded`);
      }

      // 입력한 비밀번호와 db의 비밀번호가 맞는지 확인
      // currentPassword: 입력한 비밀번호
      // correctHashedPassword: db에서 온 비밀번호
      const MatchPassword = await bcrypt.compare(
        currentPassword,
        correctHashedPassword
      );

      if (!MatchPassword) {
        throw new Error(`not correct password. check again please.`);
      }

      console.log(`delete user info: ${userId}`);

      // 조회된 사용자 있으면 db에서 삭제
      await userModel.deleteUser(userId);
      // 삭제된 사용자 객체 반환
      return user;
    } catch (error) {
      throw error;
    }
  }
}
const userService = new UserService(userModel);

module.exports = userService;
