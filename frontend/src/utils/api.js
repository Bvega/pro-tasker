// src/utils/api.js

import axios from 'axios';

// Create an axios instance with your baseURL
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',  // adjust if you use an env var instead
  // withCredentials: true, // uncomment only if you rely on cookie auth
});

// ===== User endpoints =====

// Log in a user
export const loginUser = formData =>
  apiClient.post('/users/login', formData);

// Register a new user
export const registerUser = formData =>
  apiClient.post('/users/register', formData);

// ===== Project endpoints =====

// Fetch all projects for the current user
export const getProjects = token =>
  apiClient.get('/projects', {
    headers: { Authorization: `Bearer ${token}` },
  });

// Create a new project
export const createProject = (token, projectData) =>
  apiClient.post('/projects', projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ===== Task endpoints (if/when you need them) =====

// export const getTasks = (...) => ...
// export const createTask = (...) => ...

// Default export in case you prefer `import api from './api'`
export default {
  loginUser,
  registerUser,
  getProjects,
  createProject,
  // getTasks,
  // createTask,
};
