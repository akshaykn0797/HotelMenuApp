import axios from "axios";
import configuration from "configuration";

const API_BASE_URL = configuration.apiUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = async (axiosConfig) => {
  try {
    const response = await api.request(axiosConfig);
    console.log('Requessttedddd', response.data);
    return response;
  } catch (error) {
    console.log("This is in global error handler")
    throw error;
  }
};



export default api;
