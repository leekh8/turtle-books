// import cors from 'cors';
// import express from 'express';
// import { productRouter } from './routes/product-router';
// import { categoryRouter } from './routes/category-router';

// const app = express();
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/product", productRouter);
// app.use("/category", categoryRouter);

// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log("정상적으로 서버를 시작하였습니다");
// });

// exports.app = app;

// --------------------------------

// app.js

/*
express 설정, middleware 적용, 라우팅 설정, 서버 실행
*/

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('3000 포트, 서버 가동'));

app.use(cors()); // cors 에러 방지
app.use(express.json()); // content-type: application/json 형태
app.use(express.urlencoded({ extended: false })); // content-type: application/x-www-form-urlencoded 형태
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 라우터 연결
const usersRouter = require("./routes/user-router"); // user(사용자) router 연결
const orderRouter = require("./routes/order-router");
const adminRouter = require("./routes/admin-router");

// api 라우터
app.use("/user", usersRouter);
app.use("/api/order", orderRouter);
app.use("/admin", adminRouter);

module.exports = app;
