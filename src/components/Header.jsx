import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Pages from "../constants/Pages";
import NotificationButton from './NotificationButton';
import ProfileButton from './ProfileButton';
import NavLinks from './NavLinks';
import { AuthContext } from '../context/AuthContext';
import Logo from './Logo';

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
      <Logo />

      <NavLinks />

      <div className="d-flex align-items-center ms-auto">
        <NotificationButton notifications={notifications} />
        <ProfileButton user={user} logoutClick={logoutClick} />
      </div>
    </header>
  );
};

export default Header;
