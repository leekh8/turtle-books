const Router = require("express");
const productController = require("../controllers/product-controller");
const ProductRouter = Router();
ProductRouter.get("/", productController.getProduct);
ProductRouter.get("/:categoryId", productController.getProductByCategory);
ProductRouter.get("/:topic", productController.getProductByTopic);
ProductRouter.get("/detail/:productId", productController.getProductById);

module.exports = ProductRouter;
