const Schema = require('mongoose');

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
    published_Date: { // 발행일
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
      type: Number,
      default: 10,
      required: true,
    },
    topic: {
      type: String,
      required: true, // best, steady, new, normal
    },
    description: {
      type: String,
      required: true,
      default: "책 소개 준비중",
    }
  },
  {
    timestamp: true,
    // collection: "product",
  }
  
);

module.exports = productSchema;