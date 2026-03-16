import { useNavigate } from "react-router-dom";
import "../styles/CareerChoice.css";

export default function CareerChoice() {
  const navigate = useNavigate();

  return (
    <div className="choice-container">
      <div className="choice-header">
        <h1>Choose Your Career Stage</h1>
        <p>Select your current education level to get personalized guidance</p>
      </div>

      <div className="choice-cards">

        {/* After 10th */}
        <div className="choice-card fade-in">
          <h2>🎓 Career After 10th</h2>
          <p>
            Explore courses, streams and career paths available after completing
            your 10th standard.
          </p>
          <button onClick={() => navigate("/career-form?stage=10th")}>
            Explore After 10th
          </button>
        </div>

        {/* After Inter */}
        <div className="choice-card fade-in delay-1">
          <h2>📘 Career After Intermediate</h2>
          <p>
            Discover degree courses and professional career options after
            Intermediate (12th).
          </p>
          <button onClick={() => navigate("/career-form?stage=inter")}>
            Explore After Inter
          </button>
        </div>

      </div>
    </div>
  );
}
