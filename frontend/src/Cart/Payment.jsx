import React from "react";
import "./Payment.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckoutPath from "./CheckoutPath";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../features/payment/paymentSlice";
import { toast } from "react-toastify";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.payment);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      // 1 — Ask backend to create a PaymentIntent, get client_secret
      const result = await dispatch(
        createPaymentIntent(Math.round(orderData.total * 100)), // Convert to cents
      ).unwrap();

      const clientSecret = result.client_secret;

      // 2 — Confirm card payment with Stripe using the client_secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.name,
              email: user?.email,
            },
          },
        },
      );

      if (error) {
        toast.error(error.message, { position: "top-center", autoClose: 4000 });
        return;
      }

      if (paymentIntent.status === "succeeded") {
        navigate(`/paymentSuccess?reference=${paymentIntent.id}`);
      }
    } catch (err) {
      toast.error(err?.message || "Payment failed. Please try again.", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: { color: "#e5424d" },
    },
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

        <form onSubmit={handlePayment} className="payment-form">
          <h3>Card Details</h3>
          <div className="card-element-wrapper">
            <CardElement options={cardElementOptions} />
          </div>

          <button
            type="submit"
            className="payment-btn"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : `Pay $${orderData?.total?.toFixed(2)}`}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
