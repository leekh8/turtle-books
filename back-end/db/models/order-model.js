//어플리케이션에서 사용되는 데이터와 그 데이터를 처리
const { model } = require("mongoose");
const { OrderSchema } = require("../schemas/order-schema");

const Order = model("Order", OrderSchema);

class OrderModel {
  //특정 주문 번호에 맞는 주문 정보 가져오기
  async findById(oid) {
    try {
      const order = await Order.findOne({ _id: oid })
        .populate("buyer")
        .populate("productList");
      return order;
    } catch (err) {
      const error = new Error("특정 주문 정보를 불러오는데에 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
  // 다수의 주문 번호로 주문 정보를 한번에 조회
  async findByIds(oidArr) {
    const orderList = new Array();
    try {
      for (const oid of oidArr) {
        const order = await Order.findOne({ _id: oid })
          .populate("buyer")
          .populate("productList");
        if (order) {
          orderList.push(order);
        }
      }
    } catch (err) {
      const error = new Error("다수의 주문 정보를 불러오는데에 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }

    return orderList;
  }
  // db에 누적된 모든 유저들의 주문 정보 가져오기
  async findAll() {
    try {
      const orderList = await Order.find({})
        .populate("buyer")
        .populate("productList");
      return orderList;
    } catch (err) {
      const error = new Error("현재까지 누적된 주문 목록을 불러들이는데 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
  // 
  async create(orderInfo, buyerFromDB) {
    try {
      let createdNewOrder = await Order.create(orderInfo);
      await buyerFromDB.orderList.push(createdNewOrder);
      await buyerFromDB.save();
      createdNewOrder = await createdNewOrder.populate("buyer");
      createdNewOrder = await createdNewOrder.populate("productList");

      return createdNewOrder;
    } catch (e) {
      e.message = "상품 생성 실패 DB 오류";
      e.statusCode = 403;
      throw e;
    }
  }

  async update(oid, orderInfo) {
    const filter = { _id: oid };
    const option = { returnOriginal: false };
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        orderInfo,
        option
      )
        .populate("buyer")
        .populate("productList");
      return updatedOrder;
    } catch (err) {
      const error = new Error("주문 수정 시도중 에러발생!");
      error.statusCode = 400;
      throw error;
    }
  }

  async delete(oid) {
    try {
      await Order.deleteOne({ _id: oid });
    } catch (err) {
      const error = new Error("주문 삭제 실패 !");
      error.statusCode = 400;
      throw error;
    }
  }
}

const orderModel = new OrderModel();

module.exports = orderModel;
module.exports = order;
