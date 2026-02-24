import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { earnPoints, spendPoints } from "../utils/wallet";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // ✅ FIXED

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // ✅ Show only logged-in user's bookings
    const userBookings = allBookings.filter(
      (booking) => booking.student === currentUser.name
    );

    setBookings(userBookings);
  }, [navigate]);

  const handleCancel = (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const bookingToCancel = allBookings.find(
      (booking) => booking.id === bookingId
    );

    if (!bookingToCancel) return;

    // ✅ Refund student
    earnPoints(currentUser.name, bookingToCancel.points);

    // ✅ Deduct from teacher
    spendPoints(bookingToCancel.teacher, bookingToCancel.points);

    // ✅ Remove booking
    const updatedBookings = allBookings.filter(
      (booking) => booking.id !== bookingId
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // ✅ Update state
    setBookings(
      updatedBookings.filter(
        (booking) => booking.student === currentUser.name
      )
    );

    alert("❌ Booking cancelled & points refunded!");
  };

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>You have not booked any skills yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="skill-card">
            <div className="skill-title">{booking.skillTitle}</div>

            <div className="skill-meta">
              <b>Teacher:</b> {booking.teacher}
            </div>

            <div className="skill-meta">
              <b>Points Spent:</b> {booking.points}
            </div>

            <div className="skill-meta">
              <b>Date:</b> {booking.date}
            </div>

            <button
              style={{
                marginTop: "10px",
                backgroundColor: "#e74c3c"
              }}
              onClick={() => handleCancel(booking.id)}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;