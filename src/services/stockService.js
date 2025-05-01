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

export const getStockData = async (stock_tickers) => {
  try {
    const response = await API.get("/stocks", { tickers: stock_tickers });
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
}

export const addStock = async (stock_ticker, type) => {
  try {
    const response = await API.post("/user-stock", stock_ticker, type);
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};

export const deleteStock = async (stock_ticker) => {
  try {
    const response = await API.delete(`/user-stock/${stock_ticker}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
}