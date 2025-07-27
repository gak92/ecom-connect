import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../server.js";
import crypto from "crypto";

// ================================================================
//               1- Process Payment
// This function processes the payment using the Razorpay API.
// It returns the order details in the response.
// ================================================================
export const processPayment = handleAsyncError(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount) * 100, // Convert amount to cents(paisay for Indian Rupees),
    currency: "INR",
  };

  //   const order = await instance.orders.create(options);
  // Dummy data because dont have Razorpay API key
  const order = {
    id: "order_id_example",
    amount: options.amount,
    amount_due: 0,
    amount_paid: options.amount,
    currency: options.currency,
    status: "created",
    notes: [],
    offer_id: "offer_id_example",
    receipt: "",
  };
  //   console.log(order);
  res.status(200).json({
    success: true,
    order,
  });
});

// ================================================================
//             2- Send API Key
// ================================================================
export const sendAPIKey = handleAsyncError(async (req, res, next) => {
  res.status(200).json({
    key: process.env.RAZOR_PAY_API_KEY,
  });
});

// ================================================================
//             3- Payment Verification
// ================================================================
export const paymentVerification = handleAsyncError(async (req, res, next) => {
  //   console.log(req.body);
  //   const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
  req.body;
  // dummy data because dont have Razorpay API key
  const razorpay_payment_id = "payment_id_example";
  const razorpay_order_id = "order_id_example";
  const razorpay_signature = "signature_example";

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const exprectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = exprectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.status(200).json({
      success: true,
      message: "Payment Verified successfully",
      reference: razorpay_payment_id,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Payment Verification failed",
    });
  }
});
