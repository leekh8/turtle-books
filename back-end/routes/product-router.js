
const Router = require('express');
const productController = require('../controllers/product-controller');
// const productService = require('../service/product-service');
const ProductRouter = Router();

ProductRouter.post('/admin', productController.createProduct);
ProductRouter.delete('/admin/:id', productController.deleteProduct);
ProductRouter.patch('/admin/:id', productController.updateProduct);
ProductRouter.get('/', productController.getProductByCategory);
ProductRouter.get('/', productController.getProductByTopic)
ProductRouter.get('/product/:id',productController.getProductById);

module.exports = ProductRouter;

