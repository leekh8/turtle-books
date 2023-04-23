const express = require('express');
const router = express.Router();
const Order = require('../db/schemas/order-schema');


//로그인 되었을 경우 오더 메인 페이지 렌더링
router.get('/', async(req, res)=>{
    //페이지 렌더링으로 수정 필요.
    res.send('주문 페이지입니다.');
});

router.post('/', async (req, res) => {
    //items는 장바구니세션에서 받아오기.
    // 로그인 후 유저 정보에서 아래 값 fetch로 받아오기, sessionCart는 세션스토리지에서 받아오기.
    const { username, useraddress, userphoneNumber, cartItems} = req.body;
        // 아이템, 이메일, 번호 유효성 검사
        if(!cartItems){
            return res.status(400).send('선택된 상품이 없습니다.');
        }
        const order = new Order({
                username,
                useraddress,
                userphoneNumber,
                cartItems,
        });

        try{
            const newOrder = await order.save();
            res.status(201).json(newOrder).send('주문이 접수되었습니다.');
        } catch (err) {
            console.error(err);
            res.status(501).send('서버 오류가 발생했습니다.');
        }
});




module.exports = router;
