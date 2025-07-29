import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Main entry point for the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide global auth state and routing to entire app */}
    <AuthProvider>
<BrowserRouter> 
<App />
</BrowserRouter>    </AuthProvider>
  </React.StrictMode>
);
