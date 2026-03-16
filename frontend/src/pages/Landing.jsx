import "../styles/Landing.css";
import heroImg from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/cerevo_logo.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="CEREVO Logo" />
          <div className="brand-text">
            <span className="brand-name">CEREVO</span>
            <span className="brand-tagline">Your AI Career Companion</span>
          </div>
        </div>

        <div className="nav-buttons">
          <button className="login-nav" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="create-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-text slide-in-left">
          <h2>AI Career Guidance Platform</h2>
          <p>
            Discover your perfect career path using AI-powered recommendations,
            roadmap planning and expert guidance.
          </p>

          <div className="hero-buttons">
            <button
              className="start-btn"
              onClick={() => navigate("/register")}
            >
              Start Journey
            </button>
            {/* <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button> */}
          </div>
        </div>

        <div className="hero-image float">
          <img src={heroImg} alt="Career Guidance" />
        </div>
      </div>
    </div>
  );
}
