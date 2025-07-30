// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate }        from 'react-router-dom'
import api                    from '../utils/api'       // <-- default import
import useAuth                from '../hooks/useAuth'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [message, setMessage]   = useState('')
  const { login }               = useAuth()
  const navigate                = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Logging in…')
    try {
      // use our api instance
      const res = await api.post('/users/login', formData)

      const { name, email, token } = res.data
      login({ name, email }, token)

      setMessage(`✅ Welcome back, ${name}!`)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-sm text-center text-gray-600">{message}</p>
      </form>
    </div>
  )
}
