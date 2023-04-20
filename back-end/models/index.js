const mongoose = require('mongoose');
const productSchema = require('./schemas/products-schema');
const  categorySchema = require('./schemas/category-schema');


mongoose.connect(null);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + null)
);
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + null + "\n" + error)
);


exports.products = mongoose.model('products', productSchema);
exports.category = mongoose.model('category', categorySchema);