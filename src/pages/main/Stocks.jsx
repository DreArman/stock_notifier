import { useState } from "react";
import StockCard from "../../components/elements/StockCard";
import AddStockButton from "../../components/elements/AddStockButton";
import { purchasedStocks, savedStocks } from "../../constants/StockInfo";

const Stocks = () => {
  const [activeTab, setActiveTab] = useState("purchased");

  const stocks = activeTab === "purchased" ? purchasedStocks : savedStocks;

  return (
    <main className="container">
      <h1 className="fw-bold">My Stocks</h1>

      {/* tabs */}
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

      {/* Stock element */}
      <div className="row mt-4 overflow-auto" style={{ maxHeight: "380px" }}>
        {stocks.map((stock, index) => (
          <StockCard key={index} stock={stock} />
        ))}
      </div>

      {/* Add New Stock Button */}
      <div className="text-center mt-4">
        <AddStockButton type={activeTab}/>
      </div>
    </main>
  );
};

export default Stocks;
