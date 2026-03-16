import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const name =
    localStorage.getItem("user_name") ||
    localStorage.getItem("email") ||
    "Student";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ position: "relative" }}>

      {/* Profile Circle */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          // background: "linear-gradient(135deg, #6a5acd, #836fff)",
          background: "linear-gradient(135deg, #eaebf0, #f2eff6)",
          color: "purple",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "21px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "55px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            overflow: "hidden",
            width: "200px",
            zIndex: 9999
          }}
        >

          {/* Name Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",              color: "white",
              padding: "12px",
              fontWeight: "600",
              textAlign: "center"
            }}
          >
            {name}
          </div>

          {/* Profile */}
          <div
            onClick={() => navigate("/profile")}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#1e293b",        // DARK text
              fontWeight: "600",
              borderBottom: "1px solid #e5e7eb" // separator
            }}
            onMouseOver={(e) => (e.target.style.background = "#eef2ff")}
            onMouseOut={(e) => (e.target.style.background = "white")}
          >
            👤 My Profile
          </div>
          <div
            onClick={() => navigate("/history")}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#1e293b",
              fontWeight: "600",
              borderBottom: "1px solid #e5e7eb"
            }}
            onMouseOver={(e) => (e.target.style.background = "#fff1f2")}
            onMouseOut={(e) => (e.target.style.background = "white")}
          >
            📊 My History
          </div>


          {/* Logout */}
          <div
            onClick={logout}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#e11d48",
              fontWeight: "600"
            }}
            onMouseOver={(e) => (e.target.style.background = "#fff1f2")}
            onMouseOut={(e) => (e.target.style.background = "white")}
          >
            ⏻ Logout
          </div>

        </div>
      )}

    </div>
  );
}
