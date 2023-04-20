const { Schema, model } = require('mongoose');


const OrderSchema = new Schema(
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
    type: String,
    required: true,
  },
  items : [{
    title: String,
    price : Number,
    stock : Number,
  }]
},
  {
    timestamps: true,
    collection: "orders",
  }
);

const OrderModel = model("Order", OrderSchema);

module.exports = OrderModel;