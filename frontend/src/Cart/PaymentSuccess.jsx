import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createOrder,
  removeErrors,
  removeSuccess,
} from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { clearPaymentState } from "../features/payment/paymentSlice";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { loading, success, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reference) return;

    const orderData = JSON.parse(sessionStorage.getItem("orderData"));
    if (!orderData) return;

    const order = {
      shippingInfo: {
        address: shippingInfo.address,
        pinCode: shippingInfo.pinCode,
        phoneNo: shippingInfo.phoneNumber,
        country: shippingInfo.country,
        state: shippingInfo.state,
        city: shippingInfo.city,
      },
      orderItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        product: item.product,
      })),
      paymentInfo: {
        id: reference,
        status: "succeeded",
      },
      itemPrice: orderData.subtotal,
      taxPrice: orderData.tax,
      shippingPrice: orderData.shippingCharges,
      totalPrice: orderData.total,
    };

    dispatch(createOrder(order));
    sessionStorage.removeItem("orderData");
    dispatch(clearPaymentState());
  }, [reference]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (success) {
      toast.success(
        "Your order has been placed successfully! Track it in Orders.",
        { position: "top-center", autoClose: 5000 },
      );
      dispatch(clearCart());
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(error || "Failed to place order. Please contact support.", {
        position: "top-center",
        autoClose: 5000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="Payment Success" />
          <Navbar />

          <div className="payment-success-container">
            <div className="success-content">
              <div className="success-icon">
                <div className="checkmark"></div>
              </div>
              <h1>Order Confirmed</h1>
              <p>
                Your payment was successful. Reference ID:{" "}
                <strong>{reference}</strong>
              </p>
              <Link className="explore-btn" to="/orders/user">
                View Orders
              </Link>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default PaymentSuccess;
