// src/pages/TaskList.jsx
import React from 'react'

export default function TaskList({ tasks }) {
  if (!tasks.length) {
    return <p className="text-gray-600">No tasks for this project.</p>
  }

  return (
    <ul className="space-y-4">
      {tasks.map(task => (
        <li key={task._id} className="border p-4 rounded shadow-sm">
          <h4 className="font-semibold">{task.title}</h4>
          {task.description && <p className="text-gray-700">{task.description}</p>}
          <span className="text-sm text-blue-600">{task.status || 'To Do'}</span>
        </li>
      ))}
    </ul>
  )
}
