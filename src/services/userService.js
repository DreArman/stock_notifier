import API from "./axiosInstance";

export const getUserData = async () => {
  try {
    const response = await API.get("/user");
    return response.data;
    
    // const data = await response.json();
    // if (data) {
    //   setUser(User.fromJson(data));
    // }
  } catch (error) {
    console.error('Ошибка загрузки данных пользователя:', error);
    throw error;
  }
};

export const setUserData = async (user) => {
  try {
    const response = await API.put("/user", { username: user.username, user_telegram_id: user.telegramID });
    return response.data;
    
    // const data = await response.json();
    // if (data) {
    //   setUser(User.fromJson(data));
    // }
  } catch (error) {
    console.error('Ошибка загрузки данных пользователя:', error);
    throw error;
  }
};