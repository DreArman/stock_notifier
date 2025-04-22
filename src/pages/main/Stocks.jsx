import { useState } from "react";
import StockCard from "../../components/elements/StockCard";
import AddStockButton from "../../components/elements/AddStockButton";
// import { getStockData } from "../../services/stockService";
import { purchasedStocks as initialPurchasedStocks, savedStocks as initialSavedStocks } from "../../constants/StockInfo";

const Stocks = () => {
  const [activeTab, setActiveTab] = useState("purchased");
  const [purchasedStocks, setPurchasedStocks] = useState(initialPurchasedStocks);
  const [savedStocks, setSavedStocks] = useState(initialSavedStocks);

  const stocks = activeTab === "purchased" ? purchasedStocks : savedStocks;

  const removeStock = (symbol) => {
    if (activeTab === "purchased") {
      setPurchasedStocks(purchasedStocks.filter((stock) => stock.symbol !== symbol));
    } else {
      setSavedStocks(savedStocks.filter((stock) => stock.symbol !== symbol));
    }
  };

  return (
    <main className="container">
      <h1 className="fw-bold">My Stocks</h1>

      {/* Tabs */}
      <ul className="nav nav-tabs mt-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "purchased" ? "active" : ""}`}
            onClick={() => setActiveTab("purchased")}
          >
            Purchased Stocks
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "saved" ? "active" : ""} mx-1`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Stocks
          </button>
        </li>
      </ul>

      {/* Stock List */}
      <div className="row mt-4 overflow-auto" style={{ maxHeight: "380px" }}>
        {stocks.map((stock, index) => (
          <StockCard key={index} stock={stock} onRemove={removeStock} />
        ))}
      </div>

      {/* Add New Stock Button */}
      <div className="text-center mt-4">
        <AddStockButton type={activeTab} />
      </div>
    </main>
  );
};

export default Stocks;
