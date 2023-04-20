// 유저 마이 페이지
"use strict";
const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/async-handler');
const orderlistRouter = require('../order/order-list');

router.get('/', asyncHandler(async (req, res)=>{
    res.render('user/my-room');
    return;
}));

router.use('/orderlist', orderlistRouter);

module.exports = router;