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
const Router = require("express");
const userController = require("../controllers/user-controller");

const userRouter = Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/userList", userController.getUserList);
userRouter.patch("/myroom/:userId", userController.updateUserInfo);
userRouter.delete("/myroom/:userId", userController.deleteUserInfo);

module.exports = userRouter;
