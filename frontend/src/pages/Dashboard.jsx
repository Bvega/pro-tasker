// 🧠 Edu-comment: Dashboard page visible only after login

import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 🧠 Clear auth context and localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        👋 Welcome, {user?.name || "User"}!
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
