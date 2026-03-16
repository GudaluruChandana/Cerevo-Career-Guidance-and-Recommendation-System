import "../styles/Roadmap.css";

export default function Roadmap() {

  const roadmapSteps = [
    {
      step: "Step 1",
      title: "Choose Your Stream",
      desc: "Select Engineering, Medical, or Design based on your interest."
    },
    {
      step: "Step 2",
      title: "Prepare Entrance Exams",
      desc: "Start preparing for competitive exams with proper guidance."
    },
    {
      step: "Step 3",
      title: "Select College",
      desc: "Choose the best college based on your rank and preference."
    },
    {
      step: "Step 4",
      title: "Build Skills",
      desc: "Develop technical & soft skills for future career success."
    },
    {
      step: "Step 5",
      title: "Get Placed",
      desc: "Secure job or higher education based on your roadmap."
    }
  ];

  const downloadPDF = () => {
    alert("Roadmap PDF downloaded successfully!");
  };

  return (
    <div className="roadmap-page">

      <div className="roadmap-header">
        <h1>Your Career Roadmap</h1>
        <p>Follow this step-by-step guide to achieve your dream career</p>
      </div>

      <img src={roadmapImg} className="roadmap-banner" />

      <div className="timeline">
        {roadmapSteps.map((item, index) => (
          <div className="timeline-card" key={index}>
            <div className="circle">{item.step}</div>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        📄 Download Roadmap PDF
      </button>

    </div>
  );
}
