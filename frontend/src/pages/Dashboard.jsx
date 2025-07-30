// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProjectForm from "../components/AddProjectForm";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);               // Authenticated user info
  const [projects, setProjects] = useState([]);         // List of user-created projects

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
      fetchProjects();  // Fetch projects after login
    }
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(response.data); // Populate projects state
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-6 space-y-6">
        <h2 className="text-xl font-bold text-yellow-600">📁 Projects</h2>

        {/* Project creation form */}
        <AddProjectForm setProjects={setProjects} />

        {/* Render project list */}
        <div className="mt-6">
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects yet</p>
          ) : (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project._id}
                  className="p-2 border rounded shadow-sm bg-gray-50 hover:bg-gray-100"
                >
                  {project.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Main content */}
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
