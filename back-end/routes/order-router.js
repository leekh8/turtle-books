const express = require('express');
const router = express.Router();
const OrderModel = require('../db/schemas/order-schema');



router.get('/', async(req, res)=>{
 
    res.send('렌더 함수로 주문 페이지 띄우기');
});

router.post('/', async (req, res) => {
    // 로그인 정보에서 유저 이름/주소/번호 받기
    // 세션 스토어에서 장바구니 목록 받기.
    const { userName, userAddress, userphoneNumber, cartItems} = req.body;
        
        if(!cartItems){
            return res.status(400).send('선택된 상품이 없습니다.');
        }
        const order = new OrderModel({
                userName,
                userAddress,
                userphoneNumber,
                cartItems,
        });

        try{
            const newOrder = await order.save();
            res.status(201).json(newOrder);
        } catch (err) {
            console.error(err);
            res.status(500).send('서버 오류가 발생했습니다.');
        }
});

module.exports = router;
