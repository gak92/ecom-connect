import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../server.js";

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

  const order = await instance.orders.create(options);
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
