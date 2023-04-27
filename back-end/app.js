const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

app.use(cors()); // cors 에러 방지
app.use(express.json()); // content-type: application/json 형태
app.use(express.urlencoded({ extended: false })); // content-type: application/x-www-form-urlencoded 형태
app.use(bodyParser.json());

// 라우터 연결
const usersRouter = require("./routes/user-router"); // user(사용자) router 연결
const orderRouter = require("./routes/order-router");
const adminRouter = require("./routes/admin-router");
const categoryRouter = require("./routes/category-router");
const productRouter = require("./routes/product-router");

// api 라우터
app.use("/user", usersRouter);
app.use("/api/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);

module.exports = app;
