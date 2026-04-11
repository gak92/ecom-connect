import { v2 as cloudinary } from "cloudinary";
import * as productRepository from "../repositories/productRepository.js";
import ApiFeatures from "../utils/apiFeatures.js";
import HandleError from "../utils/handleError.js";

// ============================================================
// Product Service — all product-related business logic
// Calls productRepository for data access, never the model directly
// ============================================================

// 1 - Create a new product — upload images to Cloudinary first
export const createProduct = async (body, userId) => {
  let images = [];
  if (typeof body.image === "string") {
    images.push(body.image);
  } else if (Array.isArray(body.image)) {
    images = body.image;
  }

  const imageLinks = [];
  for (const image of images) {
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    imageLinks.push({ public_id: result.public_id, url: result.secure_url });
  }

  const product = await productRepository.create({
    ...body,
    image: imageLinks,
    user: userId,
  });

  return product;
};

// 2 - Get all products with search, filter, pagination
export const getAllProducts = async (query) => {
  const resultsPerPage = Number(process.env.RESULTS_PER_PAGE) || 8;

  const apiFeatures = new ApiFeatures(productRepository.initQuery(), query)
    .search()
    .filter();

  // Clone query before pagination to get total filtered count
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(query.page) || 1;

  if (page > totalPages && totalPages > 0) {
    throw new HandleError(`Page not found. Total pages: ${totalPages}`, 404);
  }

  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    throw new HandleError("No products found", 404);
  }

  return { products, productCount, totalPages, page, resultsPerPage };
};

// 3 - Get single product by ID
export const getSingleProduct = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new HandleError("Product not found", 404);
  }
  return product;
};

// 4 - Update product — replace Cloudinary images if new ones provided
export const updateProduct = async (id, body) => {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  let images = [];
  if (typeof body.image === "string") {
    images.push(body.image);
  } else if (Array.isArray(body.image)) {
    images = body.image;
  }

  if (images.length > 0) {
    // Delete existing Cloudinary images first
    for (const img of product.image) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    // Upload new images
    const imageLinks = [];
    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      imageLinks.push({ public_id: result.public_id, url: result.secure_url });
    }
    body.image = imageLinks;
  }

  const updatedProduct = await productRepository.updateById(id, body);
  return updatedProduct;
};

// 5 - Delete product — remove Cloudinary images BEFORE deleting DB record
export const deleteProduct = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  // Delete images from Cloudinary first to avoid orphaned files
  for (const img of product.image) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  await productRepository.deleteById(id);
  return product;
};

// 6 - Create or update a product review (one review per user per product)
export const createOrUpdateReview = async (
  userId,
  userName,
  { rating, comment, productId },
) => {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  const review = {
    user: userId,
    name: userName,
    rating: Number(rating),
    comment,
  };

  const reviewExists = product.reviews.find(
    (r) => r.user.toString() === userId.toString(),
  );

  if (reviewExists) {
    product.reviews.forEach((r) => {
      if (r.user.toString() === userId.toString()) {
        r.rating = Number(rating);
        r.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }

  product.numOfReviews = product.reviews.length;

  let totalRating = 0;
  product.reviews.forEach((r) => {
    totalRating += r.rating;
  });
  product.ratings =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  await productRepository.saveProduct(product, { validateBeforeSave: false });
  return product;
};

// 7 - Get all reviews for a product
export const getProductReviews = async (productId) => {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new HandleError("Product not found", 404);
  }
  return product.reviews;
};

// 8 - Delete a specific review from a product
export const deleteProductReview = async (productId, reviewId) => {
  const product = await productRepository.findById(productId);
  if (!product) {
    throw new HandleError("Product not found", 404);
  }

  const reviews = product.reviews.filter(
    (r) => r._id.toString() !== reviewId.toString(),
  );

  let totalRating = 0;
  reviews.forEach((r) => {
    totalRating += r.rating;
  });
  const ratings = reviews.length > 0 ? totalRating / reviews.length : 0;

  await productRepository.updateById(productId, {
    reviews,
    numOfReviews: reviews.length,
    ratings,
  });
};

// 9 - Admin: Get all products without filters
export const getAdminAllProducts = async () => {
  return await productRepository.findAll();
};
