import handleAsyncError from "../middleware/handleAsyncError.js";
import Product from "../models/productModel.js";
import ApiFunctionality from "../utils/apiFunctionality.js";
import HandleError from "../utils/handleError.js";

// {{base_url}}/api/v1/product/6878c7bd0308544aae3faab4?keyword=Mobile

// ================================================================
//            1- Create new product
// This function creates a new product in the database using the data from the request body.
// It returns the created product in the response.
// ================================================================
export const createProduct = handleAsyncError(async (req, res, next) => {
  // console.log("Req body: ", req.body);
  // console.log("Req user: ", req.user);
  // console.log("id: ", req.user.id);
  // console.log("_id: ", req.user._id);

  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
    message: "Product created successfully",
  });
});

// ================================================================
//          2- Get all products
// This function fetches all products from the database and returns them in the response.
// ================================================================
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 3; // You can set this to any number you want
  // console.log(req.query);
  const apiFeatures = new ApiFunctionality(Product.find(), req.query)
    .search()
    .filter();
  // console.log(apiFunctionality.query);

  // Get fiitered query before pagination
  const filteredQuery = apiFeatures.query.clone(); // Clone the query to get the filtered results before pagination
  const productCount = await filteredQuery.countDocuments(); // Count the total number of products after filtering

  // calculate the total number of pages based on filtered product count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1; // Get the current page from query or default to 1

  if (page > totalPages && totalPages > 0) {
    return next(
      new HandleError(`Page not found. Total pages: ${totalPages}`, 404)
    );
  }

  // Apply pagination to the query
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;
  // console.log(products);

  if (!products || products.length === 0) {
    return next(new HandleError("No products found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    count: products.length,
    message: "All products are fetched successfully",
    totalProducts: productCount,
    totalPages: totalPages,
    currentPage: page,
    resultsPerPage: resultsPerPage,
  });
});

// ================================================================
//            3- Get single product
// This function fetches a single product by its ID from the database and returns it in the response.
// It uses the ID from the query parameters.
// ================================================================
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
    message: `Single Product with ID fetched successfully`,
  });
});

// ================================================================
//            4- Update product
// This function updates an existing product in the database using the ID from the request parameters and the data from the request body.
// It returns the updated product in the response.
// ================================================================
export const updateProduct = handleAsyncError(async (req, res, next) => {
  // console.log(typeof req.params.id);
  // console.log(req.body);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // console.log(product);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
    message: "Product updated successfully",
  });
});

// ================================================================
//              5- Delete product
// This function deletes a product from the database using the ID from the request parameters.
// ================================================================
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  // await product.remove();
  // console.log(product);    // This will return the deleted product

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// ================================================================
//              6- Creating and Updating Product Review
// ================================================================
export const createProductReview = handleAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const reviewExists = product.reviews.find(
    (review) => review.user.toString() === req.user.id
  );
  console.log(reviewExists);
  if (reviewExists) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id) {
        review.rating = Number(rating);
        review.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
  }
  product.numOfReviews = product.reviews.length;

  let totalRating = 0;
  product.reviews.forEach((review) => {
    totalRating += review.rating;
  });
  product.ratings =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  await product.save({ validateBeforeSave: false });
  return res.status(200).json({
    success: true,
    product,
    message: "Product review created or updated successfully",
  });
});

// ================================================================
//              7- Admin Getting all products
// ================================================================
export const getAdminAllProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
    message: "All products are fetched successfully",
    count: products.length,
  });
});
