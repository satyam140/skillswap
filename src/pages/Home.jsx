import { useState } from "react";
import Navbar from "../components/Navbar";
import AddSkill from "../components/AddSkill";
import SkillCard from "../components/SkillCard";

function Home() {
  const [skills, setSkills] = useState([]);

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <AddSkill onAdd={addSkill} />

        <h3>Available Skills</h3>

        <div className="grid">
          {skills.length === 0 && <p>No skills posted yet.</p>}

          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;