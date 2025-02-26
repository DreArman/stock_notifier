import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuth, redirectTo = "/login" }) => {
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string
};

export default ProtectedRoute;
