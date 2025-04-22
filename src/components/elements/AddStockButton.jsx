import { useState } from "react";
import PropTypes from 'prop-types';
import { addStock } from "../../services/stockService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AddStockButton = ({ type }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleStockSubmit = (e) => {
        e.preventDefault();
        const stockName = e.target.stockName.value;
        const ticker = e.target.ticker.value;
        const quantity = type === "purchased" ? e.target.quantity.value : null;
        const price = type === "purchased" ? e.target.price.value : null;
        try {
            const stock = {
                symbol: ticker,
                company: stockName,
                quantity: quantity ? parseInt(quantity) : null,
                current: null,
                totalCurrent: null,
                purchased: price ? parseFloat(price) : null,
                totalPurchased: price ? parseFloat(price) * (quantity ? parseInt(quantity) : 1) : null,
                totalReturn: null,
            };
            // Add the stock to the list (this part depends on your state management)
            console.log(stock);
        }
        catch (error) {
            console.error("Error adding stock:", error);
        }
        setIsOpen(false);
    };

    return (
        <>
            <button className="btn btn-dark btn-lg" onClick={() => setIsOpen(true)}>+ Add New Stock</button>

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
                        <form className="modal-body py-0">
                            <p>Write down your stock info</p>
                            <input id="stockName" name="stockName"
                                type="text"
                                className="form-control mb-md-2"
                                placeholder="Stock Name: Apple Inc."
                                required
                            />
                            <input id="ticker" name="ticker"
                                type="text"
                                className="form-control mb-md-2"
                                placeholder="Ticker: AAPL"
                                required
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
                                }}
                            />
                            {type === "purchased" ? (
                            <>
                                <input id="quantity" name="quantity"
                                    type="text"
                                    className="form-control mb-md-2"
                                    placeholder="Quantity: number"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').toUpperCase();
                                    }}
                                />
                                <input id="price" name="price"
                                    type="text"
                                    className="form-control mb-md-2"
                                    placeholder="Price: number"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '').toUpperCase();
                                    }}
                                />
                            </>) : (<></>)}
                        </form>
                        <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                            <button type="submit" className="btn btn-lg btn-primary" onClick={handleStockSubmit}>
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
    type: PropTypes.string.isRequired,
    telegramID: PropTypes.string,
    onLinkTelegram: PropTypes.func.isRequired,
};

export default AddStockButton;
