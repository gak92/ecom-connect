import React from "react";
import "../AdminStyles/UpdateProduct.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProductDetails } from "../features/products/productSlice";
import {
  removeErrors,
  removeSuccess,
  updateProduct,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const { product } = useSelector((state) => state.product);
  const { loading, error, success } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"];
  console.log(product);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImage(product.image);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);

    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((prevImages) => [...prevImages, reader.result]);
          setImage((prevImages) => [...prevImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const updateProductSubmit = (e) => {
    e.preventDefault();
    // Create product object with form data
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", stock);
    image.forEach((img) => myForm.append("image", img));

    // Send product data to server
    dispatch(updateProduct({ id, productData: myForm }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Product updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/products");
    }

    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, success, error]);

  return (
    <>
      <PageTitle title="Update Product" />
      <Navbar />

      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form
          className="update-product-form"
          encType="multipart/form-data"
          onSubmit={updateProductSubmit}
        >
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="update-product-input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="update-product-input"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label htmlFor="description">Product Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            className="update-product-textarea"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="category">Product Category</label>
          <select
            name="category"
            id="category"
            className="update-product-select"
            required
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

          <label htmlFor="stock">Product Stock</label>
          <input
            type="text"
            name="stock"
            id="stock"
            className="update-product-input"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <label htmlFor="image">Product Images</label>
          <div className="update-product-file-wrapper">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/"
              multiple
              className="update-product-file-input"
              onChange={handleImageChange}
            />
          </div>

          <div className="update-product-preview-wrapper">
            {imagePreview.map((image, index) => (
              <img
                src={image}
                alt="Product Preview"
                className="update-product-preview-image"
                key={index}
              />
            ))}
          </div>

          <div className="update-product-old-images-wrapper">
            {oldImage.map((image, index) => (
              <img
                src={image.url}
                alt="Old Product Preview"
                className="update-product-old-image"
                key={index}
              />
            ))}
          </div>

          <button className="update-product-submit-btn">
            {loading ? "Updating product..." : "Update Product"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default UpdateProduct;
