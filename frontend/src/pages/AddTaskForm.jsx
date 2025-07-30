// src/pages/AddTaskForm.jsx
import React, { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) return setError('Title can’t be blank');

    try {
      await onAdd(title);
      setTitle('');
      setError('');
    } catch {
      setError('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New task title"
          className="border px-2 py-1 rounded flex-grow"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
          + Add Task
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </form>
  );
}
