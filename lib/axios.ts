import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const isLoginRequest = error.config?.url?.includes("/login");

//     if (error.response?.status === 401 && !isLoginRequest) {
//       if (typeof window !== "undefined" && window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );