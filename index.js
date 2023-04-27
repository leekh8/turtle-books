const app = require("./back-end/app.js");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`포트: ${PORT} 서버 가동 시작`);
});
