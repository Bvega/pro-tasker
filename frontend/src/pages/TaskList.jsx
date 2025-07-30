// src/pages/TaskList.jsx
import React from 'react';

export default function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p className="text-gray-600">No tasks for this project.</p>;
  }

  return (
    <ul className="list-disc ml-6 space-y-1">
      {tasks.map(task => (
        <li key={task._id} className="flex items-center">
          {/* You can extend: add checkboxes, status badges, etc. */}
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
}
