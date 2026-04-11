import React from "react";
import "./Cart.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = 0.11 * subtotal;
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + tax + shipping;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate(`/login?redirect=/shipping`);
  }

  return (
    <>
      <Navbar />
      <PageTitle title="Shopping Cart" />
      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <p className="empty-cart-message">Your Cart is empty</p>
          <Link to="/products" className="viewProducts">
            View Products
          </Link>
        </div>
      ) : (
        <>
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
                  <div className="header-action item-total-heading">
                    Actions
                  </div>
                </div>

                {/* Cart Items */}
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItem item={item} key={item.name} />
                  ))}
              </div>
            </div>

            {/* price summary */}
            <div className="price-summary">
              <h3 className="price-summary-heading">Price Summary</h3>
              <div className="summary-item">
                <p className="summary-label">Subtotal: </p>
                <p className="summary-value">{subtotal.toFixed(2)}/=</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Tax (18%) </p>
                <p className="summary-value">{tax.toFixed(2)}</p>
              </div>
              <div className="summary-item">
                <p className="summary-label">Shipping: </p>
                <p className="summary-value">{shipping.toFixed(2)}</p>
              </div>
              <div className="summary-total">
                <p className="total-label">Total: </p>
                <p className="total-value">{total.toFixed(2)}/=</p>
              </div>
              <button className="checkout-btn" onClick={checkoutHandler}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default Cart;
