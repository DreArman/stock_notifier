import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getStockData } from "../../services/stockService";

const AddAlertForm = ({ setShowAddAlert, alerts, setAlerts, tickers }) => {
  const [newAlert, setNewAlert] = useState({ symbol: "", above: "", below: "" });
  const [todaysPrice, setTodaysPrice] = useState(null);
  const [stockDetails, setStockDetails] = useState(null);
  const dropdownRef = useRef(null);

  const handleSymbolBlur = async () => {
    const symbol = newAlert.symbol.trim();

    const selectedStock = tickers.find(
      (stock) => stock.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (selectedStock) {
      try {
        const data = await getStockData(selectedStock.id);
        setTodaysPrice(data.price);
        setStockDetails({
          open_price: data.open_price,
          high_price: data.high_price,
          low_price: data.low_price,
          dividend: data.dividend,
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
        toast.error("Failed to fetch stock data. Please try again later.");
      }
    } else {
      toast.error("Stock symbol is not valid or not in the list.");
      setTodaysPrice(null);
      setStockDetails(null);
    }
  };

  const handleAddAlert = () => {
    const selectedStock = tickers.find(
      (stock) => stock.symbol.toLowerCase() === newAlert.symbol.toLowerCase()
    );

    if (!selectedStock) {
      toast.error("Stock symbol is not valid or not in the list.");
      return;
    }

    const above = parseFloat(newAlert.above) || null;
    const below = parseFloat(newAlert.below) || null;

    if (above && above < selectedStock.price) {
      toast.error("Above price must be greater than the current price.");
      return;
    }

    if (below && below > selectedStock.price) {
      toast.error("Below price must be less than the current price.");
      return;
    }

    setAlerts([
      ...alerts,
      {
        symbol: selectedStock.symbol.toUpperCase(),
        above,
        below,
      },
    ]);
    setNewAlert({ symbol: "", above: "", below: "" });
    setShowAddAlert(false);
  };

  return (
    <div className="mb-4 p-3 border rounded" ref={dropdownRef}>
      <div className="mb-3 position-relative">
        <label className="form-label">Stock Symbol</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. AAPL"
          value={newAlert.symbol}
          onChange={(e) => setNewAlert({ ...newAlert, symbol: e.target.value })}
          onBlur={handleSymbolBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSymbolBlur();
          }}
        />
      </div>

      {todaysPrice && (
        <div className="mt-3">
          <p className="text-muted">
            Current Price: <strong>${todaysPrice.toFixed(2)}</strong>
          </p>
          {stockDetails && (
            <ul className="list-unstyled">
              <li>
                <u>Open Price:</u> ${stockDetails.open_price.toFixed(2)}
              </li>
              <li>
                <u>High Price:</u> ${stockDetails.high_price.toFixed(2)}
              </li>
              <li>
                <u>Low Price:</u> ${stockDetails.low_price.toFixed(2)}
              </li>
              <li>
                <u>Dividend:</u> ${stockDetails.dividend.toFixed(2)}
              </li>
            </ul>
          )}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-2">
          <label className="form-label">Above</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              placeholder="Price"
              value={newAlert.above}
              onChange={(e) =>
                setNewAlert({ ...newAlert, above: e.target.value, below: "" })
              }
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
              placeholder="Price"
              value={newAlert.below}
              onChange={(e) =>
                setNewAlert({ ...newAlert, below: e.target.value, above: "" })
              }
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => setShowAddAlert(false)}
        >
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
  tickers: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      price: PropTypes.number,
    })
  ).isRequired,
};

export default AddAlertForm;