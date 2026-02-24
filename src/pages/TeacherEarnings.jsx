import { useEffect, useState } from "react";

function TeacherEarnings() {
  const [earnings, setEarnings] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const skills = JSON.parse(localStorage.getItem("skills")) || [];

    if (!currentUser) return;

    // 🟢 Get skills posted by current user
    const mySkills = skills.filter(
      (skill) => skill.teacher === currentUser.name
    );

    // 🟢 Get bookings for current user as teacher
    const teacherBookings = bookings.filter(
      (booking) => booking.teacher === currentUser.name
    );

    const skillMap = {};

    // First add all posted skills with 0 earnings
    mySkills.forEach((skill) => {
      skillMap[skill.title] = {
        title: skill.title,
        totalBookings: 0,
        totalPoints: 0
      };
    });

    // Then add earnings from bookings
    teacherBookings.forEach((booking) => {
      if (!skillMap[booking.skillTitle]) {
        skillMap[booking.skillTitle] = {
          title: booking.skillTitle,
          totalBookings: 0,
          totalPoints: 0
        };
      }

      skillMap[booking.skillTitle].totalBookings += 1;
      skillMap[booking.skillTitle].totalPoints += booking.points;
    });

    const result = Object.values(skillMap);
    setEarnings(result);

    const total = result.reduce(
      (sum, skill) => sum + skill.totalPoints,
      0
    );

    setTotalPoints(total);

  }, []);

  return (
    <div className="container">
      <h2>My Skill Earnings</h2>

      <h3 style={{ marginBottom: "20px", color: "#4f46e5" }}>
        💰 Total Points Earned: {totalPoints}
      </h3>

      {earnings.length === 0 ? (
        <p>You have not posted any skills yet.</p>
      ) : (
        earnings.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-title">{skill.title}</div>

            <div className="skill-meta">
              <b>Total Bookings:</b> {skill.totalBookings}
            </div>

            <div className="skill-meta">
              <b>Total Points Earned:</b> {skill.totalPoints}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TeacherEarnings;