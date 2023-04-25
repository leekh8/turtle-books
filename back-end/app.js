// app.js

/*
express 설정, middleware 적용, 라우팅 설정, 서버 실행
*/

const express = require("express");
const cors = require("cors");

// 라우터 연결
const usersRouter = require("./routes/user-router"); // user(사용자) router 연결

const app = express();

// 미들웨어 적용
app.use(cors()); // cors 에러 방지. 다른 도메인의 요청 허용
app.use(express.json()); // content-type: application/json 형태. post 요청에서 body 추출
app.use(express.urlencoded({ extended: ture })); // url-encoded body parser

// api 라우터
app.use("/api/user", usersRouter);
app.use("/user/myroom/order-list", router); // order-list 연결

// 에러 처리
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).json({ message: `server error occured` });
});

module.exports = app;
