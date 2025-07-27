import handleAsyncError from "../middleware/handleAsyncError.js";
import { instance } from "../server.js";

export const processPayment = handleAsyncError(async (req, res, next) => {
  const options = {
    amount: 10000,
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
});
