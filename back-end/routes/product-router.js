
const Router = require('express');
const productController = require('../controllers/product-controller');
// const productService = require('../service/product-service');
const ProductRouter = Router();

ProductRouter.post('/', productController.createProduct);
ProductRouter.delete('/:id', productController.deleteProduct);
ProductRouter.patch('/:id', productController.updateProduct);
ProductRouter.get('/', productController.getProductByCategory);
ProductRouter.get('/', productController.getProductByToopic)
ProductRouter.get('/:id',productController.getProductById);

module.exports = ProductRouter;

