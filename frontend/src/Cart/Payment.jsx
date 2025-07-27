import React from "react";
import "../CartStyles/Payment.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link } from "react-router-dom";

function Payment() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  return (
    <>
      <PageTitle title="Payment" />
      <Navbar />
      <CheckoutPath activePath={2} />

      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go Back
        </Link>
        <button className="payment-btn">Pay ({orderData.total.toFixed(2)})/=</button>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
