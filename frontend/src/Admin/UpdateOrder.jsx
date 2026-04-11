import React, { useEffect, useState } from "react";
import "./UpdateOrder.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../features/order/orderSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
  removeErrors,
  removeSuccess,
  updateOrderStatus,
} from "../features/admin/adminSlice";

function UpdateOrder() {
  const [status, setStatus] = useState("");
  const { orderId } = useParams();
  const { order, loading: orderLoading } = useSelector((state) => state.order);
  const {
    success,
    loading: adminLoading,
    error,
  } = useSelector((state) => state.admin);
  const loading = orderLoading || adminLoading;
  const dispatch = useDispatch();
  console.log(order, orderId);

  useEffect(() => {
    if (orderId) {
      console.log("Fetching order details...");
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  let shippingInfo = {};
  let orderItems = [];
  let paymentInfo = {};
  let orderStatus = "";
  let totalPrice = 0;
  let paymentStatus = "";
  let finalOrderStatus = "";

  if (order) {
    ({
      shippingInfo = {},
      orderItems = [],
      paymentInfo = {},
      orderStatus,
      totalPrice,
    } = order);
    paymentStatus = paymentInfo.status === "succeeded" ? "Paid" : "Not Paid";
    finalOrderStatus = paymentStatus === "Not Paid" ? "Cancelled" : orderStatus;
  }
  console.log(paymentStatus, finalOrderStatus);

  const handleStatusUpdate = () => {
    if (!status) {
      toast.error("Please enter order status", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    dispatch(updateOrderStatus({ orderId, status }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Order status updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      dispatch(getOrderDetails(orderId));
    }
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, success, error, orderId]);

  return (
    <>
      <PageTitle title="Update Order" />
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="order-container">
          <h1 className="order-title">Update Order</h1>

          <div className="order-details">
            <h2>Order Information</h2>
            <p>
              <strong>Order ID: </strong> {orderId}
            </p>
            <p>
              <strong>Shipping Address: </strong> {shippingInfo.address},{" "}
              {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country}
            </p>
            <p>
              <strong>Phone Number:</strong> {shippingInfo.phoneNo}
            </p>
            <p>
              <strong>Order Status: </strong> {finalOrderStatus}
            </p>
            <p>
              <strong>Payment Status: </strong> {paymentStatus}
            </p>
            <p>
              <strong>Total Price: </strong> {totalPrice}
            </p>
          </div>

          <div className="order-items">
            <h2>Order Items</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}/=</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="order-status">
            <h2>Update Order Status</h2>
            <select
              className="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading || orderStatus === "Delivered"}
            >
              <option value="">Select status</option>
              <option value="Shipped">Shipped</option>
              <option value="On The Way">On The Way</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              className="update-button"
              onClick={handleStatusUpdate}
              disabled={loading || !status || orderStatus === "Delivered"}
            >
              Update Status
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default UpdateOrder;
