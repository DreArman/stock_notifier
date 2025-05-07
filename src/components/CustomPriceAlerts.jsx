import { useState } from "react";
import PropTypes from "prop-types";
import AlertCard from "./elements/AlertCard";
import AddAlertForm from "./elements/AddAlertForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCustomAlert } from "../services/alertService";

const CustomPriceAlerts = ({ alerts, setAlerts }) => {
  const [showAddAlert, setShowAddAlert] = useState(false);

  const removeAlert = async (symbol) => {
    try {
      await setCustomAlert(symbol, false, 0, 0);
      toast.success("Alert removed successfully!");
    }
    catch (error) {
      console.error("Error removing alert:", error);
      toast.error("Failed to remove alert. Please try again later.");
    }
    // Remove the alert from the local state
    const updatedAlerts = alerts.filter((alert) => alert.symbol !== symbol);
    setAlerts(updatedAlerts);
  };

  return (
    <div className="card mb-4">
      <ToastContainer />
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
          {alerts
            .filter((alert) => alert.status !== false)
            .map((alert) => (
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