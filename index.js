const app = require("./back-end/app.js");
const mongoose = require("mongoose");

require("dotenv").config();

// .env 파일에 예를 들어 PORT="3000" 을 작성하면, process.env.PORT가 3000이 됨
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`포트: ${PORT} 서버 가동 시작`);
});

const DB_URL =
  process.env.MONGODB_URL || "MongoDB 서버 주소가 설정되지 않았습니다.\n.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);
