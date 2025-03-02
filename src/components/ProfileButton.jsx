import { useState } from "react";
import { NavLink } from "react-router-dom";
import Pages from "../constants/Pages";

const ProfileButton = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="position-relative">
      <NavLink
        to={Pages.PROFILE}
        className={({ isActive }) => `btn btn-light border-0 d-flex align-items-center ${isActive ? "active border-primary" : ""}`}
        onClick={toggleProfile}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi d-block mx-auto mb-1"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </NavLink>

      {showProfile && (
        <div className="position-absolute top-100 end-0 mt-2 p-3 bg-white shadow rounded border" style={{ width: "250px" }}>
          <h6 className="mb-1">Иван Иванов</h6>
          <p className="text-muted">@ivan_ivanov</p>
          <p className="mb-1">
            <strong>Email:</strong> ivan@example.com
          </p>
          <button className="btn btn-outline-danger w-100 mt-2">Выйти</button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
