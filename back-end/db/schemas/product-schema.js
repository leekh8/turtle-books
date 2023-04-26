<<<<<<< HEAD
const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
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
    published_date: { // 발행일
      type: Date,
      required: true,
    },
    price: { // 가격
      type: Number,
      required: true,
    },
    category: { // 분류
      type : String,
      required : true,
      trim: true,
    },
    stock: { // 재고
      type: Number,
      defautlt : 10,
      required: true,
    },
    topic: {
      type : String,
      required: true,
      default: "normal",
      //new, best, steady, normal
    },
  },
  {
    timestamp: true,
    collection: "product",
  }
  
);

// 문자열 형태의 "category" 매개변수를 받아 쉼표로 구분된 각 단어 앞에 "#"을 붙인 뒤 다시 공백으로 구분된 문자열로 변환하는 함수
productSchema.static("formatHashtags", function (category) {
  return category
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`))
    .join(" ");
});


const ProductModel = model("Product", ProductSchema);
module.exports = ProductModel;
=======
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
    description: { // 책 소개
      type: String,
      required: true,
      default: "책 소개 준비중",
    },
    price: { // 가격
      type: Number,
      required: true,
    },
    topic: { // best, steady, new
      type: String,
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
    imageUrl: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "products"
  }
);

module.exports = productSchema;
>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
