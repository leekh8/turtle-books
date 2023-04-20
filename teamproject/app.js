"use strict";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
//라우터

const indexRouter = require('../routes/index');
const orderRouter = require('./routes/order/order');

const loginRequired = require('../middlewares/login-required');

app.use(cors());

app.use(express.static(`${__dirname}/public`)); // 정적 폴더 설정
app.use(bodyParser.urlencoded({ extended: true })); //POST 요청 body 파싱을 위해 bodyParser 불러오기.

app.get('/', indexRouter); // 홈

app.use('/order', orderRouter); //주문 페이지


app.listen(port, ()=>{
    console.log("서버 가동 시작");
});

