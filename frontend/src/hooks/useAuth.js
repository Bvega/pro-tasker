import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'  // ← corrected path

export default function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return ctx
}
