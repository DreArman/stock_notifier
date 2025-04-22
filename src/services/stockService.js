import API from "./axiosInstance";

export const getStockData = async () => {
  try {
    const response = await API.get("/stocks");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};

export const addStock = async (stock) => {
  try {
    const response = await API.post("/user-stock", stock);
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};