// src/pages/TaskList.jsx
import React from "react";

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">No tasks available for this project.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Tasks</h3>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="p-3 bg-white rounded shadow flex justify-between items-center"
          >
            <span>{task.title}</span>
            <span
              className={`text-sm font-medium ${
                task.completed ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
