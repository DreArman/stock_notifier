import { useState, useEffect, useRef } from 'react';
import { getStockTickers } from '../../services/stockService';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forecast = () => {
  const [tickers, setTickers] = useState([]); // State to store tickers
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted item
  const [predictions, setPredictions] = useState({
    oneWeek: { cost: '-', confidence: '-' },
    oneMonth: { cost: '-', confidence: '-' },
    oneYear: { cost: '-', confidence: '-' },
  });
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch tickers on component mount
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const data = await getStockTickers();
        setTickers(data.tickers); // Set tickers in state
      } catch {
        toast.error("Failed to fetch stock tickers.");
      }
    };

    fetchTickers();
  }, []);

  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
    setHighlightedIndex(-1); // Reset highlighted index
  };

  const selectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
    setShowDropdown(false); // Hide dropdown after selection
    setHighlightedIndex(-1); // Reset highlighted index
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    const filteredTickers = tickers.filter((ticker) =>
      ticker.toLowerCase().includes(selectedSymbol.toLowerCase())
    );

    if (e.key === "ArrowDown") {
      // Move down in the list
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredTickers.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      // Move up in the list
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredTickers.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      // Select the highlighted item
      selectSymbol(filteredTickers[highlightedIndex]);
      e.preventDefault(); // Prevent form submission
    } else if (e.key === "Escape") {
      // Close the dropdown
      setShowDropdown(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false); // Close dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePredict = async () => {
    if (!selectedSymbol) {
      toast.error('Please select a stock symbol.');
      return;
    }

    // Validate the selected symbol against the tickers list
    if (!tickers.includes(selectedSymbol.toUpperCase())) {
      toast.error('Invalid stock symbol. Please select from the list.');
      return;
    }

    setLoading(true);
    setPredictions({ oneWeek: null, oneMonth: null, oneYear: null }); // Reset predictions

    try {
      const response = await axios.post('/api/predict', { symbol: selectedSymbol }); // Replace with your backend endpoint
      setPredictions({
        oneWeek: response.data.oneWeek || { cost: '-', confidence: '-' },
        oneMonth: response.data.oneMonth || { cost: '-', confidence: '-' },
        oneYear: response.data.oneYear || { cost: '-', confidence: '-' },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="mb-4">AI Stock Predictor</h1>
          <p className="lead mb-5">Get AI-powered predictions for your favorite stocks</p>

          {/* Stock Ticker Input with Dropdown */}
          <div className="mb-5 mx-auto position-relative" style={{ maxWidth: '400px' }} ref={dropdownRef}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Stock ticker"
                aria-label="Stock ticker"
                value={selectedSymbol}
                onChange={handleSymbolChange}
                onKeyDown={handleKeyDown} // Handle arrow keys and Enter
                onClick={() => setShowDropdown(true)}
              />
              <button className="btn btn-primary" type="button" onClick={handlePredict} disabled={loading}>
                {loading ? 'Loading...' : 'Predict'}
              </button>
            </div>

            {/* Enhanced Dropdown Menu */}
            {showDropdown && (
              <ul
                className="dropdown-menu show w-100"
                style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  position: 'absolute',
                  zIndex: 1000,
                }}
              >
                {tickers
                  .filter(symbol =>
                    symbol.toLowerCase().includes(selectedSymbol.toLowerCase())
                  )
                  .map((symbol, index) => (
                    <li
                      key={symbol}
                      className={`dropdown-item ${
                        index === highlightedIndex ? "active" : ""
                      }`}
                      onMouseEnter={() => setHighlightedIndex(index)} // Highlight on hover
                      onClick={() => selectSymbol(symbol)}
                    >
                      {symbol}
                    </li>
                  ))}
                {tickers.filter(symbol =>
                  symbol.toLowerCase().includes(selectedSymbol.toLowerCase())
                ).length === 0 && (
                  <li className="dropdown-item text-muted">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Prediction Cards */}
          <div className="row">
            {/* 1 Week Prediction */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">1 Week Prediction</h5>
                  <div className="mb-3">
                    <h6>Predicted Cost</h6>
                    <h4 className="text-success">${predictions.oneWeek?.cost || '-'}</h4>
                  </div>
                  <div>
                    <h6>Confidence</h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${predictions.oneWeek?.confidence || 0}%` }}
                        aria-valuenow={predictions.oneWeek?.confidence || 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {predictions.oneWeek?.confidence || '-'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1 Month Prediction */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">1 Month Prediction</h5>
                  <div className="mb-3">
                    <h6>Predicted Cost</h6>
                    <h4 className="text-success">${predictions.oneMonth?.cost || '-'}</h4>
                  </div>
                  <div>
                    <h6>Confidence</h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${predictions.oneMonth?.confidence || 0}%` }}
                        aria-valuenow={predictions.oneMonth?.confidence || 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {predictions.oneMonth?.confidence || '-'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1 Year Prediction */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">1 Year Prediction</h5>
                  <div className="mb-3">
                    <h6>Predicted Cost</h6>
                    <h4 className="text-success">${predictions.oneYear?.cost || '-'}</h4>
                  </div>
                  <div>
                    <h6>Confidence</h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${predictions.oneYear?.confidence || 0}%` }}
                        aria-valuenow={predictions.oneYear?.confidence || 0}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {predictions.oneYear?.confidence || '-'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-5 text-muted small">
            <p>© Predictions are based on historical data and market analysis. Past performance doesn&apos;t guarantee future results.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Forecast;