import React, { useEffect } from "react";
import "./Form.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeErrors,
  removeSuccess,
  updateUserPassword,
} from "../features/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, error, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("currentPassword", currentPassword);
    myForm.append("newPassword", newPassword);
    myForm.append("confirmPassword", confirmPassword);

    // for (let pair of myForm.entries()) {

    // }
    dispatch(updateUserPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });

      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success("Password updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <PageTitle title="Update Password" />
          <div className="container update-container">
            <div className="form-content">
              <form className="form" onSubmit={updatePasswordSubmit}>
                <h2>Update Password</h2>
                <div className="input-group">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Enter your old Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter your new Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your new Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="authBtn">Update Password</button>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default UpdatePassword;
