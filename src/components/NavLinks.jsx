import { NavLink } from "react-router-dom";
import Pages from "../constants/Pages";

const NavLinks = () => {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink to={Pages.DASHBOARD} className={({ isActive }) => `nav-link ${isActive || location.pathname === Pages.ROOT ? "active" : ""}`}>
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
  );
};

export default NavLinks;