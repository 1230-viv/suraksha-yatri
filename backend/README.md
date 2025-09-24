# Digital Tourist ID Generation Platform - Backend API

A comprehensive MVC-structured backend for blockchain-based tourist identity management with government-grade KYC compliance.

## 🏗️ Architecture Overview

This backend follows a clean MVC (Model-View-Controller) architecture pattern for maintainable and scalable code organization.

## 📁 Project Structure

```
backend/
├── server.js                 # Main application entry point
├── src/
│   ├── app.js                # Express application configuration
│   ├── config/               # Configuration files
│   │   ├── app.js           # Application settings
│   │   └── blockchain.js    # Blockchain configuration & ABI
│   ├── controllers/         # Route controllers (business logic)
│   │   ├── touristController.js
│   │   └── systemController.js
│   ├── models/              # Data models and validation
│   │   └── Tourist.js       # Tourist data model
│   ├── routes/              # Route definitions
│   │   ├── index.js         # Main route aggregator
│   │   ├── tourist.js       # Tourist-related routes
│   │   └── system.js        # System routes
│   ├── services/            # Business services
│   │   └── blockchainService.js # Blockchain interaction service
│   └── middleware/          # Express middleware
│       ├── validation.js    # Input validation middleware
│       └── errorHandler.js  # Error handling middleware
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- Running Hardhat local network
- Deployed TouristID smart contract

### Installation & Setup

```bash
# Install dependencies
npm install

# Start the server
npm start

# For development
npm run dev
```

The server will start on `http://localhost:3001` with comprehensive logging.

## 📊 API Endpoints

### Tourist Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/tourist/register` | Register new Digital Tourist ID |
| `GET` | `/api/tourist/:address` | Get tourist by wallet address |
| `GET` | `/api/tourist/passport/:passport` | Get tourist by passport/Aadhaar |
| `GET` | `/api/tourist/:address/validate` | Validate tourist status |

### System Information

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/stats` | System statistics |
| `GET` | `/api/wallet` | Wallet information |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/` | API documentation |

## 🔧 Configuration

### Application Settings (`src/config/app.js`)
- Server port configuration
- CORS settings
- Environment variables

### Blockchain Settings (`src/config/blockchain.js`)
- Smart contract address
- Network configuration
- Contract ABI definitions

## 🏛️ MVC Architecture Components

### Models (`src/models/`)
- **Tourist.js**: Data validation, sanitization, and blockchain format conversion
- Comprehensive field validation for KYC, Trip, and Emergency information
- Date validation and business logic

### Views
- RESTful JSON responses
- Standardized error formats
- Comprehensive API documentation

### Controllers (`src/controllers/`)
- **TouristController**: Handles all tourist-related operations
- **SystemController**: Manages system information and health checks
- Clean separation of concerns with proper error handling

### Services (`src/services/`)
- **BlockchainService**: Singleton service for smart contract interaction
- Connection management and transaction handling
- Blockchain state management

### Middleware (`src/middleware/`)
- **Validation**: Input validation and sanitization
- **Error Handling**: Global error handling and logging
- Request logging and security headers

## 🔐 Security Features

- Input validation and sanitization
- SQL injection prevention
- XSS protection headers
- CORS configuration
- Request rate limiting ready
- Sensitive data hiding in logs

## 📝 Request/Response Format

### Registration Request
```json
{
  "name": "John Doe",
  "passport": "AB1234567",
  "dateOfBirth": "1990-01-15",
  "nationality": "US",
  "phoneNumber": "+1234567890",
  "entryPoint": "Delhi Airport",
  "arrivalDate": "2025-10-01",
  "departureDate": "2025-10-15",
  "primaryDestination": "New Delhi",
  "purposeOfVisit": "Tourism",
  "accommodationDetails": "Hotel Taj, New Delhi",
  "itinerary": "Delhi -> Agra -> Jaipur",
  "emergencyContactName": "Jane Doe",
  "emergencyRelationship": "Spouse",
  "emergencyPhone": "+1234567891",
  "emergencyEmail": "jane@example.com",
  "emergencyAddress": "123 Main St, City, Country"
}
```

### Standard Response Format
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message"
}
```

## 🔄 Development Workflow

### Adding New Features
1. **Model**: Add data validation in `src/models/`
2. **Controller**: Implement business logic in `src/controllers/`
3. **Routes**: Define endpoints in `src/routes/`
4. **Middleware**: Add validation/processing in `src/middleware/`

### Best Practices
- Keep controllers thin, move business logic to services
- Use middleware for cross-cutting concerns
- Validate all inputs at model level
- Handle errors gracefully with proper HTTP status codes
- Log important operations with structured data

## 🐛 Error Handling

The application includes comprehensive error handling:
- Validation errors (400)
- Not found errors (404) 
- Blockchain connection errors (503)
- Internal server errors (500)
- Graceful shutdown handling

## 📊 Logging

Structured logging includes:
- Request/response logging
- Blockchain transaction tracking
- Error logging with stack traces
- Performance monitoring ready

## 🔧 Environment Variables

```bash
PORT=3001                    # Server port
NODE_ENV=development         # Environment
FRONTEND_URL=http://localhost:5173  # Frontend URL for CORS
```

## 🧪 Testing

```bash
# Health check
curl http://localhost:3001/api/health

# API documentation
curl http://localhost:3001/api/

# System statistics
curl http://localhost:3001/api/stats
```

## 🤝 Contributing

1. Follow MVC architecture patterns
2. Add proper validation for all inputs
3. Include comprehensive error handling
4. Update documentation for new endpoints
5. Test blockchain integration thoroughly

## 📄 License

This project is part of the Digital Tourist ID Generation Platform.