const { Router } = require('express');
const router = Router();
const orderController = require('../controllers/order-controller');
const {bodyChecker} = require('../middlewares/body-checker');




router.get("/", orderController.pageRender); // 주문 페이지 렌더링

router.post("/", orderController.addOrder); //주문 생성
router.get("/", orderController.getOrderList); //주문 목록 가져오기
router.get("/:oid", orderController.getOrder); // 특정 주문 번호에 대한 주문 정보 가져오기
router.put("/:oid", bodyChecker, orderController.editOrder); // 주문 수정
router.delete("/:oid", orderController.removeOrder); // 주문 삭제







module.exports = router;