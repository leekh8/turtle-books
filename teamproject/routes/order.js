// order.js에서는 순수하게 주문만.

"use strict";
const express = require('express');
const router = express.Router();
const Order = require('../../db');
const { emailCheck, phoneCheck } = require('../../utils/check');

//로그인 되었을 경우 오더 메인 페이지 렌더링
router.get('/', async(req,res)=>{
    //임시코드 수정 필요.
    if(req.query.login){
        const orders = await Order.find({})
        res.render('order/order-main', {orders});
        return;
    } else {
        return res.redirect('/')
    }

})



// 주문 정보를 처리
router.post('/', async (req, res, next) => {
    
    const { username, useraddress, userphoneNumber, items } = req.body;
        
        if(!items){
            return res.status(400).send('선택된 상품이 없습니다.');
        }
        if(emailCheck){
            return res.status(400).send('올바른 이메일 주소를 입력하세요.');
        }
        if(phoneCheck){
            return res.status(400).send('올바른 전화번호를 입력하세요.');
        }

        try{
            await Order.create({
                username,
                useraddress,
                userphoneNumber,
                items,
            });

            res.status(200).send('주문이 접수되었습니다.')

        } catch (err) {
            next(err);
        }

});




module.exports = router;