const Router = require("express");
const productController = require("../controllers/product-controller");
// const productService = require('../service/product-service');
const ProductRouter = Router();

ProductRouter.get("/", productController.getProductByCategory);
ProductRouter.get("/", productController.getProductByTopic);
ProductRouter.get("/product/:id", productController.getProductById);

module.exports = ProductRouter;
