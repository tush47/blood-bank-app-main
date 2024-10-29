import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_NEW_BASEURL || process.env.REACT_APP_OLD_BASEURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token").trim()} `;
  }
  return req;
});

export default API;
