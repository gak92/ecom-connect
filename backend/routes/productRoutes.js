import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts).post(createProduct);
router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getSingleProduct);

export default router;
