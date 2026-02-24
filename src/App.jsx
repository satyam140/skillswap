import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostSkill from "./pages/PostSkill";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import TeacherEarnings from "./pages/TeacherEarnings";
import Leaderboard from "./pages/Leaderboard";
import AdminPanel from "./pages/AdminPanel";   // ✅ Add this page

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, []);

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Must be logged in) */}
        <Route
          path="/dashboard"
          element={
            currentUser
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/post-skill"
          element={
            currentUser
              ? <PostSkill />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/booking"
          element={
            currentUser
              ? <Booking />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/my-bookings"
          element={
            currentUser
              ? <MyBookings />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/earnings"
          element={
            currentUser
              ? <TeacherEarnings />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/leaderboard"
          element={
            currentUser
              ? <Leaderboard />
              : <Navigate to="/" />
          }
        />

        {/* ✅ Admin Only Route */}
        <Route
          path="/admin"
          element={
            currentUser?.role === "admin"
              ? <AdminPanel />
              : <Navigate to="/dashboard" />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;