import { useState, useEffect, useRef } from 'react';
import { purchasedStocks, savedStocks } from "../../constants/StockInfo";
import axios from "axios"; // Assuming you're using Axios for API calls

const Forecast = () => {
  // Combine and extract unique symbols from both arrays
  const allStocks = [...purchasedStocks, ...savedStocks];
  const uniqueSymbols = [...new Set(allStocks.map(stock => stock.symbol))];

  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [predictions, setPredictions] = useState({
    oneWeek: { high: '100', low: '50', confidence: '100' },
    oneMonth: null,
    oneYear: { high: 1.11, low: 12, confidence: 24.2 },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef(null);

  const handleSymbolChange = (e) => {
    setSelectedSymbol(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  const selectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
    setShowDropdown(false);
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
      setError('Please select a stock symbol.');
      return;
    }

    setLoading(true);
    setError('');
    setPredictions({ oneWeek: null, oneMonth: null, oneYear: null }); // Reset predictions

    try {
      const response = await axios.post('/api/predict', { symbol: selectedSymbol }); // Replace with your backend endpoint
      setPredictions({
        oneWeek: response.data.oneWeek || { high: '-', low: '-', confidence: '-' },
        oneMonth: response.data.oneMonth || { high: '-', low: '-', confidence: '-' },
        oneYear: response.data.oneYear || { high: '-', low: '-', confidence: '-' },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch predictions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
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
                {uniqueSymbols
                  .filter(symbol =>
                    symbol.toLowerCase().includes(selectedSymbol.toLowerCase())
                  )
                  .map(symbol => (
                    <li key={symbol}>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => selectSymbol(symbol)}
                      >
                        {symbol}
                      </button>
                    </li>
                  ))}
                {uniqueSymbols.filter(symbol =>
                  symbol.toLowerCase().includes(selectedSymbol.toLowerCase())
                ).length === 0 && (
                  <li className="dropdown-item text-muted">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

          {/* Prediction Cards */}
          <div className="row">
            {/* 1 Week Prediction */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">1 Week Prediction</h5>
                  <div className="mb-3">
                    <h6>Predicted High</h6>
                    <h4 className="text-success">${predictions.oneWeek?.high || '-'}</h4>
                  </div>
                  <div className="mb-3">
                    <h6>Predicted Low</h6>
                    <h4 className="text-danger">${predictions.oneWeek?.low || '-'}</h4>
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
                    <h6>Predicted High</h6>
                    <h4 className="text-success">${predictions.oneMonth?.high || '-'}</h4>
                  </div>
                  <div className="mb-3">
                    <h6>Predicted Low</h6>
                    <h4 className="text-danger">${predictions.oneMonth?.low || '-'}</h4>
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
                    <h6>Predicted High</h6>
                    <h4 className="text-success">${predictions.oneYear?.high || '-'}</h4>
                  </div>
                  <div className="mb-3">
                    <h6>Predicted Low</h6>
                    <h4 className="text-danger">${predictions.oneYear?.low || '-'}</h4>
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