import { useState } from "react";
import PropTypes from 'prop-types';

const TelegramButton = ({ telegramID, setCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newCode, setNewCode] = useState(telegramID);

  const handleLinkTelegram = () => {
    // TODO chat_id reqired if else
    console.log(newCode);
    setCode(newCode);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(true)}
      >
        {telegramID ? "Linked" : "Not Linked"} 
      </button>

      {isOpen && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h1 className="modal-title fs-5">Link Telegram</h1>
              <button type="button" className="btn-close"
                onClick={() => { setIsOpen(false); setNewCode(telegramID); }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <p>
                To link your Telegram account, please send the <code>/start</code> command to our bot <a href="https://t.me/stock_notifier_telegram_bot">@stock_notifier_bot</a> and enter the Telegram ID provided:
              </p>
              <input type="text" className="form-control"
                placeholder="Enter Telegram ID"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
            </div>
            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
              <button type="button" onClick={handleLinkTelegram} className="btn btn-lg btn-primary">
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
  setCode: PropTypes.func.isRequired,
};

export default TelegramButton;
