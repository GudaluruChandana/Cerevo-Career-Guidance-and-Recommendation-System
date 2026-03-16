import { useParams, useNavigate } from "react-router-dom";
import "../styles/Career10thStream.css";

const STREAM_DETAILS = {
  science: {
    title: "Science Stream",
    careers: ["Engineering", "Medical", "Research", "AI"],
    subjects: ["MPC", "BiPC", "PCMB"],
    exams: ["JEE", "NEET", "EAMCET"]
  },
  commerce: {
    title: "Commerce Stream",
    careers: ["CA", "MBA", "Banking", "Business"],
    subjects: ["CEC", "MEC"],
    exams: ["CA Foundation", "CPT"]
  },
  arts: {
    title: "Arts Stream",
    careers: ["Law", "Journalism", "IAS"],
    subjects: ["HEC"],
    exams: ["CLAT", "UPSC"]
  },
  polytechnic: {
    title: "Polytechnic",
    careers: ["Technician", "Supervisor"],
    subjects: ["Diploma", "ITI"],
    exams: ["Polytechnic CET"]
  },
  skills: {
    title: "Skill Courses",
    careers: ["Developer", "Designer", "Digital Marketer"],
    subjects: ["Coding", "Design", "Digital"],
    exams: ["Google Certification",
    "NSDC",
    "Coursera Certificate",
    "PMKVY",
    "Private Institute Test"]
  }
};

export default function Career10thStream() {
  const { stream } = useParams();
  const navigate = useNavigate();
  const data = STREAM_DETAILS[stream];

  if (!data) return <h2>Stream not found</h2>;

  return (
    <div className="stream-page">
      <h1>{data.title}</h1>

      <h3>Career Options</h3>
      <ul>
        {data.careers.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <h3>Subjects</h3>
      <div className="tag-grid">
        {data.subjects.map((s, i) => <span key={i}>{s}</span>)}
      </div>

      <h3>Entrance Exams</h3>
      <div className="tag-grid">
        {data.exams.map((e, i) => <span key={i}>{e}</span>)}
      </div>

      <button onClick={() => navigate("/career-after-10th/recommend")}>
        🎯 Get AI Recommendation
      </button>
    </div>
  );
}
