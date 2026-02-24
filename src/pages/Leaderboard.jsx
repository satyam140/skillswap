import { useEffect, useState } from "react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("wallet")) || {};

    const sorted = Object.entries(wallet)
      .sort((a, b) => b[1] - a[1]);

    setLeaders(sorted);
  }, []);

  return (
    <div className="container">
      <h2>Leaderboard</h2>

      {leaders.map(([name, points], index) => (
        <div key={name} className="skill-card">
          #{index + 1} {name} — {points} Points
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;