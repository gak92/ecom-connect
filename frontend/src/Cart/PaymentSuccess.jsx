import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-toastify";
import {
  createOrder,
  removeErrors,
  removeSuccess,
} from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { loading, success, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrderData = async () => {
      try {
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

        console.log("Sending Order Data ... :", order);
        dispatch(createOrder(order));
        sessionStorage.removeItem("orderData");
      } catch (error) {
        console.error(error);
        toast.error(
          error.message || "Failed to create order. Please try again later.",
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
      }
    };

    createOrderData();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(
        "Your order has been placed successfully. You can track your order in the 'Orders' section.",
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      dispatch(clearCart());
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "Failed to place order. Please try again later.",
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
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
                Your payment was successfull. Reference ID:{" "}
                <strong>{reference}</strong>{" "}
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
