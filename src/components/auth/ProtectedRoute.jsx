import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Pages from "../../constants/Pages";

const ProtectedRoute = ({ redirectTo = Pages.SIGN_IN }) => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string
};

export default ProtectedRoute;
