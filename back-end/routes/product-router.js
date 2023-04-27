const Router = require("express");
const productController = require("../controllers/product-controller");
const ProductRouter = Router();

ProductRouter.get("/:category", productController.getProductByCategory);
ProductRouter.get("/:topic", productController.getProductByTopic);
ProductRouter.get("/:id", productController.getProductById);

module.exports = ProductRouter;
