import React, { useState } from "react";
import "../UserStyles/Form.css";
import { Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;

  const [avatar, setUserAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./images/profile.png");

  return (
    <div className="form-container container">
      <div className="form-content">
        <form className="form">
          <h2>Sign Up</h2>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={name}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
            />
          </div>
          <div className="input-group avatar-group">
            <input
              type="file"
              name="avatar"
              className="file-input"
              accept="image/"
            />
            <img src={avatarPreview} alt="Avatar Preview" className="avatar" />
          </div>
          <button className="authBtn">Sign Up</button>
          <p className="form-links">
            Already have an account? <Link>Sign In here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
