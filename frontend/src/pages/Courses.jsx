import "../styles/Courses.css";
import { useNavigate } from "react-router-dom";

import engineeringImg from "../assets/course1.png";
import medicalImg from "../assets/course2.png";
import designImg from "../assets/course3.png";
import commerceImg from "../assets/commerce.png";
import artsImg from "../assets/arts.png";
import managementImg from "../assets/management.png";
import scienceImg from "../assets/science.png";
import agricultureImg from "../assets/agriculture.png";
import hospitalityImg from "../assets/hospitality.png";
import aviationImg from "../assets/aviation.png";
import lawImg from "../assets/law.png";
import mediaImg from "../assets/media.png";
import educationImg from "../assets/education.png";
import architectureImg from "../assets/architecture.png";
import defenceImg from "../assets/defence.png";

export default function Courses() {
  const navigate = useNavigate();

  const careers = [
    { id: "engineering", title: "Engineering", desc: "Software, AI, Civil, Mechanical", image: engineeringImg },
    { id: "medical", title: "Medical", desc: "MBBS, Nursing, Pharmacy", image: medicalImg },
    { id: "design", title: "Design", desc: "UI/UX, Fashion, Graphic", image: designImg },
    { id: "commerce", title: "Commerce", desc: "B.Com, CA, CS, CMA", image: commerceImg },
    { id: "arts", title: "Arts", desc: "Journalism, Psychology, English", image: artsImg },
    { id: "management", title: "Management", desc: "BBA, MBA, Analytics", image: managementImg },
    { id: "science", title: "Science", desc: "Physics, Chemistry, Biotech", image: scienceImg },
    { id: "agriculture", title: "Agriculture", desc: "AgriTech, Food Tech", image: agricultureImg },
    { id: "hospitality", title: "Hospitality", desc: "Hotel, Tourism", image: hospitalityImg },
    { id: "aviation", title: "Aviation", desc: "Pilot, Cabin Crew", image: aviationImg },
    { id: "law", title: "Law", desc: "LLB, Corporate Law, Judiciary", image: lawImg },
    { id: "media", title: "Media", desc: "Journalism, Broadcasting", image: mediaImg },
    { id: "education", title: "Education", desc: "B.Ed, Teaching", image: educationImg },
    { id: "architecture", title: "Architecture", desc: "Urban Design, Planning", image: architectureImg },
    { id: "defence", title: "Defence", desc: "Indian Army, NDA", image: defenceImg },

  ];

  return (
    <div className="courses-page">
      <h1 className="page-title">Explore Career Courses</h1>

      <div className="courses-grid">
        {careers.map((career) => (
          <div key={career.id} className="course-card">
            <img src={career.image} alt={career.title} />
            <h2>{career.title}</h2>
            <p>{career.desc}</p>

            <button onClick={() => navigate(`/career/${career.id}?mode=explore`)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

