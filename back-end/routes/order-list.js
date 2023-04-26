const { Router } = require('express');
const router = Router();

const {Order} = require('../db/models/order-model');



//Order.find로 shippingStatus에 따라 준비/배송/도착/취소및환불로 나눠 화면에만 송출.. 가능?
//보통은 get 할 때 쿼리스트링으로 status 를 받아서 그걸 받아다가 DB 조회해서 뿌려주지
//프론트에서 GET /api/order-list?status=준비중 으로 요청하고 BE 에서는 status 가져다가 DB 조회함


// order-list 메인 화면, 주문 목록 가져오기
router.get('/', async (req, res)=>{

    res.send("렌더 함수로 메인 페이지 띄우기")
    
});

router.get('/', (req,res)=>{
    const { status } = req.query;
    const orders = Order.find().populate()
    if(status === preparing){

    }
})


module.exports = router;
