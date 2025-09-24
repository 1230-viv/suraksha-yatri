// API Configuration for Digital Tourist ID Platform
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  API_PREFIX: '/api',
  ENDPOINTS: {
    // Tourist endpoints
    REGISTER_TOURIST: '/tourist/register',
    GET_TOURIST_BY_ADDRESS: '/tourist',
    GET_TOURIST_BY_PASSPORT: '/tourist/passport',
    VALIDATE_TOURIST: '/tourist/{address}/validate',
    
    // System endpoints
    STATS: '/stats',
    WALLET: '/wallet',
    HEALTH: '/health'
  },
  
  // Request configuration
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    'Content-Type': 'application/json'
  }
};

// Helper function to build full URL
export const buildApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_PREFIX}${endpoint}`;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`{${key}}`, params[key]);
  });
  
  return url;
};

// API endpoints with full URLs
export const API_ENDPOINTS = {
  // Tourist Management
  REGISTER_TOURIST: buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER_TOURIST),
  GET_TOURIST_BY_ADDRESS: (address) => buildApiUrl(`${API_CONFIG.ENDPOINTS.GET_TOURIST_BY_ADDRESS}/${address}`),
  GET_TOURIST_BY_PASSPORT: (passport) => buildApiUrl(`${API_CONFIG.ENDPOINTS.GET_TOURIST_BY_PASSPORT}/${passport}`),
  VALIDATE_TOURIST: (address) => buildApiUrl(API_CONFIG.ENDPOINTS.VALIDATE_TOURIST, { address }),
  
  // System Information
  STATS: buildApiUrl(API_CONFIG.ENDPOINTS.STATS),
  WALLET: buildApiUrl(API_CONFIG.ENDPOINTS.WALLET),
  HEALTH: buildApiUrl(API_CONFIG.ENDPOINTS.HEALTH)
};

export default API_CONFIG;