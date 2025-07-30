// src/pages/AddTaskForm.jsx
import React, { useState } from 'react'
import { createTask } from '../utils/api'

export default function AddTaskForm({ projectId, onTaskCreated }) {
  const [title, setTitle] = useState('')           // Task title input
  const [description, setDescription] = useState('') // Task description input
  const [message, setMessage] = useState('')       // Feedback message

  // Handle form submission to create a new task
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Adding task...')
    try {
      const newTask = await createTask(projectId, { title, description })
      setTitle('')        // Reset form fields
      setDescription('')
      setMessage('Task added!')
      onTaskCreated(newTask) // Notify parent to update task list
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding task')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-2">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Task description"
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        + Add Task
      </button>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </form>
  )
}
