// src/utils/api.js
import axios from 'axios'

// create a pre-configured axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,   // if you ever need cookies
})

// automatically inject token from localStorage
api.interceptors.request.use((cfg) => {
  const raw = localStorage.getItem('token')
  if (raw) {
    const token = JSON.parse(raw)
    cfg.headers.Authorization = `Bearer ${token}`
  }
  return cfg
})

// named exports for your CRUD helpers
export async function getProjects() {
  const { data } = await api.get('/projects')
  return data
}

export async function createProject(name) {
  const { data } = await api.post('/projects', { name })
  return data
}

// --- the new line: default export of the axios instance
export default api
