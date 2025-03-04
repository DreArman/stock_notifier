import { useState } from "react";
import PropTypes from 'prop-types';

const TelegramButton = ({telegramID}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Кнопка открытия модального окна */}
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
      >
        {telegramID||"Not Linked"}
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5">Modal title</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-0">
                <p>
                  This is a modal sheet, a variation of the modal that docs
                  itself to the bottom of the viewport like the newer share
                  sheets in iOS.
                </p>
              </div>
              <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                <button
                  type="button"
                  className="btn btn-lg btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-lg btn-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Затемнение фона при открытии модального окна */}
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};
TelegramButton.propTypes = {
  telegramID: PropTypes.string
};

export default TelegramButton;
