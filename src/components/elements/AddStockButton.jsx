import { useState } from "react";
import PropTypes from 'prop-types';

const AddStockButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [code, setCode] = useState("");

    const handleLinkTelegram = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button className="btn btn-dark btn-lg" onClick={() => setIsOpen(true)}>+ Add New Stock</button>

            {isOpen && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h1 className="modal-title fs-5">Link Telegram</h1>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setIsOpen(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body py-0">
                            <p>
                                Write down your stock by symbols (e.g., AAPL)
                            </p>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Like: AAPL"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                            <button
                                type="button"
                                className="btn btn-lg btn-primary"
                                onClick={handleLinkTelegram}
                            >
                                Add Stock
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isOpen && <div className="modal-backdrop fade show"></div>}
        </>
    );
};

AddStockButton.propTypes = {
    telegramID: PropTypes.string,
    onLinkTelegram: PropTypes.func.isRequired,
};

export default AddStockButton;
