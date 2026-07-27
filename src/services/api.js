import axios from "axios";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 10000,
});

export default api;
