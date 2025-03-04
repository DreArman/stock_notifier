import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';
import { getUserData } from '../services/userService';
import { User } from '../models/User';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('access_token') === null);
  const [user, setUser] = useState(new User());

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuth(true);
      // Optionally, fetch user data here
    }
  }, []);

  const login = async (email, password) => {
    const login_data = await loginService(email, password); 
    console.log(login_data)
    setIsAuth(true);
    // Optionally, set user data here
    const user_data = await getUserData();
    console.log(user_data)
    setUser(User.fromJson(user_data));
  };

  const register = async (username, email, password) => {
    const data = await registerService(username, email, password);
    console.log(data)
    // setIsAuth(true);
    // Optionally, set user data here
  };

  const logout = async () => {
    const data = await logoutService();
    console.log(data);
    setIsAuth(false);
    // setUser(null);
  };

  return (
    // <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
    <AuthContext.Provider value={{ isAuth, user, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };