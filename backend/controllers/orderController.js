import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import HandleError from "../utils/handleError.js";

// ================================================================
//            1- Create new order
// This function creates a new order in the database using the data from the request body.
// It returns the created order in the response.
// ================================================================
export const createNewOrder = handleAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
    message: "Order created successfully",
  });
});

// ================================================================
//            2- Get Single order
// ================================================================
export const getSingleOrder = handleAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    return next(new HandleError("Order Not Found", 404));
  }
  res.status(200).json({
    success: true,
    order,
    message: "Single Order fetched successfully",
  });  
});
