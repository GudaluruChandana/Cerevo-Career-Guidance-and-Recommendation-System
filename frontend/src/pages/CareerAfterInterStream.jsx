import { useParams, useNavigate } from "react-router-dom";
import "../styles/CareerAfterInterStream.css";

export default function CareerAfterInterStream() {
  const { stream } = useParams();
  const navigate = useNavigate();

  const streamData = {
    mpc: {
      title: "MPC Stream Careers",
      courses: ["B.Tech", "B.Sc Data Science", "AI & ML", "Robotics", "Cyber Security"],
      careers: ["Software Engineer", "AI Engineer", "Data Scientist", "Robotics Engineer"],
      exams: ["JEE", "BITSAT", "VITEEE"]
    },
    bipc: {
      title: "BiPC Stream Careers",
      courses: ["MBBS", "BDS", "B.Pharmacy", "Biotech", "B.Sc Nursing"],
      careers: ["Doctor", "Pharmacist", "Biotech Scientist"],
      exams: ["NEET", "AIIMS"]
    },
    cec: {
      title: "CEC Stream Careers",
      courses: ["B.Com", "BBA", "CA", "CS", "CMA"],
      careers: ["Chartered Accountant", "Business Analyst", "MBA"],
      exams: ["CA Foundation", "IPMAT"]
    },
    mec: {
      title: "MEC Stream Careers",
      courses: ["B.A Economics", "B.Com", "MBA", "Banking"],
      careers: ["Economist", "Banker", "Financial Analyst"],
      exams: ["CUET", "IBPS"]
    },
    hec: {
      title: "HEC Stream Careers",
      courses: ["LLB", "BA Journalism", "Civil Services"],
      careers: ["Lawyer", "Journalist", "IAS Officer"],
      exams: ["CLAT", "UPSC"]
    },
    pcmb: {
      title: "PCMB Stream Careers",
      courses: ["MBBS", "B.Tech", "Research", "Biotech"],
      careers: ["Doctor", "Scientist", "Research Engineer"],
      exams: ["NEET", "JEE"]
    }
  };

  const data = streamData[stream];

  if (!data) return <h2>Stream not found</h2>;

  return (
    <div className="inter-stream-page">

      <h1>{data.title}</h1>

      <div className="inter-stream-section">
        <h2>🎓 Popular Courses</h2>
        <div className="pill-grid">
          {data.courses.map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <div className="inter-stream-section">
        <h2>💼 Career Options</h2>
        <div className="pill-grid">
          {data.careers.map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <div className="inter-stream-section">
        <h2>📝 Entrance Exams</h2>
        <div className="pill-grid">
          {data.exams.map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <button className="ai-btn" onClick={() => navigate("/career-after-inter/recommend")}>
        🎯 Get AI Recommendation
      </button>

    </div>
  );
}
