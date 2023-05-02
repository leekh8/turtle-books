//유저 로그인 상태에서 이용 가능한 주문 조회/수정/삭제 기능.
const { Router } = require("express");
const orderListRouter = Router();
const orderController = require("../controllers/order-controller");
const bodyChecker = require("../middlewares/body-checker");

// "/api/user/myroom/order-list"
// myroom 자체가 로그인 됐단 의미.
orderListRouter.get("/:orderId", orderController.getOrder); // 특정 주문 번호로 단일 주문 조회
//orderListRouter.put("/:orderId", bodyChecker, orderController.editOrder); // 주문 수정
orderListRouter.delete("/:orderId", orderController.removeOrder); // 주문 삭제.

module.exports = orderListRouter;