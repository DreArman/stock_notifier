import { NavLink } from "react-router-dom";
import Pages from "../constants/Pages";

const Header = () => {

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
      
      {/* <div className="dropdown text-end"> */}
        <ul className="nav nav-pills ms-auto">
          <NavLink to={Pages.PROFILE} className="nav-link text">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi d-block mx-auto mb-1" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </NavLink>
        </ul>
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
