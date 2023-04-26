<<<<<<< HEAD
const { Schema } = require("mongoose");

const productSchema = new Schema(
=======
const { Schema } = require('mongoose');

const productSchema = new Schema (
>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
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
    category: {
      // 분류
      type: String,
      required: true,
    },
    stock: {
      // 재고
      type: Number,
      default: 10,
      required: true,
    },
<<<<<<< HEAD
=======
    imageUrl: {
      type: String,
      required: true,
    }
>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
  },
  {
    timestamps: true,
    collection: "products",
  }
);

module.exports = productSchema;
