import API from "./axiosInstance";

export const login = async (email, password) => {
  try {
    const response = await API.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw "Login error! Please check the entered data.";
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await API.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw "Registration error! Please check the entered data.";
  }
};

export const sendEmail = async (username, email) => {
  try {
    const response = await API.post("/send-email", { username, email });
    return response.data.message; // Return the success message
  } catch (error) {
    console.error("Error sending email:", error);
    throw error.response?.data?.message || "Failed to send email.";
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await API.post("/verify-email", { email, code });
    return response.data.message; // Return the success message
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error.response?.data?.message || "Failed to verify email.";
  }
};

export const refreshToken = async () => {
  try {
    const response = await API.post("/refresh");
    const newAccessToken = response.data.access_token;
    console.log("New token:", newAccessToken);
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw "Token refresh error!";
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw "Logout error!";
  }
};