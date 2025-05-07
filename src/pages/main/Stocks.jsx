import { useEffect, useState } from "react";
import StockCard from "../../components/elements/StockCard";
import AddStockButton from "../../components/elements/AddStockButton";
import { getUserStocks, deleteStock } from "../../services/stockService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stocks = () => {
  const [activeTab, setActiveTab] = useState("purchased");
  const [purchasedStocks, setPurchasedStocks] = useState([]);
  const [savedStocks, setSavedStocks] = useState([]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const response = await getUserStocks();
        console.log("Fetched user stocks:", response); // Log the fetched data

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

  const removeStock = async (id) => {
    try {
      // Call the deleteStock function from the service
      await deleteStock(id);

      if (activeTab === "purchased") {
        setPurchasedStocks(purchasedStocks.filter((stock) => stock.id !== id));
      } else {
        setSavedStocks(savedStocks.filter((stock) => stock.id !== id));
      }
      toast.success("Stock removed successfully.", {
        autoClose: 1000,
      });
      console.log(`Stock with ID ${id} removed successfully.`);
    } catch (error) {
      toast.error("Error removing stock.", {
        autoClose: 1000,
      });
      console.error(`Error removing stock with ID ${id}:`, error);
    }
  };

  // const addStock = (newStock) => {
  //   if (activeTab === "purchased") {
  //     setPurchasedStocks([...purchasedStocks, newStock]);
  //   } else {
  //     setSavedStocks([...savedStocks, newStock]);
  //   }
  // };

  return (
    <main className="container">
      <ToastContainer/>
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
