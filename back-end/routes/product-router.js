
const Router = require('express');
const productController = require('../controllers/product-controller');
// const productService = require('../service/product-service');
const ProductRouter = Router();

ProductRouter.post('/', productController.createProduct);
ProductRouter.delete('/:id', productController.deleteProduct);
ProductRouter.put('/:id', productController.updateProduct);
ProductRouter.get('/',)
ProductRouter.get('/:id',)

module.exports = ProductRouter;

