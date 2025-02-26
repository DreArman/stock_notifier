import { Outlet } from "react-router-dom";
import Header from "./Header";
import PropTypes from 'prop-types';

const Layout = ({ isAuth }) => {
  return (
    <div>
      {isAuth && <Header />} {/* Header only if authenticated */}
      <main>
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
    </div>
  );
};
Layout.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default Layout;
