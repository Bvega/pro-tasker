// src/pages/AddProjectForm.jsx

import { useState } from 'react';
import { createProject } from '../utils/api';       // named import
import useAuth from '../hooks/useAuth';

export default function AddProjectForm({ onCreated }) {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await createProject(token, { name });
      onCreated(res.data);
      setMessage('Project created!');
      setName('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New project name"
        className="flex-1 border px-3 py-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        + Add Project
      </button>
      {message && <span className="ml-4 text-green-600">{message}</span>}
    </form>
  );
}
