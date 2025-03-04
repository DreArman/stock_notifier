import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NotificationButton from './NotificationButton';
import ProfileButton from './ProfileButton';
import NavLinks from './NavLinks';
import Logo from './Logo';

const Header = () => {
  const [notifications] = useState([
    { id: 1, text: "Новое сообщение от администратора", read: true },
    { id: 2, text: "Система обновлена до версии 2.1", read: true },
    { id: 3, text: "Ваш отчет готов к скачиванию", read: true },
  ]);

  const { user } = useContext(AuthContext);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 p-4 border-bottom">
      <Logo />

      <NavLinks />

      <div className="d-flex align-items-center ms-auto">
        <NotificationButton notifications={notifications} />
        <ProfileButton user={user}/>
      </div>
    </header>
  );
};

export default Header;
