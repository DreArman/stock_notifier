import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as loginService, register as registerService, logout as logoutService } from '../services/authService';
import { getUserData } from '../services/userService';
import { User } from '../models/User';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('access_token') !== null);
  const [user, setUser] = useState(localStorage.getItem('user') !== null ? User.fromJson(JSON.parse(localStorage.getItem('user'))) : new User());

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
    localStorage.setItem("access_token", login_data.access_token);
    setIsAuth(true);
    // Optionally, set user data here
    const user_data = await getUserData();
    console.log(user_data)
    setUser(User.fromJson(user_data));
    localStorage.setItem("user", JSON.stringify(user_data));
  };

  const sendEmail = async (username, email) => {
    const data = await sendEmail(username, email);
    console.log(data)
  };

  const verifyEmail = async (email, code) => {
    const data = await verifyEmail(email, code);
    console.log(data)
  } ;

  const register = async (username, email, password) => {
    const data = await registerService(username, email, password);
    console.log(data)
    // setIsAuth(true);
    // Optionally, set user data here
  };

  const logout = async () => {
    const data = await logoutService();
    console.log(data);
    localStorage.removeItem("access_token");
    setIsAuth(false);
    setUser(new User());
  };

  return (
    // <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
    <AuthContext.Provider value={{ isAuth, user, login, sendEmail, verifyEmail, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };