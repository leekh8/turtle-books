
class OrderController {
  async addOrder(req, res, next) {
    let {
      buyer,
      shippingStatus,
      shippingPostCode,
      totalAmount,
      recipientName,
      recipientPhoneNumber,
      cartItems,
    } = req.body;

    if (
      !buyer ||
      !shippingStatus ||
      !shippingPostCode ||
      !totalAmount ||
      !recipientName ||
      !recipientPhoneNumber ||
      !cartItems
    ) {
      return res.status(400).json("입력 데이터 부족");
    }

    try {
      const createdNewOrder = await Order.create({
        buyer,
        shippingStatus,
        shippingPostCode,
        totalAmount,
        recipientName,
        recipientPhoneNumber,
        cartItems,
      });
      return res.status(200).json(createdNewOrder);
    } catch (e) {
      next(e);
    }
  }


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

export { orderController };
