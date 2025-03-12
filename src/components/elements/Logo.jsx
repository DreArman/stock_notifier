import Pages from '../../constants/Pages';
import PropTypes from 'prop-types';

const Logo = ({ width = 40, height = 40 }) => {
  return (
    <a href={Pages.ROOT} className="me-5 p-2">
      <img
        className="bi bi-graph-up"
        src="https://cdn-icons-png.flaticon.com/512/17473/17473639.png"
        width={width}
        height={height}
        alt="Logo"
      />
    </a>
  );
};

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Logo;