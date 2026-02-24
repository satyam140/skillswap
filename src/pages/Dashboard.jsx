import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SkillList from "../components/SkillList";
import Loader from "../components/Loader";   // ✅ Import Loader

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);  // ✅ Loading state

  // ✅ Reload wallet points
  const loadPoints = (username) => {
    const wallet = JSON.parse(localStorage.getItem("wallet")) || {};
    setPoints(wallet[username] || 0);
  };

  // ✅ Handle wallet changes
  const handleStorageChange = () => {
    const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (updatedUser) {
      loadPoints(updatedUser.name);
    }
  };

  // ✅ Load user + wallet
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!storedUser) {
      navigate("/");
      return;
    }

    setUser(storedUser);
    loadPoints(storedUser.name);

    // Professional loading delay
    setTimeout(() => {
      setLoading(false);
    }, 800);

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // ✅ Show Loader First
  if (loading) return <Loader />;

  // ✅ Safety Check
  if (!user) return null;

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">SkillSwap Platform</div>

        <div className="nav-right">
          <span className="points">⭐ {points} Points</span>

          <Link className="link-btn" to="/leaderboard">
            Leaderboard
          </Link>

          <Link className="link-btn" to="/my-bookings">
            My Bookings
          </Link>

          <Link className="link-btn" to="/earnings">
            Earnings
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="container">
        <div className="dashboard-header">
          <h2>Welcome, {user.name}</h2>

          <button
            className="primary-btn"
            onClick={() => navigate("/post-skill")}
          >
            + Post Skill
          </button>
        </div>

        {/* Skill List */}
        <SkillList currentUser={user.name} />

        <div style={{ marginTop: "30px" }}>
          <button className="danger-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer>
        © 2026 SkillSwap | Built for Hackathon 🚀
      </footer>
    </div>
  );
}

export default Dashboard;