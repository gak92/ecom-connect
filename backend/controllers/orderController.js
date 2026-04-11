import asyncHandler from "../utils/asyncHandler.js";
import * as orderService from "../services/orderService.js";

// ================================================================
// Order Controller — HTTP only, no business logic
// All logic lives in orderService.js
// ================================================================

export const createNewOrder = asyncHandler(async (req, res, next) => {
  const order = await orderService.createOrder(req.body, req.user._id);
  res
    .status(201)
    .json({ success: true, order, message: "Order created successfully" });
});

export const getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await orderService.getSingleOrder(req.params.id);
  res
    .status(200)
    .json({ success: true, order, message: "Order fetched successfully" });
});

export const getAllMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderService.getMyOrders(req.user._id);
  res
    .status(200)
    .json({
      success: true,
      count: orders.length,
      orders,
      message: "Your orders fetched successfully",
    });
});

export const getAdminAllOrders = asyncHandler(async (req, res, next) => {
  const { orders, totalAmount } = await orderService.getAllOrders();
  res
    .status(200)
    .json({
      success: true,
      orders,
      count: orders.length,
      totalAmount,
      message: "All orders fetched successfully",
    });
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status,
  );
  res
    .status(200)
    .json({
      success: true,
      order,
      message: "Order status updated successfully",
    });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  await orderService.deleteOrder(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Order deleted successfully" });
});
