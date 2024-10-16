import axios from "axios";

const URL = "https://openmarket.aroxima.dev";

export const Instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
