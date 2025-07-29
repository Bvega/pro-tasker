// 🧠 Edu-comment: This component protects private routes by checking if the user is authenticated

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth(); // 🧠 use token to verify authentication

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to protected route
  return children;
}
