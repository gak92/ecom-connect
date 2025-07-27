import React from "react";
import "../CartStyles/OrderConfirm.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import CheckoutPath from "./CheckoutPath";
import { useNavigate } from "react-router-dom";

function OrderConfirm() {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = 0.11 * subtotal;
  const shippingCharges = subtotal > 1000 ? 0 : 100;
  const total = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      tax,
      shippingCharges,
      total,
    };
    sessionStorage.setItem("orderData", JSON.stringify(data));
    navigate("/payment/process");
  };
  return (
    <>
      <PageTitle title="Order Confirmation" />
      <Navbar />
      <CheckoutPath activePath={1} />

      <div className="confirm-container">
        <h1 className="confirm-header">Order Confirmation</h1>
        <div className="confirm-table-container">
          <table className="confirm-table">
            <caption>Shipping Details</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{shippingInfo.phoneNumber}</td>
                <td>
                  {shippingInfo.address}, {shippingInfo.city},{" "}
                  {shippingInfo.state}, {shippingInfo.country}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="confirm-table cart-table">
            <caption>Cart Items</caption>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total PRice</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="confirm-table">
            <caption>Order Summary</caption>
            <thead>
              <tr>
                <th>Subtotal</th>
                <th>Shipping Charges</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{subtotal.toFixed(2)}</td>
                <td>{shippingCharges.toFixed(2)}</td>
                <td>{tax.toFixed(2)}</td>
                <td>{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="proceed-button" onClick={proceedToPayment}>
          Proceed to Payment
        </button>
      </div>

      <Footer />
    </>
  );
}

export default OrderConfirm;
