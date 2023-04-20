import { Router } from "express";
import { productController } from "../../controllers/product-controller";

const router = Router();

router.get('/', productController.getProductList);
router.get('/:bid', productController.getProduct);
router.put('/:bid', productController.editProduct);
router.delete('/:bid', productController.removeProduct);
router.post('/',productController.addProduct);

export { router };