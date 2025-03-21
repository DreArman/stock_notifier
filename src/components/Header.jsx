import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import NotificationButton from './elements/NotificationButton';
import ProfileButton from './elements/ProfileButton';
import NavLinks from './NavLinks';
import Logo from './elements/Logo';
import Pages from '../constants/Pages';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [notifications] = useState([
    { id: 1, text: "Новое сообщение от администратора", read: false },
    { id: 2, text: "Система обновлена до версии 2.1", read: true },
    { id: 3, text: "Ваш отчет готов к скачиванию", read: true },
  ]);

  const { user } = useContext(AuthContext);
  const { isAuth } = useContext(AuthContext);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-4 mb-4 p-5 border-bottom">
      <div className="d-flex justify-content-center align-items-center me-5">
        <Logo/>
      </div>

      <NavLinks />

      <div className="d-flex align-items-center ms-auto">
        {isAuth ? (<>
        <NotificationButton notifications={notifications} />
        <ProfileButton user={user}/>
        </>):(<>
        <NavLink to={Pages.SIGN_IN} className="btn btn-outline-primary me-2">Login</NavLink>
        <NavLink to={Pages.SIGN_UP} className="btn btn-primary">Sign-up</NavLink>
        </>
      )}
        
      </div>
    </header>
  );
};

export default Header;
