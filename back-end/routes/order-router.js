const { Router } = require("express");
const orderRouter = Router();
const orderController = require("../controllers/order-controller");
const { bodyChecker } = require("../middlewares/body-checker");

orderRouter.get("/", orderController.pageRender); // 주문 페이지 렌더링
orderRouter.post("/", orderController.addOrder); //주문 생성
orderRouter.get("/", orderController.getOrderList); //주문 목록 가져오기
orderRouter.get("/:oid", orderController.getOrder); // 특정 주문 번호에 대한 주문 정보 가져오기
orderRouter.put("/:oid", bodyChecker, orderController.editOrder); // 주문 수정
orderRouter.delete("/:oid", orderController.removeOrder); // 주문 삭제

module.exports = orderRouter;
