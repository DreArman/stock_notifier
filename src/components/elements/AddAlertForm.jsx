import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getStockData, getStockTickers } from "../../services/stockService";
import { setCustomAlert } from "../../services/alertService";

const AddAlertForm = ({ setShowAddAlert, alerts, setAlerts }) => {
  const [newAlert, setNewAlert] = useState({ symbol: "", status: false, above: "", below: "" });
  const [todaysPrice, setTodaysPrice] = useState(null);
  const [tickers, setTickers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    console.log("AddAlertForm mounted");
    const fetchTickers = async () => {
      try {
        const data = await getStockTickers();
        setTickers(data.tickers);
        console.log("Fetched stock tickers:", data.tickers);
      } catch {
        toast.error("Failed to fetch stock tickers.");
      }
    };
    fetchTickers();
  }, []);

  // Getting Data of Selected Ticker
  const handleSymbolChange = (e) => {
    const value = e.target.value.toUpperCase();
    setNewAlert({ ...newAlert, symbol: value });

    if (value.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSymbolSelect = (ticker) => {
    setNewAlert({ ...newAlert, symbol: ticker });
    setShowDropdown(false);
    const ticker_id = tickers.findIndex((t) => t === ticker) + 1;
    if (ticker_id !== -1) {
      fetchStockDetails(ticker_id);
    } else {
      toast.error("Selected ticker not found.");
    }
  };

  const fetchStockDetails = async (id) => {
    try {
      const data = await getStockData(id);
      console.log("Fetched stock data:", data);
      if (data && data[0].price !== undefined) {
        setTodaysPrice(data[0].price);
      } else {
        toast.error("Invalid stock data received.");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      toast.error("Failed to fetch stock data.");
    }
  };

  const handleAddAlert = async () => {
    const symbol = newAlert.symbol.trim().toUpperCase();
    const above = newAlert.above ? parseFloat(newAlert.above) : null;
    const below = newAlert.below ? parseFloat(newAlert.below) : null;
  
    // Validate symbol
    if (!symbol) {
      toast.error("Enter a stock symbol.");
      return;
    }
  
    // Validate at least one of 'above' or 'below' is filled
    if (above === null && below === null) {
      toast.error("Enter a price for either 'Above' or 'Below'.");
      return;
    }
  
    // Check if the alert for the symbol already exists
    if (alerts.some((a) => a.symbol === symbol && a.status)) {
      toast.error("Alert for this symbol already exists.");
      return;
    }
  
    // Save the alert to the backend
    try {
      await setCustomAlert(symbol, true, above, below);
      toast.success("Custom alert set successfully!");
    } catch (error) {
      console.error("Error setting custom alert:", error);
      toast.error("Failed to set custom alert. Please try again later.");
      return;
    }
  
    // Update the alerts state and reset the form
    setAlerts([...alerts, { ...newAlert, symbol, status: true }]);
    setShowAddAlert(false);
    setNewAlert({ symbol: "", status: false, above: "", below: "" });
    setTodaysPrice(null);
  };

  return (
    <div className="mb-4 p-3 border rounded position-relative">
      <div className="mb-3">
        <label className="form-label">Stock Symbol</label>
        <input
          className="form-control"
          type="text"
          placeholder="e.g. AAPL"
          value={newAlert.symbol}
          onChange={handleSymbolChange}
        />
        {showDropdown && (
          <ul className="list-group mt-1 position-absolute w-100 z-3" style={{ maxHeight: 200, overflowY: "auto" }}>
            {tickers
              .filter((ticker) => ticker.includes(newAlert.symbol.toUpperCase()))
              .map((ticker) => (
                <li key={ticker} className="list-group-item list-group-item-action" onClick={() => handleSymbolSelect(ticker)}>
                  {ticker}
                </li>
              ))}
          </ul>
        )}
      </div>

      {todaysPrice && (
        <div className="mt-3">
          <p className="text-muted">
            Today Price: <strong>${todaysPrice.toFixed(2)}</strong>
          </p>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-2">
          <label className="form-label">Above</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={newAlert.above}
            onChange={(e) =>
              setNewAlert({ ...newAlert, above: e.target.value })
            }
          />
        </div>
        <div className="col-md-6 mb-2">
          <label className="form-label">Below</label>
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={newAlert.below}
            onChange={(e) =>
              setNewAlert({ ...newAlert, below: e.target.value })
            }
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-outline-secondary me-2" onClick={() => setShowAddAlert(false)}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleAddAlert}>
          Save Alert
        </button>
      </div>
    </div>
  );
};

AddAlertForm.propTypes = {
  setShowAddAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  setAlerts: PropTypes.func.isRequired,
};

export default AddAlertForm;
