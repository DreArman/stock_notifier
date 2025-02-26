import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ isAuth, redirectTo = "/" }) => {
  return isAuth ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
};

export default PublicRoute;
