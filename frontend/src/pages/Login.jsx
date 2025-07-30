// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'         // our axios instance
import useAuth from '../hooks/useAuth' // your auth context hook

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  // Update form values
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Submit and store raw JWT
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Logging in...')
    try {
      const res = await api.post('/users/login', formData)
      const { name, email, token } = res.data

      // Persist the raw token
      localStorage.setItem('token', token)
      login({ name, email }, token)

      setMessage(`✅ Welcome back, ${name}!`)
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (err) {
      console.error('[Login] error:', err)
      setMessage(err.response?.data?.message || '❌ Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-center text-sm text-gray-600">{message}</p>
      </form>
    </div>
  )
}
