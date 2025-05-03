import API from "./axiosInstance";

export const getForecast = async (stock_ticker) => {
    try {
        const response = await API.post("/forecast", { tickers: [stock_ticker] });
        return response.data;
    } catch (error) {
        console.error("Error fetching forecast data:", error);
        throw error;
    }
}

// export const getForecastData = async (stock_tickers) => {
//     try {
//         const response = await API.get("/forecast", { params: { tickers: stock_tickers } });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching forecast data:", error);
//         throw error;
//     }
// }
