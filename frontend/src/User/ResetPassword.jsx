import React, { useEffect, useState } from "react";
import "../UserStyles/Form.css";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeErrors,
  removeSuccess,
  resetUserPassword,
} from "../features/user/userSlice";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams(); // Retrieve token from URL parameters
  const { loading, success, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const data = {
      password,
      confirmPassword,
    };
    dispatch(resetUserPassword({ token, userData: data }));
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
        navigate("/login");
    }
  }, [dispatch, success]);

  return (
    <>
      <PageTitle title="Reset Password" />
      <div className="container form-container">
        <div className="form-content">
          <form className="form" onSubmit={resetPasswordSubmit}>
            <h2>Reset Password</h2>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="authBtn">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
