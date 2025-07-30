// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import AddProjectForm from './AddProjectForm'
import { getProjects } from '../utils/api'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState('')

  // Fetch projects on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        console.error('[Dashboard] Error fetching projects:', err)
        setError(err.response?.data?.message || 'Error fetching projects')
      }
    })()
  }, [])

  // Handler when a new project is created
  const handleCreate = (newProject) => {
    setProjects(prev => [...prev, newProject])
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>

      {/* Add new project */}
      <AddProjectForm onCreate={handleCreate} />

      {/* Error message */}
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      {/* List of projects */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        {projects.length === 0
          ? <p className="text-gray-600">No projects found.</p>
          : (
            <ul>
              {projects.map(proj => (
                <li key={proj._id} className="mb-1">
                  {proj.name}
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  )
}
