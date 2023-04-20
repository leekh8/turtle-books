import { app } from "./back-end/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("정상적으로 서버를 시작하였습니다");
});
