// user-router.js

// 사용자 관련 기능 (회원 가입, 로그인, 로그아웃) 라우터 구현

/*
--- 동작 과정 ---
클라이언트에서 보낸 http 요청을 받은 express가 user-router의 api 엔드포인트로 요청 전달
요청에 필요한 데이터 추출 후 service에 전달
service에서 받은 데이터 처리 후 user-router로 반환
클라이언트에게 http 응답으로 반환
*/

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

// express
const { Router } = require("express");

const userRouter = Router();

// register
userRouter.post("/register", async (req, res, next) => {
  try {
    // req의 body에서 데이터 가져옴
    const { userId, email, password } = req.body;

    // 사용자 db에 데이터 추가
    const newUser = await new userService.addUser({
      userId,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// login
userRouter.post("/login", async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

// edit my info
userRouter.patch("/user/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const {
      password,
      email,
      lastName,
      firstName,
      address,
      birthDate,
      userRole,
    } = req.body;
  } catch (error) {
    next(error);
  }
});

// delete my info
userRouter.delete("/user/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter };
