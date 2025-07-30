// src/utils/auth.js

// This helper retrieves the user data from localStorage and parses it
export function getUserData() {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
}
