import API from "./axiosInstance";


export const getStockTickers = async () => {
  try {
    const response = await API.get("/tickers");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock tickers:", error);
    throw error;
  }
}

export const getUserStocks = async () => {
  try {
    const response = await API.get("/user-stock");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const getStockData = async (id) => {
  try {
    const response = await API.get("/stocks", { params: { stock_id: id }});
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}

export const addStock = async (stock_ticker, type, purchase_price, quantity, purchased_date) => {
  console.log("Adding stock:", { stock_ticker, type, purchase_price, quantity, purchased_date });
  try {
    const response = await API.post(
      "/user-stock",
      { purchase_price, quantity, purchased_date },
      { params: { "stock_ticker": stock_ticker, "type": type } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};

export const deleteStock = async (stock_id) => {
  try {
    const response = await API.delete("/user-stock", { params: { "id": stock_id } });
    return response.data;
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
}