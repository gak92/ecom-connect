import * as orderRepository from "../repositories/orderRepository.js";
import * as productRepository from "../repositories/productRepository.js";
import HandleError from "../utils/handleError.js";

// ============================================================
// Order Service — all order-related business logic
// Calls orderRepository (and productRepository for stock) for data access
// ============================================================

// 1 - Create a new order
export const createOrder = async (orderData, userId) => {
  const order = await orderRepository.create({
    ...orderData,
    paidAt: Date.now(),
    user: userId,
  });
  return order;
};

// 2 - Get single order by ID (with user info populated)
export const getSingleOrder = async (orderId) => {
  const order = await orderRepository.findByIdWithUser(orderId);
  if (!order) {
    throw new HandleError("Order not found", 404);
  }
  return order;
};

// 3 - Get all orders for the currently logged-in user
export const getMyOrders = async (userId) => {
  const orders = await orderRepository.findByUserId(userId);
  return orders;
};

// 4 - Admin: Get all orders with total revenue calculation
export const getAllOrders = async () => {
  const orders = await orderRepository.findAll();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return { orders, totalAmount };
};

// 5 - Admin: Update order status and deduct stock when delivered
export const updateOrderStatus = async (orderId, newStatus) => {
  const order = await orderRepository.findById(orderId);
  if (!order) {
    throw new HandleError("Order not found", 404);
  }

  if (order.orderStatus === "Delivered") {
    throw new HandleError("This order has already been delivered", 400);
  }

  // Only deduct product stock when order is marked as Delivered
  if (newStatus === "Delivered") {
    await Promise.all(
      order.orderItems.map((item) => deductStock(item.product, item.quantity)),
    );
    order.deliveredAt = Date.now();
  }

  order.orderStatus = newStatus;
  await orderRepository.saveOrder(order, { validateBeforeSave: false });

  return order;
};

// 6 - Admin: Delete order (only delivered orders can be deleted)
export const deleteOrder = async (orderId) => {
  const order = await orderRepository.findById(orderId);
  if (!order) {
    throw new HandleError("Order not found", 404);
  }

  if (order.orderStatus !== "Delivered") {
    throw new HandleError(
      "Only delivered orders can be deleted. This order is still in processing.",
      400,
    );
  }

  await orderRepository.deleteById(orderId);
  return order;
};

// ── Private helper ────────────────────────────────────────────
// Reduce product stock quantity — prevents stock going below 0
const deductStock = async (productId, quantity) => {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new Error(`Product not found while updating stock: ${productId}`);
  }
  product.stock = Math.max(0, product.stock - quantity);
  await productRepository.saveProduct(product, { validateBeforeSave: false });
};
