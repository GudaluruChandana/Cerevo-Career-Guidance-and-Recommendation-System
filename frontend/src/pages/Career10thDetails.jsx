import { useParams } from "react-router-dom";

const career10Details = {
  science: {
    mpc: {
      title: "MPC (Maths, Physics, Chemistry)",
      overview: "Best for Engineering, Architecture, Defence and Research.",
      salary: "₹5 – 40 LPA",
      careers: ["Engineer", "Scientist", "Pilot", "Defence Officer"],
      roadmap: ["Intermediate MPC", "Entrance Exams", "Degree", "Job"]
    },
    bipc: {
      title: "BiPC (Biology)",
      overview: "Best for Medical, Pharmacy, Biotechnology.",
      salary: "₹6 – 50 LPA",
      careers: ["Doctor", "Pharmacist", "Biotech Engineer"],
      roadmap: ["Intermediate BiPC", "NEET", "Degree", "Hospital / Research"]
    }
  }
};

export default function Career10thDetails() {
  const { stream, course } = useParams();
  const data = career10Details[stream]?.[course];

  if (!data) return <h2>Career not found</h2>;

  return (
    <div className="career10-details">
      <h1>{data.title}</h1>
      <p>{data.overview}</p>

      <h3>Career Options</h3>
      <ul>
        {data.careers.map(c => <li key={c}>{c}</li>)}
      </ul>

      <h3>Average Salary</h3>
      <p>{data.salary}</p>

      <h3>Roadmap</h3>
      <ol>
        {data.roadmap.map(step => <li key={step}>{step}</li>)}
      </ol>
    </div>
  );
}
