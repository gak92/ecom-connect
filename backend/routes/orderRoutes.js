import express from "express";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import {
  createNewOrder,
  getAllMyOrders,
  getSingleOrder,
} from "../controllers/orderController.js";

const router = express.Router();
router.route("/new/order").post(verifyUserAuth, createNewOrder);
router
  .route("/admin/order/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleOrder);
router
  .route("/orders/user")
  .get(verifyUserAuth, getAllMyOrders);

export default router;
