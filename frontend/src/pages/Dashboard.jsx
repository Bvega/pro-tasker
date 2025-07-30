import React, { useEffect, useState } from 'react'
import AddProjectForm from './AddProjectForm'    // relative import correctly pointed at same folder
import { getProjects } from '../utils/api'       // correct named import

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [message, setMessage]     = useState('')

  const fetchProjects = async () => {
    try {
      const data = await getProjects()           // fetch from API util
      setProjects(data)
    } catch (err) {
      setMessage(err.response?.data?.message || err.message)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>

      <AddProjectForm
        onProjectCreated={() => {
          setMessage('Project created!')
          fetchProjects()
        }}
        onError={(errMsg) => setMessage(errMsg)}
      />

      {message && (
        <p className="mb-4 text-green-600">{message}</p>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects found.</p>
        ) : (
          <ul className="list-disc pl-5">
            {projects.map((proj) => (
              <li key={proj._id} className="mb-1">
                {proj.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
