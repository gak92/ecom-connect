import Product from "../models/productModel.js";

// ============================================================
// Product Repository — ALL Mongoose queries for the Product model
// No business logic here, only database operations
// ============================================================

// Find a product by ID
export const findById = (id) => Product.findById(id);

// Get all products (no filters — used by admin)
export const findAll = () => Product.find();

// Return a base Mongoose query for ApiFeatures (search/filter/pagination builds on this)
// Services use this instead of importing the Product model directly
export const initQuery = () => Product.find();

// Create a new product
export const create = (data) => Product.create(data);

// Update product by ID — returns updated document
export const updateById = (
  id,
  data,
  options = { new: true, runValidators: true },
) => Product.findByIdAndUpdate(id, data, options);

// Delete product by ID — returns deleted document
export const deleteById = (id) => Product.findByIdAndDelete(id);

// Save a modified product document instance (for review updates, stock changes)
export const saveProduct = (product, options = {}) => product.save(options);
