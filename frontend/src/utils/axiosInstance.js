import axios from "axios";

// Central axios instance — all API calls go through here
// Base URL is set from env variable for easy deployment switching
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1",
  withCredentials: true, // Required: sends httpOnly cookies for auth
  timeout: 15000, // 15s timeout — prevents hanging requests
});

export default api;
