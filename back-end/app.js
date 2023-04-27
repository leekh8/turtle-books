const express = require("express");
const cors = require("cors");

// 라우터 연결
const usersRouter = require("./routes/user-router"); // user(사용자) router 연결
const orderRouter = require("./routes/order-router");
const productRouter = require("./routes/product-router");
const categoryRouter = require("./routes/category-router");
const adminRouter = require("./routes/admin-router");
const errorHandler = require("./middlewares/error-handler");
const viewRouter = require("../front-end/view-router"); // 프론트 라우터

// 미들웨어 적용
const app = express();
app.use(cors()); // cors 에러 방지, cors로 다른 도메인의 요청 허용
app.use(express.json()); // post 요청에서 body 추출, content-type: application/json 형태
app.use(express.urlencoded({ extended: false })); // content-type: application/x-www-form-urlencoded 형태
app.use(viewRouter); //프론트

// api 라우터
app.use("/api/user", usersRouter);
app.use("/api/user/myroom/order", orderRouter);
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/admin", adminRouter); // 관리자 페이지 라우터 연결

// 에러 처리
app.use(errorHandler);

module.exports = app;
