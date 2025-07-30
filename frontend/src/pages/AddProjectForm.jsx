import React, { useState } from 'react'
import { createProject } from '../utils/api'    // correct named import

export default function AddProjectForm({ onProjectCreated, onError }) {
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createProject(name)                 // calls your API util
      onProjectCreated()                        // notify parent to refresh list
      setName('')                               // clear input
    } catch (err) {
      onError(err.response?.data?.message || err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New project name"
        className="border border-gray-300 px-3 py-2 rounded flex-1"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        + Add Project
      </button>
    </form>
  )
}
