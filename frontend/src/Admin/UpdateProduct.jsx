import React from "react";
import "../AdminStyles/UpdateProduct.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"];

  return (
    <>
      <PageTitle title="Update Product" />
      <Navbar />

      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>
        <form className="update-product-form" encType="multipart/form-data">
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

          <button className="update-product-submit-btn">Update Product</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default UpdateProduct;
