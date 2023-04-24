// Product 모델은 MongoDB의 ObjectId를 사용하여 ID를 저장

const mongoose = require('mongoose');
const categorySchema = require('../schemas/category-schema');

module.exports = mongoose.model('Category', categorySchema);