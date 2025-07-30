import React, { createContext, useState, useEffect } from 'react'

// Create context
export const AuthContext = createContext(null)

// Provider component
export function AuthProvider({ children }) {
  // Safely parse a JSON value or return default
  const safeParse = (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch (err) {
      console.error(`Failed to parse localStorage.${key}:`, err)
      return fallback
    }
  }

  // Initialize state from localStorage (or null)
  const [user, setUser]     = useState(() => safeParse('user'))
  const [token, setToken]   = useState(() => safeParse('token'))

  // Save to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token))
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  // Login helper: set both user + token
  const login = (userData, jwt) => {
    setUser(userData)
    setToken(jwt)
  }

  // Logout helper: clear state + storage
  const logout = () => {
    setUser(null)
    setToken(null)
  }

  // Expose context value
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
