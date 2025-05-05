import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomPriceAlerts from "../../components/elements/CustomPriceAlerts";
import PriceChangeInput from "../../components/elements/PriceChangeInput";
import { getStockTickers } from "../../services/stockService";
import { setDailySummary, setSignificantChanges, getAlerts } from "../../services/alertService";

const Alerts = () => {
  const [daily, setDailyStatus] = useState(false);
  const [significant, setSignificantStatus] = useState(false);
  const [percentage, setPercentage] = useState(5);
  const [alerts, setAlerts] = useState([
    { symbol: "AAPL", above: 190.0, below: 170.0 },
    { symbol: "TSLA", above: 250.0, below: 220.0 },
  ]);

  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts();
        if (data) {
          setDailyStatus(data.daily_summary.status);
          setSignificantStatus(data.significiant.status);
          setPercentage(data.significiant.percent);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
        toast.error("Failed to fetch alerts. Please try again later.");
      }
    };
    fetchAlerts();

    const fetchStockTickers = async () => {
      try {
        const data = await getStockTickers();
        setTickers(data);
      } catch (error) {
        console.error("Error fetching stock tickers:", error);
        toast.error("Failed to fetch stock tickers. Please try again later.");
      }
    };
    fetchStockTickers();
  }, []);

  const handleDailySummary = async () => {
    const newState = !daily; // Toggle the state
    setDailyStatus(newState); // Update the local state

    try {
      await setDailySummary(newState); // Save the preference to the backend
      toast.success("Daily Summary preference updated!");
    } catch (error) {
      console.error("Error updating Daily Summary preference:", error);
      toast.error("Failed to update preference. Please try again.");
    }
  };

  const handleSignificantChange = async () => {
    const newState = !significant; // Toggle the state
    setSignificantStatus(newState); // Update the local state

    try {
      await setSignificantChanges(newState, percentage); // Save the preference to the backend
      toast.success("Significant Changes preference updated!");
    } catch (error) {
      console.error("Error updating Significant Changes preference:", error);
      toast.error("Failed to update preference. Please try again.");
    }
  };

  return (
    <main className="container mt-4">
      <ToastContainer />
      <h1 className="mb-4">Notification Settings</h1>
      <p className="lead mb-4">Manage your stock alerts and notification preferences</p>

      <div className="row">
        {/* Custom Price Alerts Section */}
        <div className="col-md-6">
          <CustomPriceAlerts alerts={alerts} setAlerts={setAlerts} tickers={tickers} />
        </div>

        {/* Notification Preferences Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="h4 mb-4">Notification Preferences</h2>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dailySummary"
                  checked={daily}
                  onChange={handleDailySummary}
                />
                <label className="form-check-label" htmlFor="dailySummary">
                  <strong>Daily Summary</strong>
                  <p className="text-muted mb-0">
                    Receive daily updates about your stocks
                  </p>
                </label>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="significantChanges"
                  checked={significant}
                  onChange={handleSignificantChange}
                />
                <label className="form-check-label" htmlFor="significantChanges">
                  <strong>Significant Changes</strong>
                  <p className="text-muted mb-0">
                    Alert on significant price changes (±
                    {Math.max(5, Math.min(percentage || 5, 100))}%)
                  </p>
                </label>
              </div>

              {significant && (
                <PriceChangeInput
                  percentage={percentage}
                  setPercentage={setPercentage}
                  significant={significant}
                  setSignificantChanges={setSignificantChanges}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Alerts;