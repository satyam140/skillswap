import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      alert("No users found. Please register first.");
      return;
    }

    // Find matching user
    const foundUser = users.find(
      (user) =>
        user.email === email.trim() &&
        user.password === password.trim()
    );

    if (!foundUser) {
      alert("Invalid Credentials");
      return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    navigate("/dashboard");
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #2f80ed, #27ae60)",
          color: "white",
          padding: "40px",
          textAlign: "center"
        }}
      >
        <h1>Welcome to SkillSwap</h1>
        <p>Learn. Teach. Grow Together.</p>
      </div>

      {/* Login Card */}
      <div className="auth-container">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <Link className="link" to="/register">
          New User? Register Here
        </Link>
      </div>
    </div>
  );
}

export default Login;