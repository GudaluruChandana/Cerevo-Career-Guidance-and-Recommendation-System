import { useState,useEffect } from "react";
import "../styles/CareerInterRecommend.css";
import careerImg from "../assets/inter-form.png";

export default function CareerInterRecommend() {

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to continue");
      window.location.href = "/login";
    }
  }, []);
  
  const [percentage, setPercentage] = useState(70);
  const [interests, setInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState(150000);
  const [goal, setGoal] = useState("balanced");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const interestOptions = [
    "Artificial Intelligence","Machine Learning","Data Science","Cyber Security",
    "Web Development","Robotics","Biotechnology","Medicine","Finance",
    "Business Management","Law","Journalism","Economics","Stock Market",
    "Cloud Computing","Blockchain","UI/UX Design","Game Development",
    "Politics","Automation","Mechanical Design","Space","Research",
    "Physics","Civil Services","Architecture","Design"
  ];

  const citySuggestions = [
    "Bangalore","Hyderabad","Chennai","Mumbai","Delhi","Pune","Kolkata",
    "Coimbatore","Vijayawada","Vizag","Guntur","Tirupati","Warangal",
    "Trichy","Madurai","Salem","Erode","Nellore","Kurnool",
    "Anantapur","Kadapa","Rajahmundry","Eluru","Ongole"
  ];

  const filteredCities = citySuggestions.filter(c =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const toggleInterest = (value) => {
    if (interests.includes(value)) {
      setInterests(interests.filter(i => i !== value));
    } else {
      setInterests([...interests, value]);
    }
  };

  // ✅ FIXED Custom Interest Logic
  const addCustomInterest = () => {
    if (!customInterest.trim()) return;

    if (!interests.includes(customInterest)) {
      setInterests(prev => [...prev, customInterest]);
    }

    setCustomInterest("");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    if (interests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }

    if (!city) {
      alert("Please enter preferred city.");
      return;
    }

    const payload = {
      stage: "after12th",
      marks: Number(percentage),
      interests,
      location: city,
      budget: Number(budget),
      ambition: goal,
      top_n: 3
    };

    try {
      const res = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(payload)
      });

      // ✅ ADD HERE
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();

      if (data?.results?.length) {
        localStorage.setItem("careerInterResults", JSON.stringify(data.results));
        window.location.href = "/career-after-inter/results";
      } else {
        alert("No recommendations found");
      }

    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  const handleViewAll = async () => {
  const token = localStorage.getItem("token");

  const payload = {
    stage: "after12th",
    marks: Number(percentage),
    interests,
    location: city,
    budget: Number(budget),
    ambition: goal,
    top_n: 3,
    view_all: true   // 🔥 NEW FLAG
  };

  try {
    const res = await fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(payload)
    });

    // ✅ ADD HERE
    if (res.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const data = await res.json();

    if (data?.results?.length) {
      localStorage.setItem("careerInterResults", JSON.stringify(data.results));
      window.location.href = "/career-after-inter/results";
    } else {
      alert("No recommendations found");
    }

  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
};


  return (
    <div className="form-page">
      <div className="form-container">

        <div className="form-left">
          <img src={careerImg} alt="Career Guidance" />
        </div>

        <div className="form-right">
          <h1>Career After Intermediate Guidance</h1>

          <label>Inter Percentage: {percentage}%</label>
          <input
            type="range"
            min="40"
            max="100"
            value={percentage}
            onChange={e => setPercentage(Number(e.target.value))}
          />

          <h3>Select Your Interests</h3>
          <div className="chip-group">
            {interestOptions.map(i => (
              <span key={i}
                className={interests.includes(i) ? "chip active" : "chip"}
                onClick={() => toggleInterest(i)}>
                {i}
              </span>
            ))}
          </div>

          {/* ✅ Custom Interest Box */}
          <h3>Add Custom Interest</h3>
          <div className="custom-interest-box">
            <input
              type="text"
              placeholder="Eg: Space, Politics"
              value={customInterest}
              onChange={e => setCustomInterest(e.target.value)}
            />
            <button type="button" onClick={addCustomInterest}>
              Add Interest
            </button>
          </div>

          {/* ✅ Visible Selected Interests */}
          {interests.length > 0 && (
            <div className="selected-interests">
              <h4>Selected Interests</h4>
              <div className="chip-group">
                {interests.map(i => (
                  <span key={i} className="chip active">{i}</span>
                ))}
              </div>
            </div>
          )}

          <h3>Preferred City</h3>
          <div className="city-autocomplete">
            <input
              type="text"
              placeholder="Type your city"
              value={city}
              onChange={e => {
                setCity(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />

            {showSuggestions && city && (
              <div className="suggestions-box">
                {filteredCities.map(c => (
                  <div key={c}
                    className="suggestion-item"
                    onClick={() => {
                      setCity(c);
                      setShowSuggestions(false);
                    }}>
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          <h3>Maximum Budget (₹)</h3>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
          />

          <h3>Career Approach</h3>
          <select value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="safe">Safe</option>
            <option value="balanced">Balanced</option>
            <option value="ambitious">Ambitious</option>
          </select>

          <button onClick={handleSubmit}>
            🚀 Get My Career Roadmap
          </button>
          <button className="view-all-btn" onClick={handleViewAll}>
            🔍 Explore All Career Recommendation Options
          </button>

        </div>
      </div>
    </div>
  );
}
