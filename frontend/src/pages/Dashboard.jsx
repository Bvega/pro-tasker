// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import AddProjectForm from './AddProjectForm';
import { getProjects } from '../utils/api';     // named import
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await getProjects(token);
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching projects');
      }
    }
    fetchProjects();
  }, [token]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </header>

      <AddProjectForm onCreated={proj => setProjects(prev => [...prev, proj])} />

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Your Projects</h2>
        {projects.length
          ? (
            <ul className="list-disc list-inside">
              {projects.map(p => <li key={p._id}>{p.name}</li>)}
            </ul>
          ) : (
            <p>No projects yet.</p>
          )
        }
      </section>
    </div>
  );
}
