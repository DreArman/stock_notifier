import API from "./axiosInstance";

export const login = async (email, password) => {
  try {
    const response = await API.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Ошибка входа:", error);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await API.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    throw error;
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
    console.log("Новый токен:", newAccessToken);
    localStorage.setItem("access_token", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Ошибка выхода:", error);
    throw error;
  }
};
