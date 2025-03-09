import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import Pages from "../../constants/Pages";
import PropTypes from 'prop-types';

const ProfileButton = ({ user }) => {

  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const logoutClick = async () => {
    await logout();
    navigate(Pages.SIGN_IN);
  };
  
  const toggleProfile = () => setShowProfile(!showProfile);
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative" ref={profileRef}>
      <button className="btn border-0" data-theme onClick={toggleProfile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi d-block mx-auto mb-1"
          viewBox="0 0 16 16"
          data-theme
          data-light-src="path/to/light-profile.svg"
          data-dark-src="path/to/dark-profile.svg"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg>
      </button>

      {showProfile && (
        <div className="position-absolute top-100 end-0 mt-2 p-3 shadow rounded border toggle-window" style={{ width: "250px" }}>
          <p className="mb-1"><strong>Name Surname:</strong><br/>{user.username}</p>
          <p className="mb-1"><strong>Email:</strong><br/>{user.email}</p>
          <button className="btn btn-outline-primary w-100 mt-2" onClick={() => navigate(Pages.PROFILE)}>Настройки</button>
          <button className="btn btn-outline-danger w-100 mt-2" onClick={logoutClick}>Выйти</button>
        </div>
      )}
    </div>
  );
};
ProfileButton.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    telegramId: PropTypes.string,
  }),
};

export default ProfileButton;