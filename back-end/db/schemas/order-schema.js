const { Schema } = require("mongoose");

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productList: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    shippingStatus: {
      type: String,
      required: true,
      default: "주문확인중",
    },

    shippingAddress: {
      type: String,
      required: true,
    },

    shippingDetailAddress: {
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
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

module.exports = OrderSchema;
