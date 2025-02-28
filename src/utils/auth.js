// function isAuthenticated() {
//     // return false;
//     return true;
// }

// export const loginUser = async (email, password) => {
//     try {
//       const response = await fetch("{{url}}/api/v1/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // Important for cookies-based authentication
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Invalid email or password");
//       }
  
//       const data = await response.json(); // { token: "...", user: {...} }
//       localStorage.setItem("token", data.token); // Store token (only if needed)
//       return { success: true, data };
//     } catch (error) {
//       return { success: false, message: error.message };
//     }
//   };
  
//   export const logoutUser = () => {
//     localStorage.removeItem("token"); // Clear token
//   };
  

// export { isAuthenticated };