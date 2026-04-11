import asyncHandler from "../utils/asyncHandler.js";
import * as productService from "../services/productService.js";

// ================================================================
// Product Controller — HTTP only, no business logic
// All logic lives in productService.js
// ================================================================

export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.createProduct(req.body, req.user.id);
  res
    .status(201)
    .json({ success: true, product, message: "Product created successfully" });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const { products, productCount, totalPages, page, resultsPerPage } =
    await productService.getAllProducts(req.query);

  res.status(200).json({
    success: true,
    products,
    count: products.length,
    totalProducts: productCount,
    totalPages,
    currentPage: page,
    resultsPerPage,
    message: "Products fetched successfully",
  });
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.getSingleProduct(req.params.id);
  res
    .status(200)
    .json({ success: true, product, message: "Product fetched successfully" });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res
    .status(200)
    .json({ success: true, product, message: "Product updated successfully" });
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  await productService.deleteProduct(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

export const createProductReview = asyncHandler(async (req, res, next) => {
  const product = await productService.createOrUpdateReview(
    req.user._id,
    req.user.name,
    req.body,
  );
  res
    .status(200)
    .json({ success: true, product, message: "Review submitted successfully" });
});

export const getProductReviews = asyncHandler(async (req, res, next) => {
  const reviews = await productService.getProductReviews(req.query.id);
  res
    .status(200)
    .json({
      success: true,
      reviews,
      count: reviews.length,
      message: "Reviews fetched successfully",
    });
});

export const deleteProductReview = asyncHandler(async (req, res, next) => {
  await productService.deleteProductReview(req.query.productId, req.query.id);
  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});

export const getAdminAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productService.getAdminAllProducts();
  res
    .status(200)
    .json({
      success: true,
      products,
      count: products.length,
      message: "All products fetched successfully",
    });
});
