<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  },
  {
    timestamp: true,
    // collection: "product",
  }
  
);


module.exports = mongoose.model('Product', productSchema);

=======
const mongoose = require('mongoose');
const productSchema = require('../schemas/product-schema');

module.exports = mongoose.model('Product', productSchema);

>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
