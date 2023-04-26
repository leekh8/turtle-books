const express = require("express");
const cors = require("cors");

// 라우터 연결
const usersRouter = require("./routes/user-router"); // user(사용자) router 연결
// const router = require("./routes/order-list")
const productRouter = require("./routes/product-router");
const categoryRouter = require("./routes/category-router");
const errorHandler = require("./middlewares/error-handler");

// 미들웨어 적용
const app = express();
app.use(express.json()); // post 요청에서 body 추출, content-type: application/json 형태
app.use(cors()); // cors 에러 방지, cors로 다른 도메인의 요청 허용
app.use(express.urlencoded({ extended: false })); // content-type: application/x-www-form-urlencoded 형태
app.listen(3000, ()=>{
    console.log("3000 포트 서버 가동 시작")
});
// api 라우터
app.use("/api/user", usersRouter);
// app.use("/user/myroom/order-list", router); // order-list 연결
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

// 에러 처리
app.use(errorHandler);

module.exports = app;
