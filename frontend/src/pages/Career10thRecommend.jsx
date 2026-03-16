import { useState,useEffect} from "react";
import "../styles/Career10thRecommend.css";
import careerImg from "../assets/career-illustration.png";


export default function Career10thRecommend() {
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login to continue");
    window.location.href = "/login";
  }
}, []);

  const [percentage, setPercentage] = useState(70);
  const [subjects, setSubjects] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState(100000);
  const [goal, setGoal] = useState("balanced");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const subjectOptions = ["Mathematics", "Biology", "Physics", "Chemistry", "Computers", "Commerce", "Arts"];
  const strengthOptions = ["Problem Solving", "Practical Work", "Creativity", "Technology", "Analysis", "Communication"];

  const citySuggestions = [
    "Bangalore","Hyderabad","Chennai","Mumbai","Delhi","Pune","Kolkata",
    "Coimbatore","Vijayawada","Vizag","Guntur","Tirupati","Warangal",
    "Trichy","Madurai","Salem","Erode","Nellore","Kurnool",
    "Anantapur","Kadapa","Rajahmundry","Eluru","Ongole"
  ];

  const filteredCities = citySuggestions.filter(c =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  const toggleItem = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter(i => i !== value));
    } else {
      setList([...list, value]);
    }
  };

  const addCustomInterest = () => {
  if (!customInterest.trim()) return;

  if (!subjects.includes(customInterest) && !strengths.includes(customInterest)) {
    setSubjects(prev => [...prev, customInterest]);
  }

  setCustomInterest("");
};

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again.");
      return;
    }

    const payload = {
      stage: "after10th",
      marks: Number(percentage),
      interests: [...subjects, ...strengths, customInterest].filter(Boolean),
      location: city,
      budget: Number(budget),
      ambition: goal,
      top_n: 3
    };

    const res = await fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json",
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
      localStorage.setItem("career10thResults", JSON.stringify(data.results));
      window.location.href = "/career-after-10th/results";
    } else {
      alert("No recommendations found");
    }
  };

  const handleExploreAll = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login again.");
    return;
  }

  const payload = {
    stage: "after10th",
    marks: Number(percentage),
    interests: [...subjects, ...strengths].filter(Boolean),
    location: city,
    budget: Number(budget),
    ambition: goal,
    top_n: 3,
    view_all: true
  };

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
    localStorage.setItem("career10thResults", JSON.stringify(data.results));
    window.location.href = "/career-after-10th/results";
  } else {
    alert("No recommendations found");
  }
};

  return (
    <div className="form-page">
      <div className="form-container">

        <div className="form-left">
          <img src={careerImg} alt="Career Guidance" />
        </div>

        <div className="form-right">
          <h1>Career After 10th Guidance</h1>

          <label>10th Percentage: {percentage}%</label>
          <input type="range" min="35" max="100" value={percentage}
            onChange={e => setPercentage(e.target.value)} />

          <h3>Subjects You Like</h3>
          <div className="chip-group">
            {subjectOptions.map(s => (
              <span key={s}
                className={subjects.includes(s) ? "chip active" : "chip"}
                onClick={() => toggleItem(s, subjects, setSubjects)}>
                {s}
              </span>
            ))}
          </div>

          <h3>Your Strengths</h3>
          <div className="chip-group">
            {strengthOptions.map(s => (
              <span key={s}
                className={strengths.includes(s) ? "chip active" : "chip"}
                onClick={() => toggleItem(s, strengths, setStrengths)}>
                {s}
              </span>
            ))}
          </div>

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

          {/* Show Selected Custom Interests */}
          {customInterest.length === 0 && subjects.length > 0 && (
            <div className="selected-interests">
              <h4>Selected Interests</h4>
              <div className="chip-group">
                {subjects.map(i => (
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
          <input type="number" value={budget}
            onChange={e => setBudget(e.target.value)} />

          <h3>Career Approach</h3>
          <select value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="safe">Safe</option>
            <option value="balanced">Balanced</option>
            <option value="ambitious">Ambitious</option>
          </select>

          <button onClick={handleSubmit}>🚀 Get My Career Roadmap</button>
          {/* <button className="view-all-btn" onClick={handleViewAll}>
            🔍 Explore All Career Recommendation Options
          </button> */}
          <button className="explore-btn" onClick={handleExploreAll}>
          🔍 Explore All Career Recommendations
        </button>


        </div>
      </div>
    </div>

  );
}
