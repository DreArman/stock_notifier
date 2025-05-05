import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { getStockTickers, addStock } from "../../services/stockService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStockButton = ({ type }) => {
  // State variables
  const [isOpen, setIsOpen] = useState(false); // Modal visibility
  const [tickers, setTickers] = useState([]); // List of stock tickers
  const [selectedTicker, setSelectedTicker] = useState(""); // Selected ticker
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown visibility
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Highlighted dropdown item
  const dropdownRef = useRef(null); // Reference for dropdown

  // Fetch tickers on component mount
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const data = await getStockTickers();
        setTickers(data.tickers); // Set tickers in state
      } catch (error) {
        toast.error("Failed to fetch stock tickers.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        console.error("Error fetching stock tickers:", error);
      }
    };
    fetchTickers();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle ticker input change
  const handleTickerChange = (e) => {
    setSelectedTicker(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
    setHighlightedIndex(-1); // Reset highlighted index
  };

  // Handle ticker selection
  const selectTicker = (ticker) => {
    setSelectedTicker(ticker);
    setShowDropdown(false); // Hide dropdown after selection
    setHighlightedIndex(-1); // Reset highlighted index
  };

  // Handle keyboard navigation in dropdown
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    const filteredTickers = tickers.filter((ticker) =>
      ticker.toLowerCase().includes(selectedTicker.toLowerCase())
    );

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredTickers.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredTickers.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      selectTicker(filteredTickers[highlightedIndex]);
      e.preventDefault(); // Prevent form submission
    } else if (e.key === "Escape") {
      setShowDropdown(false); // Close dropdown
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  
  // Handle stock submission
  const handleStockSubmit = async (e) => {
    e.preventDefault();
    const quantity = type === "purchased" ? parseInt(e.target.quantity?.value, 10) : null;
    const price = type === "purchased" ? parseFloat(e.target.price?.value) : null;
    const purchasedDate =
      type === "purchased" && e.target.purchased_date?.value
        ? new Date(e.target.purchased_date.value).toISOString() // Convert to ISO format
        : null;
  
    // Validate the selected ticker
    if (!tickers.includes(selectedTicker.toUpperCase())) {
      toast.error("Invalid stock ticker. Please select from the list.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }
  
    try {
      // Add stock to the backend
      const data = await addStock(
        selectedTicker,
        type,
        price,
        quantity,
        purchasedDate,
      );
      console.log("Stock added successfully:", data);
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error adding stock:", error);
      toast.error("Failed to add stock. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <button className="btn btn-dark btn-lg" onClick={() => setIsOpen(true)}>
        + Add New Stock
      </button>

      {isOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5">Add New Stock</h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              ></button>
            </div>
            <form className="modal-body py-0" onSubmit={handleStockSubmit}>
              <p>Write down your stock info</p>
              <div className="position-relative" ref={dropdownRef}>
                <input
                  id="ticker"
                  name="ticker"
                  type="text"
                  className="form-control mb-md-2"
                  placeholder="Ticker: AAPL"
                  value={selectedTicker}
                  onChange={handleTickerChange}
                  onKeyDown={handleKeyDown} // Handle arrow keys and Enter
                  onClick={() => setShowDropdown(true)}
                  required
                />
                {showDropdown && (
                  <ul
                    className="dropdown-menu show w-100"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      position: "absolute",
                      zIndex: 1000,
                    }}
                  >
                    {tickers
                      .filter((ticker) =>
                        ticker.toLowerCase().includes(selectedTicker.toLowerCase())
                      )
                      .map((ticker, index) => (
                        <li
                          key={ticker}
                          className={`dropdown-item ${
                            index === highlightedIndex ? "active" : ""
                          }`}
                          onMouseEnter={() => setHighlightedIndex(index)} // Highlight on hover
                          onClick={() => selectTicker(ticker)}
                        >
                          {ticker}
                        </li>
                      ))}
                    {tickers.filter((ticker) =>
                      ticker.toLowerCase().includes(selectedTicker.toLowerCase())
                    ).length === 0 && (
                      <li className="dropdown-item text-muted">No results found</li>
                    )}
                  </ul>
                )}
              </div>
              {type === "purchased" && (
                <>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    className="form-control mb-md-2"
                    placeholder="Quantity: number"
                    required
                  />
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    className="form-control mb-md-2"
                    placeholder="Price: number"
                    required
                  />
                  <input
                    id="purchased_date"
                    name="purchased_date"
                    type="datetime-local" // Changed from "date" to "datetime-local"
                    className="form-control mb-md-2"
                    required
                  />
                </>
              )}
              <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                <button type="submit" className="btn btn-lg btn-primary">
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

AddStockButton.propTypes = {
  type: PropTypes.string.isRequired,
  onAddStock: PropTypes.func.isRequired, // Add callback prop validation
};

export default AddStockButton;
