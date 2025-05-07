import PropTypes from "prop-types";

const AlertCard = ({ alert, onClick, onEdit }) => {
  return (
    <div className="mb-4 p-3 border rounded">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="h5 mb-0">{alert.symbol}</h3>
        <div>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => onEdit(alert.symbol)} // Use the onClick prop
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onClick(alert.symbol)} // Use the onClick prop
        >
          Remove
        </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <label className="form-label">Above</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              value={alert.above || ''}
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6 mb-2">
          <label className="form-label">Below</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              value={alert.below || ''}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AlertCard.propTypes = {
  alert: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    above: PropTypes.number.isRequired,
    below: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default AlertCard;