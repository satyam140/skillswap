function SkillCard({ skill }) {
  return (
    <div className="card">
      <h4>{skill.title}</h4>
      <p>Category: {skill.category}</p>
      <p>Points: {skill.points}</p>
      <button>Request</button>
    </div>
  );
}

export default SkillCard;