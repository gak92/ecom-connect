import React, { useEffect, useState } from "react";
import "./UpdateRole.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleUser,
  removeErrors,
  removeSuccess,
  updateUserRole,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";


function UpdateRole() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, success, error } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const { name, email, role } = formData;

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserRole({ userId, role }));
  };

  useEffect(() => {
    if (success) {
      toast.success("User role updated successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/users");
    }

    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeErrors());
    }
  }, [dispatch, success, error]);

  return (
    <AdminLayout>
      <PageTitle title="Update User Role" />

      {loading ? (
        <Loader />
      ) : (
        <div className="page-wrapper">
          <div className="update-user-role-container">
            <h1>Update User Role</h1>
            <form className="update-user-role-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  readOnly
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  readOnly
                  value={email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  name="role"
                  id="role"
                  required
                  value={role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <button className="btn btn-primary">Update Role</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default UpdateRole;
