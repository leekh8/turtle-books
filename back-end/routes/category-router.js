

const Router = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = Router();

categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/:cid", categoryController.updateCategory);
categoryRouter.delete("/:cid", categoryController.deleteCategory);

module.exports = categoryRouter;
