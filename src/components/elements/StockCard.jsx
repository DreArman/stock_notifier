import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TrashButton from "./TrashButton";
import { getStockData } from "../../services/stockService";

const StockCard = ({ stock, onRemove }) => {
  const [stockData, setStockData] = useState(null); // State to store the first element of stock data

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const data = await getStockData(stock.ticker_id); // Fetch stock data
        console.log("Fetched stock data:", data); // Log the fetched data
        if (data && data.length > 0) {
          setStockData(data[0]); // Set the first element of the array
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [stock.ticker_id]); // Re-run if the ticker_id changes

  const handleDelete = () => {
    onRemove(stock.id); // Call the onRemove function with the stock symbol
  };

  if (!stockData) {
    return (
      <div className="col-md-4 mb-3 mt-1">
        <div className="card shadow-sm p-3 position-relative">
          <p>Loading stock data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-4 mb-3 mt-1">
      <div className="card shadow-sm p-3 position-relative">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">{stock.stock_name}</h2>
          <TrashButton onDelete={handleDelete} /> {/* Pass handleDelete to TrashButton */}
        </div>
        <p className="text-muted">{stockData.name}</p>

        {stock.quantity !== null && (
          <p>
            Quantity: <strong>{stock.quantity}</strong>
          </p>
        )}
        {stockData.price !== null && (
          <p>
            Today&apos;s Price: <strong>${stockData.price}</strong>
          </p>
        )}
        {stock.quantity !== null && (
          <p>
            Today&apos;s Total: <strong>${stockData.price * stock.quantity}</strong>
          </p>
        )}
        {stock.purchase_price !== null && (
          <p>
            Purchased Price: <strong>${stock.purchase_price}</strong>
          </p>
        )}
        {stock.total_price !== null && (
          <p>
            Total Purchased: <strong>${stock.total_price.toFixed(2)}</strong>
          </p>
        )}
        {stock.quantity !== null &&
          stock.purchase_price !== null &&
          stock.total_price !== null && (
          (() => {
            const totalReturn = stockData.price * stock.quantity - stock.total_price;
            const returnPercentage =
              ((totalReturn / stock.total_price) * 100).toFixed(2);

            return (
              <p
                className={`fw-bold ${
                  totalReturn >= 0 ? "text-success" : "text-danger"
                }`}
              >
                Total Return: {totalReturn} ({returnPercentage}%)
              </p>
            );
          })()
        )}
      </div>
    </div>
  );
};

StockCard.propTypes = {
  stock: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ticker_id: PropTypes.number.isRequired,
    stock_name: PropTypes.string.isRequired,
    purchase_price: PropTypes.number,
    quantity: PropTypes.number,
    total_price: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func.isRequired, // Add onRemove prop validation
};

export default StockCard;