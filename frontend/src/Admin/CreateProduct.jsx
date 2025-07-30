import React, { useState } from "react";
import "../AdminStyles/CreateProduct.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"];

  const createProductSubmit = (e) => {
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
  };

  const createProductImage = (e) => {
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

  return (
    <>
      <PageTitle title="Create Product" />
      <Navbar />

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
          <button className="submit-btn">Create</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreateProduct;
