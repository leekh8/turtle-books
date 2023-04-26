<<<<<<< HEAD

// import { bodyEmptyChecker } from "../middlewares";

// const Router = require('express');
// const categoryController = require('../controllers/category-controller');

// const categoryRouter = Router();

// categoryRouter.post("/", categoryController.addCategory);
// categoryRouter.get("/", categoryController.getCategoryList);
// categoryRouter.get("/search", categoryController.getCategoryByName);
// categoryRouter.get("/:cid", categoryController.getCategoryById);
// categoryRouter.put("/:cid", categoryController.editCategory);
// categoryRouter.delete("/:cid", categoryController.removeCategory);

// module.exports = categoryRouter;
=======

const Router = require('express');
const categoryController = require('../controllers/category-controller');

const categoryRouter = Router();

categoryRouter.post("/admin", categoryController.createCategory);
categoryRouter.patch("/admin/:id", categoryController.updateCategory);
categoryRouter.delete("/admin/:id", categoryController.deleteCategory);
categoryRouter.get("/", categoryController.getCatetory);

module.exports = categoryRouter;
>>>>>>> 3437cec78674f8d05c30272b827dc9c1dcfcf073
