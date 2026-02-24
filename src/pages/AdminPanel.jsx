import { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setSkills(JSON.parse(localStorage.getItem("skills")) || []);
  }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      <h3>All Users</h3>
      {users.map((u) => (
        <div key={u.email} className="skill-card">
          {u.name}
        </div>
      ))}

      <h3>All Skills</h3>
      {skills.map((s) => (
        <div key={s.id} className="skill-card">
          {s.title} — {s.teacher}
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;