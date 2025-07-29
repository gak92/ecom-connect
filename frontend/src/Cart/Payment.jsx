import React from "react";
import "../CartStyles/Payment.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Razorpay from "razorpay";
import {toast} from "react-toastify";

function Payment() {
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const completePayement = async (amount) => {
    try {
      console.log("Payment processing...", amount);
      const { data: keyData } = await axios.get("/api/v1/getKey");
      const { key } = keyData;
      console.log("Key: ", key);
      const { data } = await axios.post("/api/v1/payment/process", { amount });
      // console.log("Payment response: ", data);
      const { order } = data;
      console.log("Order: ", order);

      // Open Razorpay Checkout
      const options = {
        key,
        amount,
        currency: "INR",
        name: "My Ecommerce Store",
        description: "My Ecommerce Store Test Transaction",
        order_id: order.id,
        // callback_url: "/api/v1/paymentVerification",
        handler: async function (response) {
          const { data } = await axios.post("/api/v1/paymentVerification", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (data.success) {
            navigate(`/paymentSuccess?reference=${data.reference}`);
          } else {
            alert("Payment failed. Please try again.");
            // navigate("/cart");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };
      // const rzp = new Razorpay(options);
      // rzp.open();
      return order;
    } catch (error) {
      console.error("Payment failed: ", error);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
      // navigate("/cart");
    }
  };

  return (
    <>
      <PageTitle title="Payment" />
      <Navbar />
      <CheckoutPath activePath={2} />

      <div className="payment-container">
        <Link to="/order/confirm" className="payment-go-back">
          Go Back
        </Link>
        <button
          className="payment-btn"
          onClick={() => completePayement(orderData.total.toFixed(2))}
        >
          Pay ({orderData.total.toFixed(2)})/=
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
