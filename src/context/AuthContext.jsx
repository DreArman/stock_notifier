import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as loginService, register as registerService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuth(true);
      // Optionally, fetch user data here
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    setIsAuth(true);
    // Optionally, set user data here
  };

  const register = async (email, password) => {
    const data = await registerService(email, password);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    setIsAuth(true);
    // Optionally, set user data here
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };