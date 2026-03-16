import React, { useState } from "react";
import "../styles/Login.css";
import loginImg from "../assets/login.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8000/auth/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Login failed");
      return;
    }

    // ✅ Save JWT token correctly
    localStorage.setItem("token", data.access_token);
    // localStorage.setItem("user_name", data.name || "Student");

    navigate("/dashboard");

  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Left Image */}
        <div className="login-left">
          <img src={loginImg} alt="Login" />
        </div>

        {/* Right Form */}
        <div className="login-right">
          <h2>Welcome Back 👋</h2>
          <p>Login to continue your career journey</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <span className="icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-text">
            Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
