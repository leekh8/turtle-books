//애플리케이션 로직을 처리하고 데이터베이스와 상호 작용.
const orderModel = require("../db/models/order-model");
const userModel = require("../db/models/order-model");

class OrderService {
  // 주문 추가
  async addOrder(orderInfo) {
    const { buyer, productList, totalAmount } = orderInfo;

    let buyerInDB;
    try {
      buyerInDB = await userModel.findById(buyer);
    } catch (err) {
      const error = new Error("에러 : 주문 추가중 구매자가 DB에 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    if(!productList) {
      const error = new Error("에러 : 주문 추가중 상품이 하나 이상 존재해야 합니다.");
      error.status.code = 400;
      throw error;
    }

    if (totalAmount < 0) {
      const error = new Error("에러 : 주문 추가중 상품 총합이 0원 미만입니다.");
      error.statusCode = 401;
      throw error;
    }
    const newOrder = await orderModel.create(orderInfo, buyerInDB);
    return newOrder;
  }
  //orderId(주문 번호)에 해당하는 주문 정보 목록 가져오기
  //주문 번호가 없다면 
  async getOrderList(orderIdArr) {
    if (!orderIdArr) {
      const orderList = await orderModel.findAll();
      return orderList;
    } else {
      const orderList = await orderModel.findByIds(orderIdArr);
      return orderList;
    }
  }
  // 특정 orderId에 대한 주문 정보 가져오기
  async getOrderById(orderId) {
    if(orderId){
      const order = await orderModel.findById(orderId);
      return order;
    }

  }
  // orderId로 주문 수정
  async editOrder(orderId, orderInfo) {
    const updatedNewOrder = await orderModel.update(orderId, orderInfo);
    return updatedNewOrder;
  }
  // orderId로 주문 취소
  async removeOrder(orderId) {
    await orderModel.delete(orderId);
  }
}

const orderService = new OrderService(orderModel);

module.exports = orderService;
