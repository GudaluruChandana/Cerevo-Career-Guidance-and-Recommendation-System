
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/History.css";

export default function History() {

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");


  // ================= FETCH HISTORY =================
  const fetchHistory = async () => {

    if (!token) {
      navigate("/login");
      return;
    }

    try {

      const res = await fetch("http://localhost:8000/history/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // ✅ ADD HERE
      if (res.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
      
      const data = await res.json();

      if (Array.isArray(data)) {
        setHistory(data);
      }

    } catch (err) {
      console.error("History error:", err);
    }

    setLoading(false);
  };


  useEffect(() => {
    fetchHistory();
  }, []);



  // ================= DELETE ONE =================
  const deleteOne = async (id) => {

    if (!window.confirm("Delete this record?")) return;

    await fetch(`http://localhost:8000/history/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchHistory();
  };



  // ================= CLEAR ALL =================
  const clearAll = async () => {

    if (!window.confirm("Clear ALL history?")) return;

    await fetch("http://localhost:8000/history/clear/all", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchHistory();
  };



  // ================= SEARCH =================
  const filteredHistory = history.filter(item =>
    item.recommended_stream
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  return (

    <div className="history-page">

      <h1>📜 Recommendation History</h1>


      {/* Search + Clear */}
      <div className="history-actions">

        <input
          type="text"
          placeholder="Search career..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="clear-btn"
          onClick={clearAll}
        >
          Clear All
        </button>

      </div>



      {loading ? (

        <p>Loading...</p>

      ) : filteredHistory.length === 0 ? (

        <p>No history found.</p>

      ) : (


        <table className="history-table">

          <thead>
            <tr>
              <th>Date</th>
              <th>Career</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>

            {filteredHistory.map((item) => (

              <tr key={item.id}>

                <td>
                  {new Date(item.timestamp).toLocaleDateString()}
                </td>

                <td>{item.recommended_stream}</td>

                <td>{item.score}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOne(item.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}



      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back
      </button>

    </div>
  );
}
