const { Schema } = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    shippingStatus: {
      type: String,
      required: true,
      default: "배송준비중",
    },
    shippingPostCode: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    shippingRequestMessage: {
      type: String,
      required: true,
      default: "요청 메시지 없음",
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
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

module.exports = OrderSchema;
