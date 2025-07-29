// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
       <Routes>
          {/* Root page */}
          <Route path="/" element={<App />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  );
};

export default App;
