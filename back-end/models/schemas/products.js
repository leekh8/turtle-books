const { Schema } = require('mongoose');

const productSchema = new Schema (
  {
    title: { // 제목
      type: String,
      required: true,
    },
    description: { // 소개
      type: String,
      required: true,
      default: "책 소개 준비중입니다"
    },
    author: { // 작가명
      type: String,
      required: true,
    },
    publisher: { // 발행처
      type: String,
      required: true,
    },
    publicationDate: { // 발행일
      type: Number,
      required: true,
    },
    price: { // 가격
      type: Number,
      required: true,
    },
    category: { // 분류
      type: String,
      required: true,
    },
    stock: { // 재고
      type: Boolean,
      required: true,
    },
  },
  {
    timestamp: true,
    collection: "product",
  }
);
module.exports = productSchema;