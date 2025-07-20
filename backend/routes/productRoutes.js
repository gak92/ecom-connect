import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAdminAllProducts,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

// Only admin can create products.
router
  .route("/admin/product/create")
  .post(verifyUserAuth, roleBasedAccess("admin"), createProduct);

// Get all products and their details.
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/products")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminAllProducts);

// Only admin can update and delete products.
router
  .route("/admin/product/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

// create a review for a product
router.route("/review").put(verifyUserAuth, createProductReview);

export default router;
