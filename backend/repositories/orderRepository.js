import Order from "../models/orderModel.js";

// ============================================================
// Order Repository — ALL Mongoose queries for the Order model
// No business logic here, only database operations
// ============================================================

// Find order by ID (no user population)
export const findById = (id) => Order.findById(id);

// Find order by ID and populate user name and email
export const findByIdWithUser = (id) =>
  Order.findById(id).populate("user", "name email");

// Find all orders for a specific user
export const findByUserId = (userId) =>
  Order.find({ user: userId }).populate("user", "name email");

// Get all orders (admin)
export const findAll = () => Order.find();

// Create a new order
export const create = (data) => Order.create(data);

// Delete an order by ID using deleteOne for clarity
export const deleteById = (id) => Order.deleteOne({ _id: id });

// Save a modified order document instance (for status updates)
export const saveOrder = (order, options = {}) => order.save(options);
