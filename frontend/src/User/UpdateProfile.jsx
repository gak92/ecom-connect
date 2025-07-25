import React from "react";
import "../UserStyles/Form.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeErrors,
  removeSuccess,
  updateProfile,
} from "../features/user/userSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");
  const { user, error, loading, success, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileImageUpdate = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.onerror = (error) => {
      toast.error("Error in reading file", error);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
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
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/profile");
    }
  }, [dispatch, success, message]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url || "./images/profile.png");
    //   setAvatar(user.avatar?.url || "./images/profile.png");
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="container update-container">
            <div className="form-content">
              <form
                className="form"
                encType="multipart/form-data"
                onSubmit={updateSubmit}
              >
                <h2>Update Profile</h2>
                <div className="input-group avatar-group">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/"
                    className="file-input"
                    onChange={profileImageUpdate}
                  />
                  <img
                    src={avatarPreview}
                    alt="Profile image"
                    className="avatar"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="authBtn">Update Profile</button>
              </form>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default UpdateProfile;
