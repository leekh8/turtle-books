

const Router = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/api/category/:id", categoryController.updateCategory);
categoryRouter.delete("/api/category/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
