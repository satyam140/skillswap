import { useEffect, useState } from "react";
import { spendPoints, earnPoints } from "../utils/wallet";

function SkillList({ currentUser }) {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedSkills = JSON.parse(localStorage.getItem("skills")) || [];
    setSkills(storedSkills);
  }, []);

  const handleBooking = (skill) => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!loggedUser) {
      alert("Please login first.");
      return;
    }

    // ❌ Prevent booking own skill
    if (skill.teacher === loggedUser.name) {
      alert("You cannot book your own skill.");
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // ❗ Already booked check
    const alreadyBooked = bookings.some(
      (booking) =>
        booking.skillId === skill.id &&
        booking.student === loggedUser.name
    );

    if (alreadyBooked) {
      alert("You have already booked this skill.");
      return;
    }

    // ✅ Deduct points
    const success = spendPoints(loggedUser.name, Number(skill.points));

    if (!success) {
      alert("❌ Not enough points!");
      return;
    }

    // ✅ Reward teacher
    earnPoints(skill.teacher, Number(skill.points));

    // ✅ Save booking
    const newBooking = {
      id: Date.now(),
      skillId: skill.id,
      skillTitle: skill.title,
      teacher: skill.teacher,
      student: loggedUser.name,
      points: Number(skill.points),
      date: new Date().toLocaleString()
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // ✅ Remove skill after booking (important)
    const updatedSkills = skills.filter((s) => s.id !== skill.id);
    setSkills(updatedSkills);
    localStorage.setItem("skills", JSON.stringify(updatedSkills));

    alert("✅ Skill booked successfully!");
  };

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Hide own skills + search filter
  const filteredSkills = skills
    .filter((skill) => skill.teacher !== currentUser)
    .filter(
      (skill) =>
        skill.title?.toLowerCase().includes(search.toLowerCase()) ||
        skill.category?.toLowerCase().includes(search.toLowerCase())
    );

  if (skills.length === 0) {
    return <p>No skills posted yet.</p>;
  }

  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Available Skills</h3>

      <input
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "100%" }}
      />

      {filteredSkills.length === 0 ? (
        <p>No matching skills found.</p>
      ) : (
        filteredSkills.map((skill) => {
          const alreadyBooked = bookings.some(
            (booking) =>
              booking.skillId === skill.id &&
              booking.student === currentUser
          );

          return (
            <div key={skill.id} className="skill-card">
              <div className="skill-title">{skill.title}</div>

              <div className="skill-meta">
                <b>Category:</b> {skill.category}
              </div>

              <div className="skill-meta">
                <b>Points Required:</b> {skill.points}
              </div>

              <div className="skill-meta">
                <b>Teacher:</b> {skill.teacher}
              </div>

              <p style={{ marginTop: "8px" }}>{skill.description}</p>

              {!alreadyBooked ? (
                <button
                  style={{ marginTop: "10px" }}
                  onClick={() => handleBooking(skill)}
                >
                  Book Skill
                </button>
              ) : (
                <p style={{ color: "green", marginTop: "10px" }}>
                  ✅ Already Booked
                </p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default SkillList;