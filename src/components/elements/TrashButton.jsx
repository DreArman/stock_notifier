import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const TrashButton = ({ onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);

  useEffect(() => {
    const dontAsk = localStorage.getItem('dontAskAgain');
    if (dontAsk === 'true') {
      setDontAskAgain(true);
    }
  }, []);

  const handleDeleteClick = () => {
    if (dontAskAgain) {
      onDelete();
    } else {
      setShowConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleDontAskAgainChange = (e) => {
    const checked = e.target.checked;
    setDontAskAgain(checked);
    localStorage.setItem('dontAskAgain', checked);
  };

  return (
    <>
      <button className="btn btn-link p-0" onClick={handleDeleteClick} aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
      </button>

      {showConfirm && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5">Confirm Delete</h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleCancelDelete}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <p>Are you sure you want to remove this stock?</p>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="dontAskAgain"
                  checked={dontAskAgain}
                  onChange={handleDontAskAgainChange}
                />
                <label className="form-check-label" htmlFor="dontAskAgain">
                  Don&apos;t ask me again
                </label>
              </div>
            </div>
            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
              <button type="button" className="btn btn-lg btn-danger" onClick={handleConfirmDelete}>
                Yes, Remove
              </button>
              <button type="button" className="btn btn-lg btn-secondary" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirm && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

TrashButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default TrashButton;