
const { Schema } = require('mongoose');

const productSchema = new Schema (
  {
    title: { // 제목
      type: String,
      required: true,
    },
    author: { // 작가명
      type: String,
      required: true,
    },
    publisher: { // 발행처
      type: String,
      required: true,
    },
    publishDate: { // 발행일
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "책 소개 준비중",
    },
    price: { // 가격
      type: Number,
      required: true,
    },
    topic: {
      type: String,
      required: true, // best, steady, new, normal
    },
    category: { // 분류
      type: String,
      required: true,
    },
    stock: { // 재고
      type: Number,
      default: 10,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "products"
  }
);

module.exports = productSchema;