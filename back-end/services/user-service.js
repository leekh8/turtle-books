// user-service.js

// 사용자 관련 로직 수행
// 컨트롤러에서 요청을 받아 db에서 데이터 조회, 수정 작업 수행
// 회원 가입, 로그인, 정보 조회, 사용자 정보 수정

/*
--- user schema ---
userId:    사용자 id
password:  비밀번호
email:     이메일
lastName:  성
firstName: 이름
address:   배송지
birthDate: 생년월일
userRole:  사용자 권한
*/

// user model
const userModel = require("../db/models/user-models");

const bcrypt = require("bcrypt"); // 비밀번호 해쉬
const jwt = require("jsonwebtoken");

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // register
  async addUser(userInfo) {
    const { userId, password, email, lastName, firstName, address, birthDate } =
      userInfo;

    // 입력값 확인
    if (!userInfo.email || !userInfo.password || !userInfo.userId) {
      throw new Error(`please check your input`);
    }
    // 중복 확인
    const existId = await this.userModel.findById(userId);
    if (existId) {
      throw new Error("already registered ID");
    }
    const existEmail = await this.userModel.findByEmail(email);
    if (existEmail) {
      throw new Error("already registered email");
    }

    // 비밀번호 해쉬
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 정보
    const newUserInfo = {
      userId,
      password: hashedPassword,
      email,
      lastName,
      firstName,
      address,
      birthDate,
    };

    // db에 저장
    const createNewUser = await this.userModel.create(newUserInfo);

    return createNewUser;
  }

  // login
  async loginUser(userInfo) {
    const { userId, password } = userInfo;

    // ID가 db에 존재하는 지 확인
    const user = await this.userModel.findbyEmail(email);
    if (!user) {
      throw new Error("not our ID. check again please");
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

    // 토큰 내부에 포함될 정보: userId, userRole
    // jwt.sign()
    const token = jwt.sign(
      { userId: user._id, userRole: user.role },
      secretKey
    );

    return token;
  }

  // 사용자 목록 조회
  // 관리자 사용
  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  // edit my info
  // 비밀번호 필요
  async editUser(requiredUserInfo, updateUserInfo) {
    const { userId, currentPassword } = requiredUserInfo;

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

    // 비밀번호 변경 시
    const password = updateUserInfo;
    // 해쉬 해서 새로 저장
    if (password) {
      const newHashedPassword = await bcrypt.hash(password, 10);
      updateUserInfo.password = newHashedPassword;
    }

    // 업데이트
    user = await this.userModel.update({ userId, update: updateUserInfo });

    return user;
  }
}

const userService = new UserService(userModel);

module.exports = userService;
