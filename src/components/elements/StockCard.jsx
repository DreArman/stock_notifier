import PropTypes from 'prop-types';
import TrashButton from './TrashButton';

const StockCard = ({ stock, onRemove }) => {
  const handleDelete = () => {
    onRemove(stock.symbol); // Call the onRemove function with the stock symbol
  };

  return (
    <div className="col-md-4 mb-3 mt-1">
      <div className="card shadow-sm p-3 position-relative">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold">{stock.symbol}</h2>
          <TrashButton onDelete={handleDelete} /> {/* Pass handleDelete to TrashButton */}
        </div>
        <p className="text-muted">{stock.company}</p>

        {stock.quantity !== null && (
          <p>
            Quantity: <strong>{stock.quantity}</strong>
          </p>
        )}
        {stock.today !== null && (
          <p>
            Today&apos;s Price: <strong>${stock.today}</strong>
          </p>
        )}
        {stock.totalToday !== null && (
          <p>
            Today&apos;s Total: <strong>${stock.totalToday.toFixed(2)}</strong>
          </p>
        )}
        {stock.purchased !== null && (
          <p>
            Purchased Price: <strong>${stock.purchased}</strong>
          </p>
        )}
        {stock.totalPurchased !== null && (
          <p>
            Total Purchased: <strong>${stock.totalPurchased.toFixed(2)}</strong>
          </p>
        )}
        {stock.totalReturn &&
          stock.totalReturn.value !== null &&
          stock.totalReturn.percent !== null && (
            <p className="text-success fw-bold">
              Total Return: {stock.totalReturn.value} ({stock.totalReturn.percent})
            </p>
          )}
      </div>
    </div>
  );
};

StockCard.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    today: PropTypes.number,
    totalToday: PropTypes.number,
    purchased: PropTypes.number,
    totalPurchased: PropTypes.number,
    totalReturn: PropTypes.shape({
      value: PropTypes.string,
      percent: PropTypes.string,
    }),
  }).isRequired,
  onRemove: PropTypes.func.isRequired, // Add onRemove prop validation
};

export default StockCard;