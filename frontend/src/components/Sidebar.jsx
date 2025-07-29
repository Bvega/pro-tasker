// Sidebar with navigation and create project/task buttons

import React from "react";

const Sidebar = ({ onCreateProject, onCreateTask }) => {
  return (
    <aside className="w-1/4 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">📁 Projects</h2>
      <button
        onClick={onCreateProject}
        className="w-full mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ➕ Add Project
      </button>
      <button
        onClick={onCreateTask}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        ➕ Add Task
      </button>
    </aside>
  );
};

export default Sidebar;
