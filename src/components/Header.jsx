import { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Pages from "../constants/Pages";
import NotificationButton from './NotificationButton';
import ProfileButton from './ProfileButton';
import NavLinks from './NavLinks';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const user = {
    Name: "Jane Doe",
    username: "Jerry",
    email: "jane.doe@example.com",
  };
  const [notifications] = useState([
    { id: 1, text: "Новое сообщение от администратора", read: false },
    { id: 2, text: "Система обновлена до версии 2.1", read: false },
    { id: 3, text: "Ваш отчет готов к скачиванию", read: true },
  ]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  const logoutClick = async () => {
    await logout();
    navigate(Pages.SIGN_IN);
  }

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 p-4 border-bottom">
      <NavLink to={Pages.ROOT} className="me-5 p-2">
        <img className="bi bi-graph-up" src="https://cdn-icons-png.flaticon.com/512/17473/17473639.png" width="40" height="40" />
      </NavLink>

      <NavLinks />

      <div className="d-flex align-items-center ms-auto">
        <NotificationButton notifications={notifications} />
        <ProfileButton user={user} logoutClick={logoutClick} />
      </div>
    </header>
  );
};

export default Header;
