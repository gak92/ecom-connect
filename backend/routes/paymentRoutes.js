import express from "express";
import {
  paymentVerification,
  processPayment,
  sendAPIKey,
} from "../controllers/paymentController.js";
import { verifyUserAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.route("/payment/process").post(verifyUserAuth, processPayment);
router.route("/getKey").get(verifyUserAuth, sendAPIKey);
router.route("/paymentVerification").post(verifyUserAuth, paymentVerification);

export default router;
