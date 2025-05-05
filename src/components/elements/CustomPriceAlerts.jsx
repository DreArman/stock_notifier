import { useState } from "react";
import PropTypes from "prop-types";
import AlertCard from "../../components/elements/AlertCard";
import AddAlertForm from "./AddAlertForm";

const CustomPriceAlerts = ({ alerts, setAlerts, tickers }) => {
  const [showAddAlert, setShowAddAlert] = useState(false);

  const removeAlert = (symbol) => {
    const updatedAlerts = alerts.filter((alert) => alert.symbol !== symbol);
    setAlerts(updatedAlerts);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="h4 mb-4">Custom Price Alerts</h2>

        {/* Scrollable Alert List */}
        <div
          className="mb-4"
          style={{
            maxHeight: "350px",
            overflowY: "auto",
            padding: "5px",
          }}
        >
          {alerts.map((alert) => (
            <AlertCard
              key={alert.symbol}
              alert={alert}
              onClick={removeAlert}
            />
          ))}
        </div>

        {showAddAlert ? (
          <AddAlertForm
            setShowAddAlert={setShowAddAlert}
            alerts={alerts}
            setAlerts={setAlerts}
            tickers={tickers}
          />
        ) : (
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowAddAlert(true)}
          >
            + Add New Alert
          </button>
        )}
      </div>
    </div>
  );
};

CustomPriceAlerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAlerts: PropTypes.func.isRequired,
  tickers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CustomPriceAlerts;