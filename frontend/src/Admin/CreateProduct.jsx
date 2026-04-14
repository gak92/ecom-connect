import React, { useEffect, useState } from "react";
import "./CreateProduct.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, removeErrors, removeSuccess } from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import { compressImage } from "../utils/imageResizer";
import { categories } from "../utils/categories";
import AdminLayout from "./AdminLayout";



function CreateProduct() {
  const { success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);


  const createProductSubmit = (e) => {
    e.preventDefault();
    // Create product object with JSON data instead of FormData
    // Since images are already base64 strings, JSON is cleaner
    const productData = {
      name,
      price,
      description,
      category,
      stock,
      image,
    };

    // Send product data to server
    dispatch(createProduct(productData));
  };

  const createProductImage = async (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagePreview([]);

    // Process files sequentially or in parallel natively
    try {
      const compressedImages = await Promise.all(
        files.map((file) => compressImage(file, 800, 800, 0.8))
      );
      
      setImage(compressedImages);
      setImagePreview(compressedImages);
    } catch (err) {
      toast.error("Failed to compress images", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }

    if (success) {

      toast.success("Product created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setImage([]);
      setImagePreview([]);
    }
  }, [dispatch, error, success]);

  return (
    <AdminLayout>
      <PageTitle title="Create Product" />

      <div className="create-product-container">
        <h1 className="form-title">Create New Product</h1>
        <form
          className="product-form"
          encType="multipart/form-data"
          onSubmit={createProductSubmit}
        >
          <input
            type="text"
            className="form-input"
            placeholder="Enter product name"
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="form-input"
            placeholder="Enter product price"
            required
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Enter product description"
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="form-select"
            required
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="form-input"
            placeholder="Enter product stock"
            required
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <div className="file-input-container">
            <input
              type="file"
              accept="image/"
              className="form-input-file"
              multiple
              name="image"
              onChange={createProductImage}
            />
          </div>
          <div className="image-preview-container">
            {imagePreview.map((image, index) => (
              <img
                src={image}
                alt="Product Image Preview"
                className="image-preview"
                key={index}
              />
            ))}
          </div>
          <button className="submit-btn">
            {loading ? "Creating Product..." : "Create"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateProduct;
