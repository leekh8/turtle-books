<<<<<<< HEAD

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

=======

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

>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
