import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Pages from "../../constants/Pages";

const PublicRoute = ({ redirectTo = Pages.DASHBOARD }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
PublicRoute.propTypes = {
  redirectTo: PropTypes.string,
};

export default PublicRoute;
