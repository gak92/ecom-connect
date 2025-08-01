import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import "../AdminStyles/ReviewsList.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  fetchProductReviews,
  removeErrors,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function ReviewsList() {
  const { products, loading, error, reviews } = useSelector(
    (state) => state.admin
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  console.log(products);
  console.log(reviews);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleViewReviews = (productId) => {
    setSelectedProduct(productId);
    dispatch(fetchProductReviews(productId));
  };

  if (!products || products.length === 0) {
    return (
      <div className="reviews-list-container">
        <h1 className="reviews-list-title">Admin Reviews</h1>
        <p>No Product Found</p>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Reviews List" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="reviews-list-container">
          <h1 className="reviews-list-title">All Products</h1>

          <table className="reviews-table">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Number of Reviews</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={product.image[0].url}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>
                  <td>{product.numOfReviews}</td>
                  <td>
                    {product.numOfReviews > 0 && (
                      <button
                        className="action-btn view-btn"
                        onClick={() => handleViewReviews(product._id)}
                      >
                        View Reviews
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedProduct && reviews && reviews.length > 0 && (
            <div className="reviews-details">
              <h2>Reviews for Products</h2>
              <table className="reviews-table">
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Reviewer Name</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews &&
                    reviews.map((review, index) => (
                      <tr key={review._id}>
                        <td>{index + 1}</td>
                        <td>{review.name}</td>
                        <td>{review.rating}</td>
                        <td>{review.comment}</td>
                        <td>
                          <button className="action-btn delete-btn">
                            <Delete />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default ReviewsList;
