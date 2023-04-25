
const Router = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = Router();

categoryRouter.post("/admin", categoryController.createCategory);
categoryRouter.patch("/admin/:id", categoryController.updateCategory);
categoryRouter.delete("/admin/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
