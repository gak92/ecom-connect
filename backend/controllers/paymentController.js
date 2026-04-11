import asyncHandler from "../utils/asyncHandler.js";
import * as paymentService from "../services/paymentService.js";

// ================================================================
// Payment Controller — HTTP only, no business logic
// All logic lives in paymentService.js
// ================================================================

export const processPayment = asyncHandler(async (req, res, next) => {
  const client_secret = await paymentService.createPaymentIntent(
    req.body.amount,
    req.user.id,
  );
  res.status(200).json({ success: true, client_secret });
});

export const sendAPIKey = asyncHandler(async (req, res, next) => {
  const stripeApiKey = paymentService.getPublishableKey();
  res.status(200).json({ stripeApiKey });
});

export const paymentVerification = asyncHandler(async (req, res, next) => {
  const { isSucceeded, status, reference } = await paymentService.verifyPayment(
    req.body.paymentIntentId,
  );

  if (isSucceeded) {
    res
      .status(200)
      .json({
        success: true,
        message: "Payment verified successfully",
        reference,
        status,
      });
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: `Payment not completed. Status: ${status}`,
        status,
      });
  }
});
