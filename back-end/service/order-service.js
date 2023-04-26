//애플리케이션 로직을 처리하고 데이터베이스와 상호 작용
const { orderModel } = require("../db/models/order-model");
const { userModel } = require("../db/models/order-model");

class OrderService {
  // 주문 추가
  async addOrder(orderInfo) {
    const { buyer, productList, countList, totalAmount } = orderInfo;

    let buyerFromDB;
    try {
      buyerFromDB = await userModel.findById(buyer);
    } catch (e) {
      const error = new Error("구매자가 DB에 존재하지 않습니다.");
      error.statusCode = 400;
      throw error;
    }

    if (totalAmount < 0) {
      const error = new Error("가격이 올바르지 않습니다.");
      error.statusCode = 401;
      throw error;
    }
    const createdNewOrder = await orderModel.create(orderInfo, buyerFromDB);
    return createdNewOrder;
  }
  //oid(주문 번호)에 해당하는 주문 정보 목록 가져오기
  //주문 번호가 없다면 
  async getOrderList(oidArr) {
    if (!oidArr) {
      const orderList = await orderModel.findAll();
      return orderList;
    } else {
      const orderList = await orderModel.findByIds(oidArr);
      return orderList;
    }
  }
  // 특정 oid에 대한 주문 정보 가져오기
  async getOrderById(oid) {
    if(oid){
      const order = await orderModel.findById(oid);
      return order;
    }

  }
  // oid로 주문 수정
  async editOrder(oid, orderInfo) {
    const updatedNewOrder = await orderModel.update(oid, orderInfo);
    return updatedNewOrder;
  }
  // oid로 주문 취소
  async removeOrder(oid) {
    await orderModel.delete(oid);
  }
}

const orderService = new OrderService(orderModel);

module.exports = orderService;
