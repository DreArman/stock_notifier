import { useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const ViewHistory = ({ data, onClose }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'week', 'month', 'year'

  // Filter data based on selected filter
  const filteredData = filter === 'all' 
    ? data 
    : data.filter(item => item.type === filter);

  // Sort data by predicted date in ascending order
const sortedData = [...filteredData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Prediction History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="me-2">Filter by:</label>
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('week')}
            >
              1 Week
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('month')}
            >
              1 Month
            </button>
            <button 
              type="button" 
              className={`btn ${filter === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('year')}
            >
              1 Year
            </button>
          </div>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {sortedData.length > 0 ? (
            Object.entries(
              sortedData.reduce((acc, item) => {
                const key = item.timestamp;
                if (!acc[key]) {
                  acc[key] = [];
                }
                acc[key].push(item);
                return acc;
              }, {})
            ).map(([timestamp, predictions]) => (
              <div key={timestamp} className="mb-4">
                <h6 className="text-muted">
                  Stock: {predictions[0].ticker} | Prediction from {format(new Date(timestamp), 'PPpp')}
                </h6>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Period</th>
                      <th>Predicted Date</th>
                      <th>Predicted Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.map((prediction, index) => (
                      <tr key={index}>
                        <td>
                          {prediction.type === 'week' && '1 Week'}
                          {prediction.type === 'month' && '1 Month'}
                          {prediction.type === 'year' && '1 Year'}
                        </td>
                        <td>{format(new Date(prediction.date), 'PPP')}</td>
                        <td>${prediction.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))
          ) : (
            <p className="text-muted">No predictions available.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

ViewHistory.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  ticker: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewHistory;