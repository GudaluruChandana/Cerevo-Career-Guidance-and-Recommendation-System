import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/CareerCourses.css";

const careerData = {
  engineering: ["computer-science","ai-ml","data-science","mechanical","civil","ece","electrical","robotics","cyber-security","software-engineering","aerospace"],
  medical: ["mbbs", "bds", "nursing", "pharmacy","biotechnology","physiotherapy","radiology","public-health","medical-lab-tech"],
  commerce: ["bcom", "ca", "cs", "cma", "bba", "mba","banking-finance","financial-analysis"],
  design: ["ui-ux", "fashion", "graphic","interior","animation","product-design"],
  science: ["physics","chemistry","biotech","mathematics","environmental-science"],
  management: ["bba","mba","analytics","operations-management","marketing-management"],
  law: ["llb","corporate-law","judiciary","criminal-law","cyber-law"],
  arts: ["journalism","psychology","english","sociology","political-science"],
  agriculture: ["agritech","food-tech","horticulture","agronomy"],
  hospitality: ["hotel-management","tourism","culinary-arts","event-management"],
  aviation: ["pilot","cabin-crew","aircraft-maintenance","airport-management"],
  media: ["journalism","film-making","mass-communication","digital-media","broadcasting"],
  architecture: ["urban-design","b-arch","landscape","sustainable-architecture"],
  defence: ["army","navy","air-force","coast-guard"],
  education: ["b-ed","d-ed","m-ed","special-education"]
};

export default function CareerCourses() {
  const { career } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const mode = new URLSearchParams(location.search).get("mode");
  const courses = careerData[career];

  if (!courses) {
    return <h2 style={{ padding: "50px" }}>❌ Courses not found</h2>;
  }

  const handleCourseClick = (course) => {
    // If coming from Popular Career Paths → don't open details
    if (mode === "popular") return;

    // If coming from Explore Courses → open details
    navigate(`/career/${career}/${course}`);
  };

  return (
    <div className="career-page">
      <h1 className="career-title">{career.toUpperCase()} Courses</h1>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <div
            key={index}
            className="course-box"
            onClick={() => handleCourseClick(course)}
          >
            {course.replace("-", " ").toUpperCase()}

            {mode !== "popular" && <p>View Details →</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
