import React from "react";
import "../CartStyles/Cart.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <>
      <PageTitle title="Shopping Cart" />
      <Navbar />
      <div className="cart-page">
        {/* Cart Items Details */}
        <div className="cart-items">
          <div className="cart-items-heading">Your Cart</div>
          <div className="cart-table">
            {/* Cart Table Header */}
            <div className="cart-table-header">
              <div className="header-product">Product</div>
              <div className="header-quantity">Quantity</div>
              <div className="header-total item-total-heading">Total</div>
              <div className="header-action item-total-heading">Actions</div>
            </div>

            {/* Cart Items */}
            {cartItems &&
              cartItems.map((item) => <CartItem item={item} key={item.name} />)}
          </div>
        </div>

        {/* price summary */}
        <div className="price-summary">
          <h3 className="price-summary-heading">Price Summary</h3>
          <div className="summary-item">
            <p className="summary-label">Subtotal: </p>
            <p className="summary-value">22000</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Tax (18%) </p>
            <p className="summary-value">2000</p>
          </div>
          <div className="summary-item">
            <p className="summary-label">Shipping: </p>
            <p className="summary-value">1000</p>
          </div>
          <div className="summary-total">
            <p className="total-label">Total: </p>
            <p className="total-value">25000</p>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
