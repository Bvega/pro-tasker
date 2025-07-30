// src/pages/AddProjectForm.jsx
import React, { useState } from 'react'
import { createProject } from '../utils/api'

export default function AddProjectForm({ onCreate }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const project = await createProject(name)
      onCreate(project)                  // Notify parent (Dashboard) of new project
      setName('')                        // Clear input
      setMessage('Project created!')    // Feedback
    } catch (err) {
      console.error(err)
      setMessage(err.response?.data?.message || 'Failed to create project')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New project name"
        className="border px-2 py-1 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        + Add Project
      </button>
      {message && <p className="mt-1 text-sm text-green-600">{message}</p>}
    </form>
  )
}
