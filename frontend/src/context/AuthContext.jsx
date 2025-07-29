import { createContext, useState } from 'react';

// Create the context to be shared globally
const AuthContext = createContext();

// AuthProvider wraps your entire app and shares auth state
export const AuthProvider = ({ children }) => {
  // Retrieve user info from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Retrieve token from localStorage if available
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // Save user info and token to state and localStorage
  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwt);
  };

  // Clear auth state and localStorage on logout
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Provide auth values to the rest of the app
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
