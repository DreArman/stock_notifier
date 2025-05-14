import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomPriceAlerts from "../../components/CustomPriceAlerts";
import PriceChangeInput from "../../components/elements/PriceChangeInput";
import { setDailySummary, setSignificantChanges, getAlerts, getCustomAlerts } from "../../services/alertService";

const Alerts = () => {
  const [daily, setDailyStatus] = useState(false);
  const [significant, setSignificantStatus] = useState(false);
  const [percentage, setPercentage] = useState(5);
  const [alerts, setAlerts] = useState([]);
  const [linked, setLinked] = useState(false);

  useEffect(() => {
    const checkForTelegram = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.user_telegram_id < 100000000 || user.user_telegram_id > 9999999999 || user.user_telegram_id === null) {
          setLinked(false);
          toast.error("Your Telegram account is not linked. Please link it to receive alerts.", {
            autoClose: 2000,
          });
        } else {
          setLinked(true);
        }
      } catch (error) {
        console.error("Error checking Telegram ID:", error);
      }
    };
    checkForTelegram();

    const fetchCustomAlerts = async () => {
      try {
        const data = await getCustomAlerts();
        if (data) {
          const customAlerts = data.map((alert) => ({
            symbol: alert.ticker,
            status: alert.status,
            above: alert.above_price,
            below: alert.below_price,
          }));
          setAlerts(customAlerts);
        }
        console.log("Custom alerts fetched:", data);
      } catch (error) {
        console.error("Error fetching custom alerts:", error);
        toast.error("Failed to fetch custom alerts. Please try again later.", {
          autoClose: 1000,
        });
      }
    };
    fetchCustomAlerts();

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
        toast.error("Failed to fetch alerts. Please try again later.", {
          autoClose: 1000,
        });
      }
    };
    fetchAlerts();
  }, []);

  const handleDailySummary = async () => {
    const newState = !daily; // Toggle the state
    setDailyStatus(newState); // Update the local state

    try {
      await setDailySummary(newState); // Save the preference to the backend
      toast.success("Daily Summary preference updated!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating Daily Summary preference:", error);
      toast.error("Failed to update preference. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  const handleSignificantChange = async () => {
    const newState = !significant; // Toggle the state
    setSignificantStatus(newState); // Update the local state

    try {
      await setSignificantChanges(newState, percentage); // Save the preference to the backend
      toast.success("Significant Changes preference updated!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error updating Significant Changes preference:", error);
      toast.error("Failed to update preference. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <main className="container mt-4">
      <ToastContainer />
      <h1 className="mb-4">Notification Settings</h1>
      <p className="lead mb-4">Manage your stock alerts and notification preferences</p>

      {/* Warning Message for Telegram Linking */}
      {!linked && (
        <div className="alert alert-red text-center">
          <p className="mb-0">
            Your Telegram account is not linked.{" "}
            <a
              href="/link-telegram"
              className="text-decoration-underline text-white"
              style={{ fontWeight: "bold" }}
            >
              Link your Telegram account
            </a>{" "}
            to receive alerts.
          </p>
        </div>
      )}

      <div className="row">
        {/* Custom Price Alerts Section */}
        <div className="col-md-6">
          <CustomPriceAlerts alerts={alerts} setAlerts={setAlerts} />
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