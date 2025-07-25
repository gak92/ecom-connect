import React, { useState } from "react";
import "../UserStyles/UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout, removeSuccess } from "../features/user/userSlice";

function UserDashboard({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }
  const options = [
    { name: "Orders", funcName: orders },
    { name: "Account", funcName: profile },
    { name: "Logout", funcName: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({ name: "Admin Dashboard", funcName: adminDashboard });
  }

  function orders() {
    // navigate("/orders/user", { replace: true });
    navigate("/orders/user");
    setMenuVisible(false);
  }

  function profile() {
    navigate("/profile");
    setMenuVisible(false);
  }

  function logoutUser() {
    console.log("Logging out...");
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeSuccess());
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message || "Logout Failed", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  }

  function adminDashboard() {
    navigate("/admin/dashboard");
  }

  return (
    <>
      <div className={`overlay ${menuVisible ? "show" : ""}`} onClick={toggleMenu}></div>
      <div className="dashboard-container">
        <div className="profile-header" onClick={toggleMenu}>
          <img
            src={user.avatar.url ? user.avatar.url : "./images/profile.png"}
            alt="Profile Picture"
            className="profile-avatar"
          />
          <span className="profile-name">{user.name || "User"}</span>
        </div>
        {menuVisible && (
          <div className="menu-options">
            {options.map((item) => (
              <button
                key={item.name}
                className="menu-option-btn"
                onClick={item.funcName}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UserDashboard;
