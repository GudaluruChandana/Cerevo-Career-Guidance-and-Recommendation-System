import "../styles/Recommendation.css";
import course1 from "../assets/course1.png";
import course2 from "../assets/course2.png";
import course3 from "../assets/course3.png";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
  const navigate = useNavigate();

  // Dummy recommended courses (later backend will replace)
  const courses = [
    {
      title: "Engineering",
      desc: "Build technology and shape the future",
      image: course1
    },
    {
      title: "Medical",
      desc: "Heal people and save lives",
      image: course2
    },
    {
      title: "Design",
      desc: "Create beautiful and useful products",
      image: course3
    }
  ];

  return (
    <div className="recommend-container">

      <h1>Your AI Career Recommendations 🎯</h1>
      <p>Based on your interests and goals</p>

      <div className="course-grid">
        {courses.map((course, index) => (
          <div
            key={index}
            className="course-card"
            onClick={() => navigate(`/course/${course.title.toLowerCase()}`)}

          >
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
