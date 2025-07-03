// axios ka instance bnao
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "";

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000 ,//10sec
   withCredentials: true
});

// Response interceptor with error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx
    return response;
  },
  (error) => {
    // Create a standardized error object
    let errorMessage = "An unexpected error occurred";
    let statusCode = null;
    let errorData = null;

    if (error.response) {
      // The server responded with a status code outside of 2xx
      statusCode = error.response.status;
      errorData = error.response.data;
      
      switch (statusCode) {
        case 400:
          errorMessage = "Bad request: " + (errorData?.message || "Invalid input");
          break;
        case 401:
          errorMessage = "Unauthorized: " + (errorData?.message || "Please login to continue");
          break;
        case 403:
          errorMessage = "Forbidden: " + (errorData?.message || "You don't have permission");
          break;
        case 404:
          errorMessage = "Not found: " + (errorData?.message || "Resource not found");
          break;
        case 409:
          errorMessage = "Conflict: " + (errorData?.message || "Resource already exists");
          break;
        case 500:
          errorMessage = "Server error: " + (errorData?.message || "Something went wrong");
          break;
        default:
          errorMessage = errorData?.message || `Error ${statusCode}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "Network error: No response from server. Please check your connection.";
    } else if (error.code === "ERR_NETWORK") {
      errorMessage = "Cannot connect to server. Please make sure the backend is running.";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "Request timeout. Please try again.";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message || "Unknown error occurred";
    }

    // Create enhanced error object
    const enhancedError = {
      message: errorMessage,
      originalError: error,
      statusCode,
      data: errorData
    };

    console.error("API Error:", enhancedError);
    return Promise.reject(enhancedError);
  }
);

export default axiosInstance;