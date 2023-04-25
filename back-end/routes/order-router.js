const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller')
const OrderModel = require('../db/schemas/order-schema');



router.get('/', async(req, res)=>{
 
    res.send('렌더 함수로 주문 페이지 띄우기');
});

router.post('/', orderController);

module.exports = router;
