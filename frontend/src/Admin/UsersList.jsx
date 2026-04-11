import React, { useEffect } from "react";
import "./UsersList.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteUser,
  fetchUsers,
  removeErrors,
} from "../features/admin/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function UsersList() {
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  console.log(loading, users, error);

  const handleDelete = (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (message) {
      toast.success("User deleted successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(clearMessage());
      navigate("/admin/dashboard");
    }
  }, [dispatch, message, error]);

  return (
    <>
      <PageTitle title="Users List" />
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className="usersList-container">
          <h1 className="usersList-title">All Users</h1>
          <div className="usersList-table-container">
            <table className="usersList-table">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link
                        to={`/admin/user/${user._id}`}
                        className="action-icon edit-icon"
                      >
                        <Edit />
                      </Link>
                      <button
                        className="action-icon delete-icon"
                        onClick={() => handleDelete(user._id)}
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default UsersList;
