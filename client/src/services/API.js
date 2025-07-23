// import axios from "axios";

// const API = axios.create({ baseURL: process.env.REACT_APP_OLD_BASEURL });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("token")) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem("token").trim()} `;
//   }
//   return req;
// });

// export default API;

import axios from "axios";

// Always include credentials (cookies, tokens, etc.)
axios.defaults.withCredentials = true;

// Create an instance with your base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_OLD_BASEURL,
  withCredentials: true, // also set here to ensure it's respected per request
});

// Add Authorization header if token exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token.trim()}`;
  }
  return req;
});

export default API;

