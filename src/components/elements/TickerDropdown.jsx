import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const TickerDropdown = ({ tickers, onSelect }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredTickers, setFilteredTickers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchValue.trim()) {
      const filtered = tickers.filter(ticker =>
        ticker.toUpperCase().includes(searchValue.toUpperCase())
      );
      setFilteredTickers(filtered);
      setShowDropdown(true);
    } else {
      setFilteredTickers([]);
      setShowDropdown(false);
    }
  }, [searchValue, tickers]);

  const handleSelect = (ticker) => {
    onSelect(ticker);
    setSearchValue(ticker);
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150); // Delay to allow click event
  };

  return (
    <div className="dropdown w-100" ref={dropdownRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Search symbol..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
      />
      {showDropdown && (
        <ul
          className="dropdown-menu show w-100 mt-0"
          style={{
            maxHeight: "250px",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {filteredTickers.length > 0 ? (
            filteredTickers.map((ticker) => (
              <li key={ticker}>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => handleSelect(ticker)}
                >
                  {ticker}
                </button>
              </li>
            ))
          ) : (
            <li>
              <span className="dropdown-item disabled text-muted">
                No results found
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
TickerDropdown.propTypes = {
  tickers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TickerDropdown;

