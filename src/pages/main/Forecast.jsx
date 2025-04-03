import { useState, useEffect, useRef } from 'react';
import { purchasedStocks, savedStocks } from "../../constants/StockInfo";

const Forecast = () => {
  // Combine and extract unique symbols from both arrays
  const allStocks = [...purchasedStocks, ...savedStocks];
  const uniqueSymbols = [...new Set(allStocks.map(stock => stock.symbol))];

  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
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
              <button className="btn btn-primary" type="button">Predict</button>
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

          {/* Prediction Cards */}
          <div className="row">
            {/* 1 Week Prediction */}
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">1 Week Prediction</h5>
                  <div className="mb-3">
                    <h6>Predicted High</h6>
                    <h4 className="text-success">$189.45</h4>
                  </div>
                  <div className="mb-3">
                    <h6>Predicted Low</h6>
                    <h4 className="text-danger">$182.30</h4>
                  </div>
                  <div>
                    <h6>Confidence</h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: '85%' }}
                        aria-valuenow="85"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        85%
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
                    <h4 className="text-success">$195.60</h4>
                  </div>
                  <div className="mb-3">
                    <h6>Predicted Low</h6>
                    <h4 className="text-danger">$178.90</h4>
                  </div>
                  <div>
                    <h6>Confidence</h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: '75%' }}
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        75%
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
                    <h4 className="text-success">$245.80</h4>
                  </div>
                  <div className="mb-3">
                    <h6>Predicted Low</h6>
                    <h4 className="text-danger">$245.80</h4>
                  </div>
                  <div>
                    <h6>Confidence</h6>
                    <div className="progress">
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: '60%' }}
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        60%
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
