// app.js

/*
express 설정, middleware 적용, 라우팅 설정, 서버 실행
*/

const express = require("express");
const cors = require("cors");

// 라우터 연결
const usersRouter = require("./routes/user-router"); // user(사용자) router 연결

// 미들웨어 적용
const app = express();
app.use(express.json()); // post 요청에서 body 추출
app.use(cors()); // cors로 다른 도메인의 요청 허용

app.use(cors()); // cors 에러 방지
app.use(express.json()); // content-type: application/json 형태
app.use(express.urlencoded({ extended: false })); // content-type: application/x-www-form-urlencoded 형태

// api 라우터
app.use("/user", usersRouter);

module.exports = app;
