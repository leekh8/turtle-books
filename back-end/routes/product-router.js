const Router = require('express');
const productController = require('../controllers/product-controller')

const ProductRouter = Router();

ProductRouter.get('/', productController.getProductList);
ProductRouter.get('/:bid', productController.getProduct);
ProductRouter.put('/:bid', productController.editProduct);
ProductRouter.delete('/:bid', productController.removeProduct);
ProductRouter.post('/',productController.addProduct);

module.exports = ProductRouter;