import axios from "axios";

const axiosManager = axios.create({
  baseURL: "https://hackaton-5iap.onrender.com",
});

export default axiosManager;
