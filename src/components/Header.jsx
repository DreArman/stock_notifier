import { NavLink } from "react-router-dom";
import Pages from "../constants/Pages";
import { useState } from "react";

const Header = () => {
  const user = {
    Name: "Jane Doe",
    username: "Jerry",
    email: "jane.doe@example.com",
  };
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Новое сообщение от администратора", read: false },
    { id: 2, text: "Система обновлена до версии 2.1", read: false },
    { id: 3, text: "Ваш отчет готов к скачиванию", read: true },
  ]);

  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  
  const hasUnread = notifications.some((notif) => !notif.read);

  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 p-4 border-bottom">

      <NavLink to={Pages.DASHBOARD} className="me-5 p-2">
        <img className="bi bi-graph-up" src="https://cdn-icons-png.flaticon.com/512/17473/17473639.png"  width="40" height="40"/>
      </NavLink>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to={Pages.DASHBOARD}  className={({ isActive }) => `nav-link ${isActive || location.pathname === Pages.ROOT ? "active" : ""}`
              }
            >
              Main
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={Pages.STOCKS} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Stocks
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={Pages.FORECAST} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Forecast
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={Pages.STOCK_ALERTS} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            Alerts
          </NavLink>
        </li>
      </ul>

      
      <div className="d-flex align-items-center ms-auto">
        {/* Кнопка уведомлений */}
        <div className="position-relative me-3">
          <button className="btn btn-light border-0" onClick={toggleNotifications}>
            {hasUnread ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
              </svg>
            )}
          </button>

          {showNotifications && (
            <div className="position-absolute top-100 end-0 mt-2 p-3 bg-white shadow rounded border" style={{ width: "250px" }}>
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

        {/* Кнопка профиля */}
        <ul className="nav nav-pills ms-auto">
          <div className="position-relative">
            <button className="btn btn-light border-0" onClick={toggleProfile}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi d-block mx-auto mb-1" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            </button>

            {showProfile && (
              <div className="position-absolute top-100 end-0 mt-2 p-3 bg-white shadow rounded border" style={{ width: "250px" }}>
                <h6 className="mb-1">{user.Name}</h6>
                <p className="text-muted">{user.username}</p>
                <p className="mb-1"><strong>Email:</strong>{user.email}</p>
                <button className="btn btn-outline-danger w-100 mt-2">Выйти</button>
              </div>
            )}
          </div>
        </ul>
      </div>
      {/* <div className="dropdown text-end"> */}
        {/* <ul className="nav nav-pills ms-auto">
          <NavLink to={Pages.PROFILE} className="nav-link text">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi d-block mx-auto mb-1" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </NavLink>
        </ul> */}
        {/* <ul className="dropdown-menu text-small">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div> */}

    </header>
  );
};

export default Header;
