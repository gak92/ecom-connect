import React, { useEffect } from "react";
import "../pageStyles/Products.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { getProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { removeError } from "../features/products/productSlice";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";
import NoProduct from "../components/NoProduct";

function Products() {
  const { loading, error, products } = useSelector((state) => state.product);
  console.log(products); // Display products in console for debugging purposes.
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // console.log(searchParams);
  const keyword = searchParams.get("keyword");
  console.log(keyword); // Display keyword in console for debugging purposes.

  useEffect(() => {
    dispatch(getProduct({ keyword }));
  }, [dispatch, keyword]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeError());
    }
  }, [dispatch, error]);

  console.log(products.length);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="All Products" />
          <Navbar />
          <div className="products-layout">
            <div className="filter-section">
              <h3 className="filter-heading">Categories</h3>
              {/* Render Categories */}
            </div>

            <div className="products-section">
              {products.length > 0 ? (
                <div className="products-product-container">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProduct keyword={keyword} />
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default Products;
