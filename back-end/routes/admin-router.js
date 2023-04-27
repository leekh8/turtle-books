const express = require("express");
const categoryController = require("../controllers/category-controller");
const productController = require("../controllers/product-controller");
const userController = require("../controllers/user-controller");
const adminRequired = require("../middlewares/admin-required");
const adminRouter = express.Router();

// /api/admin/category
// /api/admin/product
// /api/admin/userList

adminRouter.post("/category", adminRequired, categoryController.createCategory);
adminRouter.patch(
  "/category/:id",
  adminRequired,
  categoryController.updateCategory
);
adminRouter.delete(
  "/category/:id",
  adminRequired,
  categoryController.deleteCategory
);
adminRouter.get("/category", adminRequired, categoryController.getCatetory);
adminRouter.post("/product", adminRequired, productController.createProduct);
adminRouter.delete(
  "/product/:id",
  adminRequired,
  productController.deleteProduct
);
adminRouter.patch(
  "/product/:id",
  adminRequired,
  productController.updateProduct
);
adminRouter.get("/userList", adminRequired, userController.getUserList);

module.exports = adminRouter;
