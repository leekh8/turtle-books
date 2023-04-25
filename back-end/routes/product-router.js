
const Router = require('express');
const productController = require('../controllers/product-controller');
// const productService = require('../service/product-service');
const ProductRouter = Router();

ProductRouter.post('/', productController.createProduct);
ProductRouter.delete('/api/product/:id', productController.deleteProduct);
ProductRouter.patch('/api/product/:id', productController.updateProduct);
ProductRouter.get('/', productController.getProductByCategory);
ProductRouter.get('/', productController.getProductByTopic)
ProductRouter.get('/api/product/:id',productController.getProductById);

module.exports = ProductRouter;

