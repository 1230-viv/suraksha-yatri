import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.js';

// Configure axios defaults
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Request interceptor for logging
axios.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

class TouristAPIService {
  // Register a new tourist
  async registerTourist(touristData) {
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER_TOURIST, touristData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get tourist by wallet address
  async getTouristByAddress(address) {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_TOURIST_BY_ADDRESS(address));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get tourist by passport/Aadhaar
  async getTouristByPassport(passport) {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_TOURIST_BY_PASSPORT(passport));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Validate tourist status
  async validateTourist(address) {
    try {
      const response = await axios.get(API_ENDPOINTS.VALIDATE_TOURIST(address));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get system statistics
  async getStats() {
    try {
      const response = await axios.get(API_ENDPOINTS.STATS);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get wallet information
  async getWalletInfo() {
    try {
      const response = await axios.get(API_ENDPOINTS.WALLET);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await axios.get(API_ENDPOINTS.HEALTH);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handler
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data?.error || 'Server Error',
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: 'Network Error',
        message: 'Unable to connect to the server. Please check your connection.',
        status: 0
      };
    } else {
      // Other error
      return {
        success: false,
        error: 'Request Error',
        message: error.message || 'An unexpected error occurred',
        status: 0
      };
    }
  }
}

// Export singleton instance
export default new TouristAPIService();