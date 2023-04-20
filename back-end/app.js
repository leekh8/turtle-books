// app.js

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// 라우터 연결
import indexRouter from "./routes";
import viewsRouter from "./routes/views-router";
import { usersRouter } from "./routes/user/myroom/my"; // user(사용자) router 연결

import { errorHandler } from "./middlewares";

const app = express();

app.use(cors()); // cors 에러 방지

app.use(express.json()); // content-type: application/json 형태
app.use(express.urlencoded({ extended: false })); // content-type: application/x-www-form-urlencoded 형태

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*
// html, css, js 라우팅
app.use(viewsRouter);
*/
// api 라우터
/*
app.use("/", indexRouter);
*/
app.use("/user", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// app.use(errorHandler);

module.exports = { app };
