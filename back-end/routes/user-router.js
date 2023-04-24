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
const userService = require("../services/user-service");

const userRouter = Router();

// register
// 실제로는 /user/register
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
// 실제로는 /user/login
userRouter.post("/login", async (req, res, next) => {
  try {
    const { userId, password } = req.body;

    const user = await userService.findUser(userId, password);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// get user-list
// 실제로는 /user/userList
userRouter.get("/userList", async function (req, res, next) {
  try {
    // 전체 사용자 목록 받아오기
    const user = await userService.getUsers();

    // 사용자 목록 프론트에 보내기
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// edit my info
// 실제로는 /user/myroom/:userId
userRouter.patch("myroom/:userId", async (req, res, next) => {
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

    const updatedUser = await userService.updatedUser(userId, {
      password,
      email,
      lastName,
      firstName,
      address,
      birthDate,
      userRole,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete my info
// 실제로는 /user/myroom/:userId
userRouter.delete("myroom/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    await userService.deleteUser(userId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter };
