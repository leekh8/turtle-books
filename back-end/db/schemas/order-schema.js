const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
  //user 스키마에서 유저 정보를 받아서 buyer로 저장.
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingStatus: {
      type: String,
      default: "배송준비중",
    },
    shippingPostCode: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientPhoneNumber: {
      type: Number,
      required: true,
    },
    // 장바구니세션에서 받아오기
    cartItems: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity : {
        type : Number,
        required: true,
      }
    }]
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

const OrderModel = model("Order", OrderSchema);
module.exports = OrderModel;

