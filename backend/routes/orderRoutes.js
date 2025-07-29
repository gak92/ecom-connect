import express from "express";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import {
  createNewOrder,
  deleteOrder,
  getAdminAllOrders,
  getAllMyOrders,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();
router.route("/new/order").post(verifyUserAuth, createNewOrder);
router.route("/order/:id").get(verifyUserAuth, getSingleOrder);

router
  .route("/admin/order/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);
  
router
  .route("/admin/orders")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAdminAllOrders);
router.route("/orders/user").get(verifyUserAuth, getAllMyOrders);

export default router;
