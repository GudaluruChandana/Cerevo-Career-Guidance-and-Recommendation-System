import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import dashboardImg from "../assets/dashboard.png";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";

export default function Dashboard() {

  const navigate = useNavigate();

  // First load from localStorage
  const [userName, setUserName] = useState(
    localStorage.getItem("user_name") || "Student"
  );


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Sync from backend
    fetch("http://localhost:8000/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {

        if (data?.name) {

          setUserName(data.name);

          // Always keep latest name
          localStorage.setItem("user_name", data.name);
        }

      })
      .catch(err => {
        console.error("Profile fetch error:", err);
      });

  }, [navigate]);


  return (

    <div className="dashboard-container">


      {/* ================= HEADER ================= */}
      <div className="dashboard-header">

        <div>

          <h1>Welcome, {userName} 👋</h1>

          <p>Your personalized AI career companion</p>

        </div>


        <div className="header-right">

          <ProfileMenu />

          <img src={dashboardImg} alt="dashboard" />

        </div>

      </div>



      {/* ================= MAIN CARDS ================= */}
      <div className="dashboard-cards">


        {/* After 10th */}
        <div
          className="card"
          onClick={() => navigate("/career-10th")}
        >

          <div className="card-icon">🎓</div>

          <h3>Career After 10th</h3>

          <p>Explore courses & streams after 10th class</p>

        </div>



        {/* After Inter */}
        <div
          className="card"
          onClick={() => navigate("/career-after-inter")}
        >

          <div className="card-icon">📘</div>

          <h3>Career After Intermediate</h3>

          <p>Find best degree & career options after Inter</p>

        </div>



        {/* AI Mentor */}
        <div
          className="card"
          onClick={() => navigate("/assistant")}
        >

          <div className="card-icon">🤖</div>

          <h3>AI Assistant</h3>

          <p>Ask questions & get instant guidance</p>

        </div>

      </div>



      {/* ================= POPULAR ================= */}
      <h2 className="section-title">Popular Career Paths</h2>


      <div className="popular-grid">

        {popularCard("⚙", "Engineering", "Technology & Innovation", "/career/engineering", "engineering")}
        {popularCard("🩺", "Medical", "Healthcare & Life Science", "/career/medical", "medical")}
        {popularCard("⚖", "Law", "Justice & Legal Careers", "/career/law", "law")}
        {popularCard("🎨", "Design", "Creative Industries", "/career/design", "design")}
        {popularCard("💼", "Commerce", "Business & Finance", "/career/commerce", "commerce")}
        {popularCard("🎭", "Arts", "Humanities & Media", "/career/arts", "arts")}
        {popularCard("📊", "Management", "Leadership & Strategy", "/career/management", "management")}
        {popularCard("🔬", "Science", "Research & Innovation", "/career/science", "science")}
        {popularCard("🌾", "Agriculture", "Farming & AgriTech", "/career/agriculture", "agriculture")}
        {popularCard("🏨", "Hospitality", "Hotels & Tourism", "/career/hospitality", "hospitality")}
        {popularCard("✈", "Aviation", "Pilots & Airlines", "/career/aviation", "aviation")}
        {popularCard("🪖", "Defence", "Army, Navy & Airforce", "/career/defence", "defence")}
        {popularCard("🎬", "Media", "Film & Journalism", "/career/media", "media")}
        {popularCard("🎓", "Education", "Teaching & Research", "/career/education", "education")}
        {popularCard("🏛", "Architecture", "Urban & Building Design", "/career/architecture", "architecture")}

      </div>



      {/* ================= ACTION BUTTONS ================= */}

      <button
        className="explore-btn"
        onClick={() => navigate("/courses")}
      >
        🚀 Explore Courses
      </button>


      {/* <button
        className="voice-btn"
        onClick={() => navigate("/voice")}
      >
        🎤 Voice Assistant
      </button> */}


    </div>
  );


  // ================= Helper =================
  function popularCard(icon, title, desc, path, colorClass) {

  return (

    <div
      className={`popular-card ${colorClass}`}
      onClick={() => navigate(path + "?mode=popular")}
    >

      <span>{icon}</span>

      <h3>{title}</h3>

      <p>{desc}</p>

    </div>
  );
}


}
