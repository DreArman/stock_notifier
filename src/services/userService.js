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