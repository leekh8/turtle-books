const { Schema } = require('mongoose');

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  published_date: {
    type: Date,
    required: true
  },
  stock: {
    type: Number,
    default: 10,
    required: true,
  },

});

module.exports = ProductSchema;