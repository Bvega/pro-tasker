// src/components/AddProjectForm.jsx

import React, { useState } from "react";
import axios from "axios";

// 🧠 Form component to create a new project
const AddProjectForm = ({ setProjects }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 📩 Handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 Get the auth token
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a project.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🎯 If success, update the UI
      if (response.status === 201) {
        setSuccess("Project created successfully!");
        setName("");
        setProjects((prev) => [...prev, response.data]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create project. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        ➕ Add Project
      </button>

      {/* 🧠 Show error/success messages */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </form>
  );
};

export default AddProjectForm;
