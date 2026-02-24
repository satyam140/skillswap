import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    skill: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!user.name || !user.email || !user.password || !user.skill) {
      alert("Please fill all fields");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const userExists = users.some(
      (existingUser) => existingUser.email === user.email
    );

    if (userExists) {
      alert("User already exists with this email");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      password: user.password,
      skill: user.skill
    };

    // Add new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Initialize wallet (50 starting points)
    const wallet = JSON.parse(localStorage.getItem("wallet")) || {};
    wallet[user.name] = 50;
    localStorage.setItem("wallet", JSON.stringify(wallet));

    alert("Registration Successful!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        name="skill"
        placeholder="Your Skill (e.g. Java, Guitar)"
        onChange={handleChange}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;