

const Router = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/category/:id", categoryController.updateCategory);
categoryRouter.delete("/category/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
