import PropTypes from 'prop-types';

const StockCard = ({ stock }) => {
  return (
    <div className="col-md-4 mb-3 mt-1">
      <div className="card shadow-sm p-3">
        <h2 className="fw-bold">{stock.symbol}</h2>
        <p className="text-muted">{stock.company}</p>

        <p>Quantity: <strong>{stock.quantity}</strong></p>
        <p>Current Price: <strong>${stock.current}</strong></p>
        <p>Total Current: <strong>${stock.totalCurrent.toFixed(2)}</strong></p>
        
        <p>Purchased Price: <strong>${stock.purchased}</strong></p>
        <p>Total Purchased: <strong>${stock.totalPurchased.toFixed(2)}</strong></p>

        <p className="text-success fw-bold">
          Total Return: {stock.totalReturn.value} ({stock.totalReturn.percent})
        </p>
      </div>
    </div>
  );
};

StockCard.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired, 
    current: PropTypes.number.isRequired,
    totalCurrent: PropTypes.number.isRequired,
    purchased: PropTypes.number.isRequired,
    totalPurchased: PropTypes.number.isRequired,
    totalReturn: PropTypes.shape({
      value: PropTypes.string.isRequired,
      percent: PropTypes.string.isRequired,    
  }).isRequired,
  }).isRequired,
};

export default StockCard;