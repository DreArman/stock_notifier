import { useState } from "react";
import PropTypes from "prop-types";
import { addStock } from "../../services/stockService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStockButton = ({ type, onAddStock }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    const stockTicker = e.target.ticker.value.trim();
    const quantity = type === "purchased" ? parseInt(e.target.quantity.value, 10) : null;
    const price = type === "purchased" ? parseFloat(e.target.price.value) : null;

    if (!stockTicker) {
      toast.error("Stock Name and Ticker are required.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      return;
    }

    try {
      // Add stock to the backend
      const data = await addStock({ stock_ticker: stockTicker, type });
      console.log("Stock added successfully:", data);

      // Add stock to the local state
      const newStock = {
        symbol: stockTicker.toUpperCase(),
        quantity: quantity || null,
        purchased: price || null,
        today: price || null, // Placeholder for current price
        totalToday: quantity && price ? quantity * price : null,
        totalPurchased: quantity && price ? quantity * price : null,
        totalReturn: null, // Placeholder for total return
      };

      onAddStock(newStock); // Update the stock list in the parent component
      toast.success("Stock added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      setIsOpen(false);
    } catch (error) {
      toast.error("Error adding stock. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
      console.error("Error adding stock:", error);
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
              <input
                id="ticker"
                name="ticker"
                type="text"
                className="form-control mb-md-2"
                placeholder="Ticker: AAPL"
                required
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
                }}
              />
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
