const mongoose = require('mongoose');

const CartSchema = require('./schemas/cart');
const OrderSchema = require('./schemas/order');
const ProductSchema = require('./schemas/product');

const UserSchema = require('./schemas/user');







exports.Cart = mongoose.model('Cart', CartSchema);

exports.Product = mongoose.model('Product', ProductSchema);

exports.User = mongoose.model('User', UserSchema);