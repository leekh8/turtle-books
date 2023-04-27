import express from "express";
import path from "path";

const viewsRouter = express.Router();
//home
viewsRouter.use("/", serveStatic("home")); // 파일명과 html 폴더명 일치해야함

//html 연결해주는 매서드
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

//expoert
export { viewsRouter };

//우리 폴더 위치와 싱크 시킬지
