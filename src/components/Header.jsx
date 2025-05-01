import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import NotificationButton from "./elements/NotificationButton";
import ProfileButton from "./elements/ProfileButton";
import NavLinks from "./NavLinks";
import Logo from "./elements/Logo";
import Pages from "../constants/Pages";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [notifications] = useState([
    { id: 1, text: "Новое сообщение от администратора", read: false },
    { id: 2, text: "Система обновлена до версии 2.1", read: true },
    { id: 3, text: "Ваш отчет готов к скачиванию", read: true },
  ]);

  const { user, isAuth } = useContext(AuthContext);

  // State to track whether it's mobile or desktop
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update `isMobile` on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-4 mb-4 p-5 border-bottom">
      {/* Logo - center in mobile */}
      {isMobile ? (
        <div className="col-12 d-md-none d-flex justify-content-center mb-3">
          <Logo />
        </div> ) : ( 
        <div className="d-none d-md-flex justify-content-center align-items-center me-5">
          <Logo />
        </div>
      )}
      {/* Navigation links - in one line */}
      <div className="d-flex flex-grow-1 justify-content-center justify-content-md-start">
        <NavLinks isMobile={isMobile}/>
      </div>

      {/* Buttons */}
      {isAuth ? (
        isMobile ? (
          // Mobile Buttons for Authenticated Users
          <div className="d-flex align-items-center mt-3 mt-md-0 justify-content-end w-100">
            <NotificationButton notifications={notifications} />
            <ProfileButton user={user} />
          </div>
        ) : (
          // Desktop Buttons for Authenticated Users
          <div className="d-flex align-items-center mt-3 mt-md-0 justify-content-end">
            <NotificationButton notifications={notifications} />
            <ProfileButton user={user} />
          </div>
        )
      ) : isMobile ? (
        // Mobile Buttons for Unauthenticated Users
        <div className="d-flex align-items-center mt-3 mt-md-0 justify-content-end w-100">
          <NavLink to={Pages.SIGN_IN} className="btn btn-outline-primary me-2">
            Login
          </NavLink>
          <NavLink to={Pages.SIGN_UP} className="btn btn-outline-primary">
            Sign-up
          </NavLink>
        </div>
      ) : (
        // Desktop Buttons for Unauthenticated Users
        <div className="d-flex align-items-center mt-3 mt-md-0 justify-content-end">
          <NavLink to={Pages.SIGN_IN} className="btn btn-outline-primary me-2">
            Login
          </NavLink>
          <NavLink to={Pages.SIGN_UP} className="btn btn-outline-primary">
            Sign-up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;