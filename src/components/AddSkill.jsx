import { useState } from "react";

function AddSkill({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !points) {
      alert("Please fill all fields");
      return;
    }

    const newSkill = {
      id: Date.now(),
      title,
      category,
      points,
    };

    onAdd(newSkill);

    setTitle("");
    setCategory("");
    setPoints("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add New Skill</h3>

      <input
        placeholder="Skill Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />

      <button type="submit">Post Skill</button>
    </form>
  );
}

export default AddSkill;