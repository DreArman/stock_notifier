import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AlertCard from '../../components/elements/AlertCard'; // Import the AlertCard component

const NotificationSettings = () => {
  const [alerts, setAlerts] = useState([
    { symbol: 'AAPL', above: 190.0, below: 170.0 },
    { symbol: 'TSLA', above: 250.0, below: 220.0 }
  ]);

  const [notificationPrefs, setNotificationPrefs] = useState({
    dailySummary: true,
    marketOpenClose: true,
    significantChanges: true
  });

  const [newAlert, setNewAlert] = useState({ symbol: '', above: '', below: '' });
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null); // State for current stock price
  const dropdownRef = useRef(null);

  // Example stock symbols with current prices (replace with your actual stock data)
  const stockSymbols = [
    { symbol: 'AAPL', price: 180.0 },
    { symbol: 'TSLA', price: 240.0 },
    { symbol: 'GOOGL', price: 2800.0 },
    { symbol: 'AMZN', price: 3300.0 },
    { symbol: 'MSFT', price: 300.0 },
    { symbol: 'NFLX', price: 500.0 },
    { symbol: 'META', price: 350.0 }
  ];

  const handlePrefChange = (pref) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [pref]: !notificationPrefs[pref]
    });
  };

  const handleAddAlert = () => {
    const selectedStock = stockSymbols.find(
      (stock) => stock.symbol.toLowerCase() === newAlert.symbol.toLowerCase()
    );

    if (!selectedStock) {
      toast.error('Stock symbol is not valid or not in the list.');
      return;
    }

    const above = parseFloat(newAlert.above) || null;
    const below = parseFloat(newAlert.below) || null;

    if (above && above < selectedStock.price) {
      toast.error('Above price must be greater than the current price.');
      return;
    }

    if (below && below > selectedStock.price) {
      toast.error('Below price must be less than the current price.');
      return;
    }

    setAlerts([
      ...alerts,
      {
        symbol: selectedStock.symbol.toUpperCase(),
        above,
        below
      }
    ]);
    setNewAlert({ symbol: '', above: '', below: '' });
    setShowAddAlert(false);
  };

  const removeAlert = (symbol) => {
    const updatedAlerts = alerts.filter((alert) => alert.symbol !== symbol);
    setAlerts(updatedAlerts);
  };

  const handleSymbolChange = (e) => {
    const symbol = e.target.value;
    setNewAlert({ ...newAlert, symbol });
    setShowDropdown(true);

    const selectedStock = stockSymbols.find(
      (stock) => stock.symbol.toLowerCase() === symbol.toLowerCase()
    );

    if (selectedStock) {
      setCurrentPrice(selectedStock.price); // Update current price if stock is valid
    } else {
      setCurrentPrice(null); // Reset current price if stock is invalid
    }
  };

  const selectSymbol = (symbol) => {
    const selectedStock = stockSymbols.find(
      (stock) => stock.symbol.toLowerCase() === symbol.toLowerCase()
    );

    setNewAlert({ ...newAlert, symbol });
    setCurrentPrice(selectedStock ? selectedStock.price : null); // Update current price
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <main className="container mt-4">
      <ToastContainer />
      <h1 className="mb-4">Notification Settings</h1>
      <p className="lead mb-4">Manage your stock alerts and notification preferences</p>

      <div className="row">
        {/* Custom Price Alerts Section */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h4 mb-4">Custom Price Alerts</h2>

              {/* Scrollable Alert List */}
              <div
                className="mb-4"
                style={{
                  maxHeight: '350px',
                  overflowY: 'auto',
                  padding: '5px',
                }}
              >
                {alerts.map((alert) => (
                  <AlertCard
                    key={alert.symbol}
                    alert={alert}
                    onClick={removeAlert} // Pass the removeAlert function
                  />
                ))}
              </div>

              {showAddAlert ? (
                <div className="mb-4 p-3 border rounded" ref={dropdownRef}>
                  <div className="mb-3 position-relative">
                    <label className="form-label">Stock Symbol</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. AAPL"
                      value={newAlert.symbol}
                      onChange={handleSymbolChange}
                      onClick={() => setShowDropdown(true)}
                    />
                    {showDropdown && (
                      <ul
                        className="dropdown-menu show w-100"
                        style={{
                          maxHeight: '200px',
                          overflowY: 'auto',
                          position: 'absolute',
                          zIndex: 1000
                        }}
                      >
                        {stockSymbols
                          .filter((stock) =>
                            stock.symbol
                              .toLowerCase()
                              .includes(newAlert.symbol.toLowerCase())
                          )
                          .map((stock) => (
                            <li key={stock.symbol}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => selectSymbol(stock.symbol)}
                              >
                                {stock.symbol}
                              </button>
                            </li>
                          ))}
                        {stockSymbols.filter((stock) =>
                          stock.symbol
                            .toLowerCase()
                            .includes(newAlert.symbol.toLowerCase())
                        ).length === 0 && (
                          <li className="dropdown-item text-muted">
                            No results found
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  {currentPrice && (
                    <p className="text-muted">
                      Current Price: <strong>${currentPrice.toFixed(2)}</strong>
                    </p>
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
                            setNewAlert({ ...newAlert, above: e.target.value })
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
                            setNewAlert({ ...newAlert, below: e.target.value })
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
                  checked={notificationPrefs.dailySummary}
                  onChange={() => handlePrefChange('dailySummary')}
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
                  id="marketOpenClose"
                  checked={notificationPrefs.marketOpenClose}
                  onChange={() => handlePrefChange('marketOpenClose')}
                />
                <label className="form-check-label" htmlFor="marketOpenClose">
                  <strong>Market Open/Close</strong>
                  <p className="text-muted mb-0">
                    Get notified at market open and close
                  </p>
                </label>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="significantChanges"
                  checked={notificationPrefs.significantChanges}
                  onChange={() => handlePrefChange("significantChanges")}
                />
                <label className="form-check-label" htmlFor="significantChanges">
                  <strong>Significant Changes</strong>
                  <p className="text-muted mb-0">
                    Alert on significant price changes (±
                    {Math.max(
                      5,
                      Math.min(
                        notificationPrefs.priceChangePercentage || 5,
                        100
                      )
                    )}
                    %)
                  </p>
                </label>
              </div>

              {/* Show input field only if "Significant Changes" is enabled */}
              {notificationPrefs.significantChanges && (
                <div className="mb-3">
                  <label className="form-label">Price Change Percentage</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter percentage (5-100)"
                    value={notificationPrefs.priceChangePercentage || ""}
                    onChange={(e) => {
                      setNotificationPrefs({
                        ...notificationPrefs,
                        priceChangePercentage: e.target.value, // Allow user to type any number
                      });
                    }}
                    onBlur={() => {
                      // Replace invalid numbers after editing
                      const value = parseInt(notificationPrefs.priceChangePercentage, 10);
                      if (isNaN(value) || value < 5) {
                        setNotificationPrefs({ ...notificationPrefs, priceChangePercentage: 5 });
                      } else if (value > 100) {
                        setNotificationPrefs({ ...notificationPrefs, priceChangePercentage: 100 });
                      }
                    }}
                  />
                  <p className="text-muted mt-1">
                    Set the percentage change for significant price alerts.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotificationSettings;