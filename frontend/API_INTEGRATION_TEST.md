# Frontend API Integration Test

This file contains tests to verify the frontend is properly connected to the new MVC backend structure on port 5000.

## API Configuration Updated ✅

### Changes Made:

1. **Created API Configuration** (`/src/config/api.js`)
   - Centralized API endpoint management
   - Environment variable support
   - Helper functions for URL building

2. **Created API Service Layer** (`/src/services/apiService.js`)
   - Axios interceptors for logging
   - Error handling standardization
   - Service methods for all endpoints
   - Response normalization

3. **Updated Components:**
   - **Register.jsx**: Now uses apiService instead of direct axios calls
   - **ViewTourist.jsx**: Updated to use new service layer
   - Both components now target port 5000

### Backend API Endpoints (Port 5000):

```
Base URL: http://localhost:5000/api

Tourist Management:
✅ POST /tourist/register      - Register new Digital Tourist ID
✅ GET  /tourist/:address      - Get tourist by wallet address  
✅ GET  /tourist/passport/:id  - Get tourist by passport/aadhaar
✅ GET  /tourist/:address/validate - Validate tourist status

System Information:
✅ GET  /stats                 - System statistics
✅ GET  /wallet                - Wallet information  
✅ GET  /health                - Health check
```

## Testing Checklist:

### Frontend Service Integration:
- [x] API configuration created with port 5000
- [x] Service layer with error handling
- [x] Register component updated
- [x] ViewTourist component updated
- [x] No more hardcoded localhost:3001 references

### Backend MVC Structure:
- [x] Server running on port 5000
- [x] All endpoints accessible
- [x] Blockchain service connected
- [x] Smart contract deployed and operational

## How to Test:

1. **Health Check**:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Frontend Connection**:
   - Start frontend: `npm run dev`
   - Navigate to registration form
   - Fill out form and submit
   - Check browser console for API calls

3. **API Endpoints**:
   ```bash
   # System info
   curl http://localhost:5000/api/wallet
   curl http://localhost:5000/api/stats
   
   # API documentation
   curl http://localhost:5000/api/
   ```

## Expected Behavior:

- ✅ Frontend makes calls to port 5000
- ✅ Proper error handling and user feedback
- ✅ Structured API responses
- ✅ Blockchain integration functional
- ✅ No CORS issues
- ✅ Clean console logs with request/response tracking

## Environment Variables (Optional):

Create `.env` in frontend root for custom configuration:
```
VITE_API_BASE_URL=http://localhost:5000
```

This will override the default API URL in the frontend configuration.