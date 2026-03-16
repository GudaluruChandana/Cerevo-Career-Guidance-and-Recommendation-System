import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    stage: "",
    stream: "",
    location: "",
    college: "",
    year: ""
  });

  const [editMode, setEditMode] = useState(false);

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/profile/me", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.name) {
          setProfile(data);

          localStorage.setItem("user_name", data.name);
          localStorage.setItem("user_email", data.email);
        }
      })
      .catch(err => console.log("Profile load error:", err));
  }, [navigate]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const saveProfile = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/profile/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(() => {
        alert("Profile saved successfully ✅");
        setEditMode(false);
      })
      .catch(err => {
        console.log("Save error:", err);
        alert("Save failed ❌");
      });
  };

  return (
    <div className="profile-page">

      <div className="profile-box">

        {/* LEFT SIDE */}
        <div className="profile-left">

          <div className="profile-avatar-lg">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h2>{profile.name || "Student"}</h2>
          <p>{profile.email || "No Email"}</p>

          <button
            className="edit-btn"
            onClick={() => setEditMode(!editMode)}
          >
            ✏ Edit Profile
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

          <h3>Profile Details</h3>

          {renderField("📞 Phone", "phone")}
          {renderField("🎯 Stage (10th/Inter/Degree)", "stage")}
          {renderField("🎓 Stream", "stream")}
          {renderField("📍 Location", "location")}
          {renderField("🏫 College (Optional)", "college")}
          {renderField("📅 Passing Year (Optional)", "year")}

          {editMode && (
            <button
              className="save-btn"
              onClick={saveProfile}
            >
              💾 Save
            </button>
          )}

          <button
            className="back-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>

      </div>

    </div>
  );

  // =========================
  // FIELD RENDER
  // =========================
  function renderField(label, name) {
    return (
      <div className="profile-field">

        <span>{label}</span>

        {editMode ? (
          <input
            name={name}
            value={profile[name] || ""}
            onChange={handleChange}
          />
        ) : (
          <p>{profile[name] || "Not Added"}</p>
        )}

      </div>
    );
  }
}
