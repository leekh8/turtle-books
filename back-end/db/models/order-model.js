//어플리케이션에서 사용되는 데이터와 그 데이터를 처리
const { model } = require("mongoose");
const OrderSchema = require("../schemas/order-schema");

const Order = model("Order", OrderSchema);

class OrderModel {
  //특정 주문 번호에 맞는 주문 정보 조회(단일 조회).
  async findById(orderId) {
    try {
      const order = await Order.findOne({ _id: orderId })
        .populate("buyer")
        .populate("productList");
      return order;
    } catch (err) {
      const error = new Error("특정 주문 정보를 불러들이는데에 실패했습니다.");
      error.statusCode = 400;
      throw error;
    }
  }
  // 배열에 존재하는 다수의 주문 번호에 해당하는 각각의 주문 정보를 조회(다수 조회)
  async findByIds(orderIdArr) {
    const orderList = new Array();
    try {
      for (const orderId of orderIdArr) {
        const order = await Order.findOne({ _id: orderId })
          .populate("buyer")
          .populate("productList");
        if (order) {
          orderList.push(order);
        }
      }
      return orderList;
    } catch (err) {
      const error = new Error(
        "에러 : 다수의 주문 정보를 불러들이는도중 실패했습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }
  // db에 누적된 모든 유저들의 주문 정보 가져오기(처음부터 끝까지 조회)
  async findAll() {
    try {
      const orderList = await Order.find({})
        .populate("buyer")
        .populate("productList");
      return orderList;
    } catch (err) {
      const error = new Error(
        "에러 : 현재까지 저장된 모든 주문 목록을 불러들이는도중 실패했습니다."
      );
      error.statusCode = 400;
      throw error;
    }
  }
  //
  async create(orderInfo, buyerInDB) {
    try {
      let newOrder = await Order.create(orderInfo);
      await buyerInDB.orderList.push(newOrder);
      await buyerInDB.save();
      // newOrder = await newOrder.populate("buyer");
      newOrder = await newOrder.populate("productList");

      return newOrder;
    } catch (err) {
      const error = new Error("에러 : 주문 생성중 실패");
      error.statusCode = 403;
      throw error;
    }
  }
  // // 주문 수정
  // async update(orderId, orderInfo) {
  //   const filter = { _id: orderId };

  //   try {
  //     const updatedOrder = await Order.findOneAndUpdate(
  //       filter,
  //       orderInfo,
  //     )
  //       .populate("buyer")
  //       .populate("productList");
  //     return updatedOrder;
  //   } catch (err) {
  //     const error = new Error("에러 : 주문 수정중 실패");
  //     error.statusCode = 400;
  //     throw error;
  //   }
  // }
  // 주문 삭제
  async delete(orderId) {
    try {
      await Order.deleteOne({ _id: orderId });
    } catch (err) {
      const error = new Error("에러 : 주문 삭제중 실패");
      error.statusCode = 400;
      throw error;
    }
  }
}

const orderModel = new OrderModel();

module.exports = orderModel;
