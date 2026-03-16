import { useParams, useNavigate } from "react-router-dom";

const streamCourses = {
  science: ["MPC", "BiPC", "Polytechnic"],
  commerce: ["MEC", "CEC", "HEC"],
  arts: ["Humanities", "Media Studies", "Law Foundation"],
  diploma: ["Civil Diploma", "Mechanical Diploma", "Electrical Diploma", "Computer Diploma"]
};

export default function Career10thCourses() {
  const { stream } = useParams();
  const navigate = useNavigate();
  const courses = streamCourses[stream];

  if (!courses) return <h2>Courses not found</h2>;

  return (
    <div className="career10-courses">
      <h1>{stream.toUpperCase()} Courses</h1>

      <div className="courses-grid">
        {courses.map(course => (
          <div
            key={course}
            className="course-card"
            onClick={() => navigate(`/career-10th/${stream}/${course.toLowerCase().replace(" ", "-")}`)}
          >
            {course}
            <p>View Career Paths →</p>
          </div>
        ))}
      </div>
    </div>
  );
}
