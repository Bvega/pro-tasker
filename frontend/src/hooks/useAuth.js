// Custom hook to simplify access to the AuthContext
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Allows components to call useAuth() instead of useContext(AuthContext)
const useAuth = () => useContext(AuthContext);

export default useAuth;
