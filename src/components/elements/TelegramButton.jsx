import { useState } from "react";
import PropTypes from 'prop-types';

const TelegramButton = ({ telegramID, onLinkTelegram }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");

  const handleLinkTelegram = () => {
    onLinkTelegram(code);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
      >
        {telegramID || "Not Linked"}
      </button>

      {isOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-content rounded-4 shadow">
              <div className="modal-header border-bottom-0">
                <h1 className="modal-title fs-5">Link Telegram</h1>
                <button type="button" className="btn-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-0">
                <p>
                  To link your Telegram account, please send /start command to our bot <a href="https://t.me/your_bot">@your_bot</a> end write down the telegramID here:
                </p>
                <input type="text" className="form-control"
                  placeholder="Enter Telegram ID"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                <button type="button" className="btn btn-lg btn-primary" 
                  onClick={handleLinkTelegram}>
                  Link Telegram
                </button>
              </div>
          </div>
        </div>
      )}

      {isOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

TelegramButton.propTypes = {
  telegramID: PropTypes.string,
  onLinkTelegram: PropTypes.func.isRequired,
};

export default TelegramButton;
