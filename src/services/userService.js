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
    console.error("Error loading user data:", error);
    throw "Error loading user data!";
  }
};

export const setUserData = async (username, user_telegram_id) => {
  try {
    console.log(username, user_telegram_id);

    const payload = { username };
    if (user_telegram_id) {
      payload.user_telegram_id = user_telegram_id;
    }

    const response = await API.put("/user", payload);
    return response.data;
    
    // const data = await response.json();
    // if (data) {
    //   setUser(User.fromJson(data));
    // }
  } catch (error) {
    console.error("Error saving user data:", error);
    throw "Error saving user data!";
  }
};

export const changeUserPassword = async (old_password, new_password) => {
  try {
    const response = await API.put("/reset-password", { old_password, new_password });
    return response.data;
    
    // const data = await response.json();
    // if (data) {
    //   setUser(User.fromJson(data));
    // }
  } catch (error) {
    console.error("Error changing user password:", error);
    throw "Error changing user password!";
  }
};