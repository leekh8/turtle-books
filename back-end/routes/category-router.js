

const Router = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/category/:cid", categoryController.updateCategory);
categoryRouter.delete("/category/:cid", categoryController.deleteCategory);

module.exports = categoryRouter;
