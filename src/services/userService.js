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
    const response = await API.put("/user", { username: user.username, telegram_id: user.telegramID });
    return response.data;
    
    // const data = await response.json();
    // if (data) {
    //   setUser(User.fromJson(data));
    // }
  } catch (error) {
    console.error('Ошибка сохранения данных пользователя:', error);
    throw error;
  }
};

export const changeUserPassword = async (old_password, new_password) => {
  try {
    const response = await API.put("/reset_password", { old_password, new_password });
    return response.data;
    
    // const data = await response.json();
    // if (data) {
    //   setUser(User.fromJson(data));
    // }
  } catch (error) {
    console.error('Ошибка изменения пароля пользователя:', error);
    throw error;
  }
};