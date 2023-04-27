// const cors = require('cors');
// const express = require('express');
// const productRouter = require('./back-end/routes/product-router')
// const categoryRouter = require('./back-end/routes/category-router');
const app = require("./back-end/app.js");
const PORT = 3000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/api/product", productRouter);
// app.use("/api/category", categoryRouter);

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`정상적으로 서버가 작동 중입니다 ${PORT}`);
});