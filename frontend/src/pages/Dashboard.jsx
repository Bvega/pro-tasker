// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectForm from "../components/AddProjectForm";

// 🧠 Dashboard page that loads after successful login
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // 🧠 Holds the logged-in user's info
  const [projects, setProjects] = useState([]); // 🧠 Holds the fetched projects

  // 🧠 On mount: load user from localStorage or redirect to login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🧠 Handle logout by clearing storage and navigating to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* 🧱 Sidebar */}
      <div className="w-1/4 bg-white border-r p-6 space-y-4">
        <h2 className="text-xl font-bold text-yellow-600">📁 Projects</h2>
        {/* 🧱 AddProjectForm is the form component for creating new projects */}
        <AddProjectForm setProjects={setProjects} />
      </div>

      {/* 📋 Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.name || "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600">Select or create a project to begin.</p>
      </div>
    </div>
  );
};

export default Dashboard;
