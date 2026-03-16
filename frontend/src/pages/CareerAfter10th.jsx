import { useNavigate } from "react-router-dom";
import "../styles/CareerAfter10th.css";

export default function CareerAfter10th() {
  const navigate = useNavigate();

  const streams = [
    {
      id: "science",
      title: "Science Stream",
      desc: "Engineering, Medical, Research, AI",
      tags: ["MPC", "BIPC", "PCMB"],
      careers: ["Doctor", "Engineer", "Scientist"],
      color: "blue"
    },
    {
      id: "commerce",
      title: "Commerce Stream",
      desc: "Business, Finance, Accounting",
      tags: ["CEC", "MEC"],
      careers: ["CA", "MBA", "Banker"],
      color: "green"
    },
    {
      id: "arts",
      title: "Arts Stream",
      desc: "Law, Journalism, Civil Services",
      tags: ["HEC"],
      careers: ["Lawyer", "Journalist", "IAS"],
      color: "purple"
    },
    {
      id: "polytechnic",
      title: "Polytechnic",
      desc: "Technical diploma courses",
      tags: ["Diploma", "ITI"],
      careers: ["Technician", "Supervisor"],
      color: "orange"
    },
    {
      id: "skills",
      title: "Skill Courses",
      desc: "Job-ready certifications",
      tags: ["Digital", "Coding", "Design"],
      careers: ["Developer", "Designer"],
      color: "pink"
    }
  ];
  
  return (
    <div className="career10-container">

      {/* Hero */}
      <div className="career10-hero">
        <h1>Career After 10th</h1>
        <p>
          Discover the best career path based on your interests, skills & goals.
          Start your journey with AI-powered guidance.
        </p>

        <button
          className="recommend-btn"
          onClick={() => navigate("/career-after-10th/recommend")}
        >
          🎯 Get AI Recommendation
        </button>
      </div>

      {/* Streams */}
      <div className="streams-section">
        <h2>Choose Your Stream</h2>

        <div className="streams-grid">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className={`stream-card ${stream.color}`}
              onClick={() => navigate(`/career-after-10th/${stream.id}`)}
            >
              <h3>{stream.title}</h3>
              <p>{stream.desc}</p>

              <div className="stream-tags">
                {stream.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>

              {/* <div className="stream-careers">
                {stream.careers.map((career, i) => (
                  <span key={i}>🎯 {career}</span>
                ))}
              </div> */}

              <button>Explore Path →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Section */}
      <div className="why-section">
        <h2>Why Career Guidance Matters?</h2>

        <div className="why-grid">
          <div className="why-card">🎓 Right Stream Selection</div>
          <div className="why-card">📊 Personalized Recommendation</div>
          <div className="why-card">🏫 Best Colleges</div>
          <div className="why-card">🧭 Clear Roadmap</div>
          <div className="why-card">💼 Career Outcomes</div>
        </div>
      </div>

    </div>
  );
}
