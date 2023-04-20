// 주문 목록 페이지
"use strict";
const express = require('express');
const router = express.Router();



// order-list 메인 화면, 주문 목록 가져오기
router.get('/', async (req, res)=>{
    res.render('user/order-list-main');
});

router.get('/preparing', async (req, res)=>{
    
    res.render('user/order-list-preparing');
});

router.get('/shipping', async (req, res)=>{
    
    res.render('user/order-list-shipping');
});

router.get('/delivery ', async (req, res)=>{
    
    res.render('user/order-list-delivery');
});

router.get('/refund', async (req, res)=>{
    
    res.render('user/order-list-refund');
});

module.exports = router;