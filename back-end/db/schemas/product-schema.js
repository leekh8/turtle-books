const { Schema } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      // 제목
      type: String,
      required: true,
    },
    author: {
      // 작가명
      type: String,
      required: true,
    },
    publisher: {
      // 발행처
      type: String,
      required: true,
    },
    publishDate: {
      // 발행일
      type: Date,
      required: true,
    },
    description: {
      // 책 소개
      type: String,
      required: true,
      default: "책 소개 준비중",
    },
    price: {
      // 가격
      type: Number,
      required: true,
    },
    topic: {
      // best, steady, new
      type: String,
      required: true,
    },
    categoryId: {
      // 분류
      type: Schema.Types.ObjectId,
      ref: "categorys",
      required: true,
    },
    stock: {
      // 재고
      type: Number,
      default: 10,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

module.exports = productSchema;
