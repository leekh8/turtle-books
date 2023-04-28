const express = require("express");
const categoryController = require("../controllers/category-controller");
const productController = require("../controllers/product-controller");
const userController = require("../controllers/user-controller");
const adminRequired = require("../middlewares/admin-required");
const adminRouter = express.Router();

// /api/admin/category
// /api/admin/product
// /api/admin/userList
adminRouter.get("/", productController.getProduct);
adminRouter.post("/category", categoryController.createCategory);
adminRouter.put(
  "/category/:categoryId",
  // adminRequired,
  categoryController.updateCategory
);
adminRouter.delete(
  "/category/:categoryId",
  // adminRequired,
  categoryController.deleteCategory
);
adminRouter.post("/product", productController.createProduct);
adminRouter.delete(
  "/product/:id",
  // adminRequired,
  productController.deleteProduct
);
adminRouter.put(
  "/product/:productId",
  //adminRequired,
  productController.updateProduct
);
adminRouter.get("/userList", userController.getUserList);

module.exports = adminRouter;
