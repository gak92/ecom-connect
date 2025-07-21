import express from "express";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import {
  createNewOrder,
  getSingleOrder,
} from "../controllers/orderController.js";

const router = express.Router();
router.route("/new/order").post(verifyUserAuth, createNewOrder);
router
  .route("/admin/order/:id")
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleOrder);

export default router;
