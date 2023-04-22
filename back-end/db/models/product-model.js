const mongoose = require('mongoose');
const Schema = require('../schemas/product-schema');

module.exports = mongoose.model('Product', productSchema);

