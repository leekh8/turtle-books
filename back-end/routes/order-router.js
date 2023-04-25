const { Router } = require('express');
const router = Router();
const orderController = require('../controllers/order-controller');
const {bodyChecker} = require('../middlewares/body-checker');




router.get('/', async(req, res)=>{
 
    res.send('렌더 함수로 주문 페이지 띄우기');
});

router.post('/', orderController.addOrder); //주문생성
router.get("/", orderController.getOrderList); //주문 목록 가져오기
router.get("/:oid", orderController.getOrder); // 
router.put("/:oid", bodyChecker, orderController.editOrder); // 주문 수정
router.delete("/:oid", orderController.removeOrder); // 주문 삭제







module.exports = router;