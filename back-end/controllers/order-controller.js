//모델과 뷰를 연결하여 사용자의 요청을 처리(모델과 뷰를 관리), 서비스 사용.
const { orderService } = require("../service/order-service");

class OrderController {
  async pageRender(req, res, next) {
    res.send("주문 페이지 로드");
  }
  // 주문 추가
  async addOrder(req, res, next) {
    let {
      buyer,
      productList,
      shippingStatus,
      shippingPostCode,
      shippingAddress,
      shippingRequestMessage,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
    } = req.body;

    productList = productList.split(",");

    if (
      !buyer ||
      !productList ||
      !shippingStatus ||
      !shippingPostCode ||
      !shippingAddress ||
      !totalAmount ||
      !recipientName ||
      !recipientPhoneNumber
    ) {
      return res.status(400).json("입력 데이터 부족");
    }

    try {
      const newOrder = await orderService.addOrder({
        buyer,
        productList,
        shippingStatus,
        shippingPostCode,
        shippingAddress,
        shippingRequestMessage,
        totalAmount,
        recipientName,
        recipientPhoneNumber,
      });
      return res.status(200).json(newOrder);
    } catch (e) {
      next(e);
    }
  }
  // 주문 정보 가져오기
  // req에 query가 비어있는지 확인, 비어있다면 주문 번호에 대한 주문 정보를 가져오는 서비스 호출
  // 전체 주문 목록 가져와 res에 전달.
  // query가 있다면 req에서 oid를 추출, oid가 없으면 에러 반환.
  // oid가 있다면 쉼표로 분리하여 배열에 담아 인자로 넘겨 주문 번호에 대한 주문 목록을 가져와 res처리
  async getOrderList(req, res, next) {
    if (Object.keys(req.query).length === 0) {
      const orderList = await orderService.getOrderList();
      return res.status(200).json(orderList);
    } else {
      const { oid } = req.query;
      if (!oid) {
        return res.status(400).json("에러, 쿼리 스트링에 oid가 존재해야 함");
      }

      try {
        const oidArr = oid.split(",");
        const orderList = await orderService.getOrderList(oidArr);
        return res.status(200).json(orderList);
      } catch (e) {
        next(e);
      }
    }
  }
  // 특정 oid에 대한 주문 정보 가져오기
  async getOrder(req, res, next) {
    const { oid } = req.params;

    if (!oid) {
      return res.status(400).json("주문 정보를 찾을 수 없습니다.");
    }

    try {
      const order = await orderService.getOrderById(oid);
      return res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }
  // oid로 주문 수정
  async editOrder(req, res, next) {
    const { oid } = req.params;
    let { buyer, productList, totalAmount } = req.body;

    if (buyer || productList || totalAmount) {
      return res.status(400).json("해당 주문 정보는 변경할 수 없는 값입니다.");
    }

    try {
      const updatedOrder = await orderService.editOrder(oid, req.body);
      return res.status(200).json(updatedOrder);
    } catch (e) {
      next(e);
    }
  }
  // oid로 주문 취소
  async removeOrder(req, res, next) {
    const { oid } = req.params;

    try {
      await orderService.removeOrder(oid);
      return res.status(200).json(`상품 삭제 완료(ID : ${oid})`);
    } catch (e) {
      next(e);
    }
  }
}

const orderController = new OrderController();

module.exports = orderController;
