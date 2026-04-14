import React, { useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import {
  AddBox,
  AttachMoney,
  CheckCircle,
  Dashboard as DashboardIcon,
  Error,
  Instagram,
  Inventory,
  LinkedIn,
  People,
  ShoppingCart,
  Star,
  YouTube,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  fetchAllOrders,
} from "../features/admin/adminSlice";
import AdminLayout from "./AdminLayout";


function Dashboard() {
  const { products, orders, totalAmount } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const inStock = products.filter((product) => product.stock > 0).length;
  const totalReviews = products.reduce(
    (acc, product) => acc + product.reviews.length || 0,
    0
  );

  return (
    <AdminLayout>
      <PageTitle title="Admin Dashboard" />

      <div className="stats-grid">
        <div className="stat-box">
          <Inventory className="icon" />
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-box">
          <ShoppingCart className="icon" />
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="stat-box">
          <Star className="icon" />
          <h3>Total Reviews</h3>
          <p>{totalReviews}</p>
        </div>

        <div className="stat-box">
          <AttachMoney className="icon" />
          <h3>Total Revenue</h3>
          <p>{totalAmount.toFixed(2)}</p>
        </div>

        <div className="stat-box">
          <Error className="icon" />
          <h3>Out of Stock</h3>
          <p>{outOfStock}</p>
        </div>

        <div className="stat-box">
          <CheckCircle className="icon" />
          <h3>In Stock</h3>
          <p>{inStock}</p>
        </div>
      </div>

      <div className="social-stats">
        <div className="social-box instagram">
          <Instagram />
          <h3>Instagram</h3>
          <p>127k Followers</p>
          <p>11 posts</p>
        </div>

        <div className="social-box linkedin">
          <LinkedIn />
          <h3>LinkedIn</h3>
          <p>127k Followers</p>
          <p>11 posts</p>
        </div>

        <div className="social-box youtue">
          <YouTube />
          <h3>Youtube</h3>
          <p>127k Followers</p>
          <p>11 posts</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
