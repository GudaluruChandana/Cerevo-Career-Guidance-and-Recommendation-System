// import "../styles/CareerInterResults.css";

// export default function CareerInterResults() {
//   const rawResults = JSON.parse(localStorage.getItem("careerInterResults")) || [];
//   const studentName = localStorage.getItem("student_name") || "Student";

//   const downloadRoadmap = async (item) => {
//     const payload = { ...item, student_name: studentName };

//     try {
//       const res = await fetch("http://localhost:8000/download-roadmap", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         alert("Failed to generate roadmap. Please try again.");
//         return;
//       }

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${item.career_path.replace(/\s+/g, "_")}_Roadmap.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Server error while downloading roadmap.");
//     }
//   };

//   if (!Array.isArray(rawResults) || rawResults.length === 0) {
//     return (
//       <div className="inter-results-page">
//         <h2>No recommendations found. Please try again.</h2>
//       </div>
//     );
//   }

//   // ✅ Remove duplicate career paths
//   const results = Array.from(
//     new Map(rawResults.map(item => [item.career_path, item])).values()
//   );
// const getSalaryWidth = (salaryString) => {
//   if (!salaryString) return 40;

//   const numbers = salaryString.match(/\d+/g);
//   if (!numbers) return 40;

//   const value = parseInt(numbers[0]);

//   if (value <= 5) return 40;
//   if (value <= 10) return 55;
//   if (value <= 20) return 70;
//   if (value <= 30) return 85;
//   return 95;
// };

//   return (
//     <div className="inter-results-page">
//       <h1 className="results-title">🎯 Your AI Career Recommendations</h1>

//       <div className="results-grid">
//         {results.map((item, index) => (
//           <div className="career-card" key={index}>

//             <h2 className="career-title">{item.career_path}</h2>

//             <div className="confidence-badge">
//               {item.confidence_label || "Good Match"}
//             </div>

//             <div className="score-bar">
//               <div
//                 className="score-fill"
//                 style={{ width: item.recommendation_score || "70%" }}
//               >
//                 {item.recommendation_score || "70%"}
//               </div>
//             </div>

//             <div className="confidence-message">
//               <p>{item.confidence_message}</p>
//               <p className="confidence-advice">{item.confidence_advice}</p>
//             </div>

//             <div className="card-section">
//               <h3>🎯 Career Outcomes</h3>
//               <ul>
//                 {(item.career_outcomes || []).map((c, i) => (
//                   <li key={i}>{c}</li>
//                 ))}
//               </ul>
//             </div>
//             {/* 💰 Salary Section */}
//             {/* {item.salary && (
//               <div className="card-section">
//                 <h3>💰 Salary Range</h3>
//                 <p><strong>Entry:</strong> {item.salary.entry}</p>
//                 <p><strong>Mid:</strong> {item.salary.mid}</p>
//                 <p><strong>Senior:</strong> {item.salary.senior}</p>
//               </div>
//             )} */}
//             {/* Salary Growth */}
//             {/* Salary Growth */}
//             {item.salary && (
//               <div className="card-section salary-growth-section">
//                 <h3>📊 Salary Growth</h3>

//                 {/* Entry */}
//                 <div className="salary-row">
//                   <div className="salary-label">Entry</div>
//                   <div className="salary-bar-wrapper">
//                     <div
//                       className="salary-bar"
//                       style={{
//                         width: `${getSalaryWidth(item.salary.entry)}%`,
//                         background: "linear-gradient(90deg, #4CAF50, #81C784)"
//                       }}
//                     ></div>
//                   </div>
//                   <div className="salary-value">{item.salary.entry}</div>
//                 </div>

//                 {/* Mid */}
//                 <div className="salary-row">
//                   <div className="salary-label">Mid</div>
//                   <div className="salary-bar-wrapper">
//                     <div
//                       className="salary-bar"
//                       style={{
//                         width: `${getSalaryWidth(item.salary.mid)}%`,
//                         background: "linear-gradient(90deg, #2196F3, #64B5F6)"
//                       }}
//                     ></div>
//                   </div>
//                   <div className="salary-value">{item.salary.mid}</div>
//                 </div>

//                 {/* Senior */}
//                 <div className="salary-row">
//                   <div className="salary-label">Senior</div>
//                   <div className="salary-bar-wrapper">
//                     <div
//                       className="salary-bar"
//                       style={{
//                         width: `${getSalaryWidth(item.salary.senior)}%`,
//                         background: "linear-gradient(90deg, #FF9800, #FFB74D)"
//                       }}
//                     ></div>
//                   </div>
//                   <div className="salary-value">{item.salary.senior}</div>
//                 </div>
//               </div>
//             )}






