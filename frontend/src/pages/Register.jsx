import React, { useState } from "react";
import "../styles/Register.css";
import registerImg from "../assets/register.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/auth/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Registration failed");
      return;
    }
    localStorage.setItem("user_name", form.name);
    alert("Registration Successful 🎉 Please login now");

    navigate("/login");

  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
};


  return (
    <div className="register-container">
      <div className="register-card">

        {/* Left Image */}
        <div className="register-left">
          <img src={registerImg} alt="Register" />
        </div>

        {/* Right Form */}
        <div className="register-right">
          <h2>Create Account 🚀</h2>
          <p>Start your AI-powered career journey</p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <span className="icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>

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

            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
