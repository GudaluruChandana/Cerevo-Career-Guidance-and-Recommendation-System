import "../styles/CareerForm.css";
import formImg from "../assets/dashboard.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import InterestTags from "../components/InterestTags";

export default function CareerForm() {
  const [params] = useSearchParams();
  const stage = params.get("stage"); // 10th or inter
  const navigate = useNavigate();

  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (interests.length === 0 || !skills || !goal) {
      alert("Please fill all fields and select at least one interest");
      return;
    }

    // Save data for recommendation page
    localStorage.setItem("career_interests", JSON.stringify(interests));
    localStorage.setItem("career_skills", skills);
    localStorage.setItem("career_goal", goal);
    localStorage.setItem("career_stage", stage);

    navigate("/recommendation");
  };

  return (
    <div className="career-container">
      <div className="career-card">

        <div className="career-left">
          <img src={formImg} alt="career" />
        </div>

        <div className="career-right">
          <h2>Career After {stage === "10th" ? "10th" : "Intermediate"}</h2>
          <p>Tell us about your interests and goals</p>

          <form onSubmit={handleSubmit}>

            {/* AI Interest System */}
            <label>Your Interests</label>
            <InterestTags interests={interests} setInterests={setInterests} />

            <input
              type="text"
              placeholder="Your Skills (Eg: Communication, Coding, Design)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />

            <input
              type="text"
              placeholder="Your Career Goal (Eg: Engineer, IAS Officer, Entrepreneur)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />

            <button type="submit">Get Recommendations</button>
          </form>
        </div>

      </div>
    </div>
  );
}
