import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { earnPoints } from "../utils/wallet";

function PostSkill() {
  const navigate = useNavigate();

  const [skill, setSkill] = useState({
    title: "",
    description: "",
    category: "",
    points: ""
  });

  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!skill.title || !skill.description || !skill.category || !skill.points) {
      alert("Please fill all fields");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please login first");
      navigate("/");
      return;
    }

    // 🔥 IMPORTANT FIX → use name not username
    const newSkill = {
      id: Date.now(),
      title: skill.title,
      description: skill.description,
      category: skill.category,
      points: Number(skill.points),
      teacher: currentUser.name
    };

    const existingSkills = JSON.parse(localStorage.getItem("skills")) || [];
    localStorage.setItem("skills", JSON.stringify([...existingSkills, newSkill]));

    // reward teacher
    earnPoints(currentUser.name, 10);

    alert("Skill Posted Successfully! +10 Points Earned 🎉");

    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <h2>Post Your Skill</h2>

      <input
        name="title"
        placeholder="Skill Title"
        value={skill.title}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category (Tech, Music, etc.)"
        value={skill.category}
        onChange={handleChange}
      />

      <input
        name="points"
        type="number"
        placeholder="Points Required"
        value={skill.points}
        onChange={handleChange}
      />

      <input
        name="description"
        placeholder="Description"
        value={skill.description}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Post Skill</button>
    </div>
  );
}

export default PostSkill;