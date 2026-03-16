export default function LogoutButton() {
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("token");
    localStorage.removeItem("student_name");
    localStorage.removeItem("career10thResults");
    localStorage.removeItem("careerInterResults");

    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "linear-gradient(135deg, #5a4de6, #6f35c6)",

        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "20px",
      }}
    >
      ⏻ Logout
    </button>
  );
}
