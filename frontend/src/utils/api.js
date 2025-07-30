// src/utils/api.js
import axios from 'axios'

// create an axios instance pointed at your backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// sanitize and attach the token on every request
api.interceptors.request.use((config) => {
  let raw = localStorage.getItem('token') || ''
  const token = raw.replace(/^"|"$/g, '')  // strip leading/trailing quotes

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.debug('[api] Attaching token:', token)
  }
  return config
})

export async function getProjects() {
  const { data } = await api.get('/projects')
  return data
}

export async function createProject(name) {
  const { data } = await api.post('/projects', { name })
  return data
}

export default api
