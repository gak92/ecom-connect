import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";

// ================================================================
//            1- Create new product
// ================================================================
// This function creates a new product in the database using the data from the request body.
// It returns the created product in the response.
export const createProduct = async (req, res) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
    message: "Product created successfully",
  });
};

// ================================================================
//          2- Get all products
// ================================================================
// This function fetches all products from the database and returns them in the response.
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  // console.log(typeof products);
  res.status(200).json({
    success: true,
    products,
    count: products.length,
    message: "All products are fetched successfully",
  });
};

// ================================================================
//            3- Get single product
// ================================================================
// This function fetches a single product by its ID from the database and returns it in the response.
// It uses the ID from the query parameters.
export const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
    message: `Single Product with ID fetched successfully`,
  });
};

// ================================================================
//            4- Update product
// ================================================================
// This function updates an existing product in the database using the ID from the request parameters and the data from the request body.
// It returns the updated product in the response.
export const updateProduct = async (req, res, next) => {
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
};

// ================================================================
//              5- Delete product
// ================================================================
// This function deletes a product from the database using the ID from the request parameters.
export const deleteProduct = async (req, res, next) => {
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
};
