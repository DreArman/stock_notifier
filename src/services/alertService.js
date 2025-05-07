import API from "./axiosInstance";

export const setDailySummary = (status) => {
    console.log("Setting daily alert status:", { status });
    try {
        const response = API.post("/daily-summary", { status });
        return response.data;
    } catch (error) {
        console.error("Error setting daily alert:", error);
        throw error;
    }
}

export const setSignificantChanges = (status, percent) => {
    console.log("Setting significant alert", { status , percent });
    try {
        const response = API.post("/significiant-changes", { status, percent });
        return response;
    } catch (error) {
        console.error("Error setting significant alert:", error);
        throw error;
    }
}

export const setCustomAlert = (ticker, status, above, below) => {
    console.log("Setting custom alert for ticker:", { ticker }, "between", {above}, "and", {below});
    try {
        if (status){
        const response = API.post("/custom-prices",
            { "status" : status, "above_price" : above, "below_price" : below },
            { params: { "stock_ticker": ticker } }
        );
        return response.data;   
        }
        const response = API.post("/custom-prices",
            { "status" : status, "above_price" : 0, "below_price" : 0 },
            { params: { "stock_ticker": ticker } }
        );
        return response.data;
    }
    catch (error) {
        console.error("Error setting custom alert:", error);
        throw error;
    }
};

export const getAlerts = async () => {
    try {
        const response = await API.get("/hotkeys-status");
        return response.data;
    } catch (error) {
        console.error("Error fetching alerts:", error);
        throw error;
    }
}

export const getCustomAlerts = async () => {
    try {
        const response = await API.get("/custom-prices");
        return response.data;
    } catch (error) {
        console.error("Error fetching custom alerts:", error);
        throw error;
    }
}
