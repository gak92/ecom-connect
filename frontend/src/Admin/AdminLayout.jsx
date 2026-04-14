import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Sidebar.css"; // Reuse sidebar layout styles if needed or add layout specific styles

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Navbar />
      <div className="admin-container">
        <Sidebar />
        <main className="admin-main-content">
          {children}
        </main>
      </div>
      {/* Footer is usually omitted in admin dashboards for cleaner look, 
          but adding it back if requested. Currently keeping it clean. */}
    </div>
  );
}

export default AdminLayout;
