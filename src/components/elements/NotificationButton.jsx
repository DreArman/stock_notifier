import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const NotificationButton = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const hasUnread = notifications.some((notif) => !notif.read);

  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative me-3" ref={notificationRef}>
      <button className="btn border-0" data-theme onClick={toggleNotifications}>
        {hasUnread ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-bell-fill"
            viewBox="0 0 16 16"
            data-theme
            data-light-src="path/to/light-bell-fill.svg"
            data-dark-src="path/to/dark-bell-fill.svg"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
            data-theme
            data-light-src="path/to/light-bell.svg"
            data-dark-src="path/to/dark-bell.svg"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
          </svg>
        )}
      </button>

      {showNotifications && (
        <div className="position-absolute top-100 end-0 mt-2 p-3 shadow rounded border toggle-window card" style={{ width: "250px", zIndex: 1050}}>
          <h6 className="mb-2">Уведомления</h6>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className={`p-2 rounded ${notif.read ? "text-muted" : "fw-bold"}`}>
                {notif.text}
              </div>
            ))
          ) : (
            <p className="text-muted text-center">Нет новых уведомлений</p>
          )}
        </div>
      )}
    </div>
  );
};

NotificationButton.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default NotificationButton;