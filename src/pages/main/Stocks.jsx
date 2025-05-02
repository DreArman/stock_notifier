import { useEffect, useState } from "react";
import StockCard from "../../components/elements/StockCard";
import AddStockButton from "../../components/elements/AddStockButton";
import { getUserStocks } from "../../services/stockService";

const Stocks = () => {
  const [activeTab, setActiveTab] = useState("purchased");
  const [purchasedStocks, setPurchasedStocks] = useState([]);
  const [savedStocks, setSavedStocks] = useState([]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const response = await getUserStocks();

        // Separate stocks by type
        const purchased = response.filter((stock) => stock.type === "purchased");
        const saved = response.filter((stock) => stock.type === "saved");

        setPurchasedStocks(purchased);
        setSavedStocks(saved);

        console.log("Purchased Stocks:", purchased);
        console.log("Saved Stocks:", saved);
      } catch (error) {
        console.error("Error fetching user stocks:", error);
      }
    };

    fetchUserStocks();
  }, []);

  const stocks = activeTab === "purchased" ? purchasedStocks : savedStocks;

  const removeStock = (symbol) => {
    if (activeTab === "purchased") {
      setPurchasedStocks(purchasedStocks.filter((stock) => stock.stock_name !== symbol));
    } else {
      setSavedStocks(savedStocks.filter((stock) => stock.stock_name !== symbol));
    }
  };

  const addStock = (newStock) => {
    if (activeTab === "purchased") {
      setPurchasedStocks([...purchasedStocks, newStock]);
    } else {
      setSavedStocks([...savedStocks, newStock]);
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
        <AddStockButton type={activeTab} onAddStock={addStock} />
      </div>
    </main>
  );
};

export default Stocks;
