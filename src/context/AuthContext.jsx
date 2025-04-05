import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  // sendEmail as sendEmailService,
  // verifyEmail as verifyEmailService,
} from "../services/authService";
import { getUserData } from "../services/userService";
import { User } from "../models/User";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("access_token") !== null
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") !== null
      ? User.fromJson(JSON.parse(localStorage.getItem("user")))
      : new User()
  );

  useEffect(() => {
    // Check if user is authenticated on initial load
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuth(true);
      // Optionally, fetch user data here
    }
  }, []);

  const login = async (email, password) => {
    const loginData = await loginService(email, password);
    console.log(loginData);
    localStorage.setItem("access_token", loginData.access_token);
    setIsAuth(true);
    // Optionally, set user data here
    const userData = await getUserData();
    console.log(userData);
    setUser(User.fromJson(userData));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // const sendEmail = async (username, email) => {
  //   const data = await sendEmailService(username, email);
  //   console.log(data);
  // };

  // const verifyEmail = async (email, code) => {
  //   const data = await verifyEmailService(email, code);
  //   console.log(data);
  // };

  const register = async (username, email, password) => {
    const data = await registerService(username, email, password);
    console.log(data);
    // setIsAuth(true);
    // Optionally, set user data here
  };

  const logout = async () => {
    const data = await logoutService();
    console.log(data);
    localStorage.clear();
    setIsAuth(false);
    setUser(new User());
  };

  return (
    // <AuthContext.Provider value={{ isAuth, user, login, register, logout }}>
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login,
        // sendEmail,
        // verifyEmail,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };
