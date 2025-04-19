import API from "./axiosInstance";

export const getStockData = async () => {
  try {
    const response = await API.get("/stock-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};