import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLaptopCode,
  FaHeartbeat,
  FaChartLine,
  FaUniversity,
  FaBalanceScale,
  FaFlask,
  FaRocket
} from "react-icons/fa";
import "../styles/CareerAfterInter.css";

export default function CareerAfterInter() {
  const navigate = useNavigate();

  const streams = [
    {
      key: "mpc",
      title: "MPC Stream",
      desc: "Engineering, AI, Data Science, Technology",
      icon: <FaLaptopCode />,
      color: "science"
    },
    {
      key: "bipc",
      title: "BiPC Stream",
      desc: "Medical, Pharmacy, Biotechnology",
      icon: <FaHeartbeat />,
      color: "medical"
    },
    {
      key: "cec",
      title: "CEC Stream",
      desc: "Commerce, Accounting, Management",
      icon: <FaChartLine />,
      color: "commerce"
    },
    {
      key: "mec",
      title: "MEC Stream",
      desc: "Economics, Banking, Finance",
      icon: <FaUniversity />,
      color: "management"
    },
    {
      key: "hec",
      title: "HEC Stream",
      desc: "Law, Journalism, Civil Services",
      icon: <FaBalanceScale />,
      color: "arts"
    },
    {
      key: "pcmb",
      title: "PCMB Stream",
      desc: "Research, Medicine, Engineering",
      icon: <FaFlask />,
      color: "engineering"
    },
  ];

  return (
    <div className="inter-page">

      {/* Hero Section */}
      <div className="inter-hero">
        <h1>Career After Intermediate</h1>
        <p>
          Discover the best degree and career path based on your interests,
          academic performance & goals with AI-powered guidance.
        </p>

        <button
          className="hero-btn"
          onClick={() => navigate("/career-after-inter/recommend")}
        >
          <FaRocket /> Get AI Recommendation
        </button>
      </div>

      {/* Choose Stream */}
      <h2 className="section-title">Choose Your Stream</h2>

      <div className="streams-grid">
        {streams.map((s, i) => (
          <motion.div
            key={i}
            className={`stream-card ${s.color}`}
            whileHover={{ scale: 1.06, y: -12 }}
            transition={{ type: "spring", stiffness: 180 }}
            onClick={() => navigate(`/career-after-inter/${s.key}`)}
          >
            <div className="stream-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <button>Explore Path →</button>
          </motion.div>
        ))}
      </div>

      {/* Benefits */}
      <h2 className="section-title">Why Career Guidance Matters?</h2>

      <div className="benefits-grid">
        <div className="benefit-card">🎯 Right Stream Selection</div>
        <div className="benefit-card">📊 Personalized AI Recommendation</div>
        <div className="benefit-card">🏫 Best Colleges</div>
        <div className="benefit-card">🗺 Clear Roadmap</div>
        <div className="benefit-card">💼 Career Outcomes</div>
      </div>

    </div>
  );
}