//             <div className="card-section">
//               <h3>🏫 Top Colleges</h3>
//               <div className="college-list">
//                 {(item.colleges || []).slice(0, 4).map((c, i) => (
//                   <span key={i} className="college-chip">
//                     {c.college_name || c}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div className="card-section">
//               <h3>🗺 Roadmap</h3>
//               <ol>
//                 {(item.roadmap || []).map((step, i) => (
//                   <li key={i}>{step}</li>
//                 ))}
//               </ol>
//             </div>

//             <div className="card-section">
//               <h3>📝 Entrance Exams</h3>
//               <p>{(item.entrance_exams || []).join(", ")}</p>
//             </div>

//             <div className="card-section">
//               <h3>🔁 Backup Options</h3>
//               <p>{(item.backup_options || []).join(", ")}</p>
//             </div>

//             <button
//               className="download-btn"
//               onClick={() => downloadRoadmap(item)}
//             >
//               📥 Download Career Roadmap
//             </button>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import "../styles/CareerInterResults.css";

export default function CareerInterResults() {
  const rawResults =
    JSON.parse(localStorage.getItem("careerInterResults")) || [];

  const studentName = localStorage.getItem("student_name") || "Student";

  const downloadRoadmap = async (item) => {
    const payload = { ...item, student_name: studentName };

    try {
      const res = await fetch("http://localhost:8000/download-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Failed to generate roadmap. Please try again.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.career_path.replace(/\s+/g, "_")}_Roadmap.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Server error while downloading roadmap.");
    }
  };

  if (!Array.isArray(rawResults) || rawResults.length === 0) {
    return (
      <div className="inter-results-page">
        <h2>No recommendations found. Please try again.</h2>
      </div>
    );
  }

  // remove duplicates
  const results = Array.from(
    new Map(rawResults.map((item) => [item.career_path, item])).values()
  );

  const getSalaryWidth = (salaryString) => {
    if (!salaryString) return 40;

    const numbers = salaryString.match(/\d+/g);
    if (!numbers) return 40;

    const value = parseInt(numbers[0]);

    if (value <= 5) return 40;
    if (value <= 10) return 55;
    if (value <= 20) return 70;
    if (value <= 30) return 85;
    return 95;
  };

  return (
    <div className="inter-results-page">
      <h1 className="results-title">🎯 Your AI Career Recommendations</h1>

      <div className="results-grid">
        {results.map((item, index) => (
          <div className="career-card" key={index}>

            <h2 className="career-title">{item.career_path}</h2>

            <div className="confidence-badge">
              {item.confidence_label || "Good Match"}
            </div>

            <div className="score-bar">
              <div
                className="score-fill"
                style={{ width: item.recommendation_score || "70%" }}
              >
                {item.recommendation_score || "70%"}
              </div>
            </div>

            <div className="confidence-message">
              <p>{item.confidence_message}</p>
              <p className="confidence-advice">{item.confidence_advice}</p>
            </div>
            {/* {item.ml_predicted_domain && (
              <div className="card-section ml-prediction">
                <h3>🤖 AI Prediction</h3>
                <p>
                  <strong>Domain:</strong> {item.ml_predicted_domain}
                </p>
                <p>
                  <strong>Confidence:</strong> {item.ml_confidence}%
                </p>
              </div>
            )} */}

            {/* Career Outcomes */}
            <div className="card-section">
              <h3>🎯 Career Outcomes</h3>
              <ul>
                {(item.career_outcomes || []).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Salary Growth ONLY (no duplicate salary range) */}
            {item.salary && (
              <div className="card-section salary-growth-section">
                <h3>📊 Salary Growth</h3>

                {["entry", "mid", "senior"].map((level) => (
                  <div className="salary-row" key={level}>
                    <div className="salary-label">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </div>

                    <div className="salary-bar-wrapper">
                      <div
                        className="salary-bar"
                        style={{
                          width: `${getSalaryWidth(item.salary[level])}%`,
                        }}
                      ></div>
                    </div>

                    <div className="salary-value">
                      {item.salary[level]}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Top Colleges */}
            <div className="card-section">
              <h3>🏫 Top Colleges</h3>
              <div className="college-list">
                {(item.colleges || []).length > 0 ? (
                  item.colleges.slice(0, 4).map((c, i) => (
                    <span key={i} className="college-chip">
                      {c.college_name || c.name || c || "College"}
                    </span>
                  ))
                ) : (
                  <p>No colleges available</p>
                )}
              </div>
            </div>

            {/* Roadmap */}
            <div className="card-section">
              <h3>🗺 Roadmap</h3>
              <ol>
                {(item.roadmap || []).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Entrance Exams */}
            <div className="card-section">
              <h3>📝 Entrance Exams</h3>
              <p>
                {(item.entrance_exams || []).join(", ") || "Not required"}
              </p>
            </div>

            {/* Backup Options */}
            <div className="card-section">
              <h3>🔁 Backup Options</h3>
              <p>{(item.backup_options || []).join(", ")}</p>
            </div>

            <button
              className="download-btn"
              onClick={() => downloadRoadmap(item)}
            >
              📥 Download Career Roadmap
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}