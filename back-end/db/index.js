const mongoose = require('mongoose');

mongoose.connect(null);
const db = mongoose.connection;

db.on("connected", () =>{
  console.log("MongoDB 서버에 연결되었습니다.")
});

db.on("error", (error) => {
  console.error("MongoDB 서버 연결에 실패하였습니다." + error)
});

export * from "./models/category-model";
export * from "./models/product-model";