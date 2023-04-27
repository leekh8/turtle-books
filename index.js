const cors = require('cors');
const express = require('express');
const productRouter = require('./back-end/routes/product-router')
const categoryRouter = require('./back-end/routes/category-router');
// const app = require("./back-end/app.js");
const PORT = 3000;
//
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", productRouter);
app.use("/category", categoryRouter);

// app.use(errorHandler);
