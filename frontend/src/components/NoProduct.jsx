import React from "react";
import "./NoProducts.css";

function NoProduct({ keyword }) {
  return (
    <div className="no-products-content">
      <div className="no-products-icon">⚠ </div>

      <h3 className="no-products-title">No Product Found</h3>
      <p className="no-products-message">
        {keyword
          ? ` We could not find any product that matches "${keyword}". Please try again.`
          : "No products found in the store."}
      </p>
    </div>
  );
}

export default NoProduct;
