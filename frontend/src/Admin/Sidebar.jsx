import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  AddBox,
  Dashboard as DashboardIcon,
  Inventory,
  People,
  ShoppingCart,
  Star,
} from "@mui/icons-material";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <DashboardIcon className="header-icon" />
        Admin Dashboard
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          <span className="group-title">Menu</span>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <DashboardIcon className="nav-icon" />
            Dashboard
          </NavLink>
        </div>

        <div className="nav-group">
          <span className="group-title">Products</span>
          <NavLink
            to="/admin/products"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <Inventory className="nav-icon" />
            All Products
          </NavLink>
          <NavLink
            to="/admin/product/create"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <AddBox className="nav-icon" />
            Create Product
          </NavLink>
        </div>

        <div className="nav-group">
          <span className="group-title">Orders</span>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <ShoppingCart className="nav-icon" />
            All Orders
          </NavLink>
        </div>

        <div className="nav-group">
          <span className="group-title">Users</span>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <People className="nav-icon" />
            All Users
          </NavLink>
        </div>

        <div className="nav-group">
          <span className="group-title">Reviews</span>
          <NavLink
            to="/admin/reviews"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <Star className="nav-icon" />
            All Reviews
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
