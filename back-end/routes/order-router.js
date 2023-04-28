// 주문 생성 및 목록 조회기능.
const { Router } = require("express");
const orderRouter = Router();
const orderController = require("../controllers/order-controller");
const bodyChecker = require("../middlewares/body-checker");

orderRouter.get("/", orderController.orderMainRender); // 주문 메인 페이지 렌더링
orderRouter.post("/", orderController.addOrder); //주문 생성
orderRouter.get("/", orderController.getOrderList); //주문 목록 가져오기


// orderRouter.get("/:orderId", orderController.getOrder); // 특정 주문 번호로 단일 주문 조회
// orderRouter.put("/:orderId", bodyChecker, orderController.editOrder); // 주문 수정
// orderRouter.delete("/:orderId", orderController.removeOrder); // 주문 삭제.

module.exports = orderRouter;
