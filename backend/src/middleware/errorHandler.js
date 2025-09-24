// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('🚨 Unhandled Error:', err);

  // Default error response
  let error = {
    success: false,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.error = 'Validation Error';
    error.message = err.message;
    return res.status(400).json(error);
  }

  if (err.name === 'CastError') {
    error.error = 'Invalid Data Format';
    error.message = 'Invalid data format provided';
    return res.status(400).json(error);
  }

  if (err.code === 'ECONNREFUSED') {
    error.error = 'Connection Error';
    error.message = 'Unable to connect to blockchain network';
    return res.status(503).json(error);
  }

  // Blockchain specific errors
  if (err.message && err.message.includes('revert')) {
    error.error = 'Blockchain Transaction Failed';
    error.message = 'Transaction reverted by smart contract';
    return res.status(400).json(error);
  }

  if (err.message && err.message.includes('insufficient funds')) {
    error.error = 'Insufficient Funds';
    error.message = 'Insufficient gas or funds for transaction';
    return res.status(400).json(error);
  }

  // Development mode - include stack trace
  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
    error.originalMessage = err.message;
  }

  res.status(500).json(error);
};

// 404 handler for undefined routes
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `The requested endpoint ${req.method} ${req.path} does not exist`,
    availableEndpoints: [
      'POST /api/tourist/register',
      'GET /api/tourist/:address',
      'GET /api/tourist/passport/:passport',
      'GET /api/tourist/:address/validate',
      'GET /api/stats',
      'GET /api/wallet',
      'GET /api/health'
    ]
  });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`📊 ${timestamp} - ${method} ${url} - ${ip}`);
  
  // Log request body for POST requests (but hide sensitive data)
  if (method === 'POST' && req.body) {
    const sanitizedBody = { ...req.body };
    // Hide sensitive fields in logs
    if (sanitizedBody.passport) sanitizedBody.passport = '***HIDDEN***';
    if (sanitizedBody.phoneNumber) sanitizedBody.phoneNumber = '***HIDDEN***';
    if (sanitizedBody.emergencyPhone) sanitizedBody.emergencyPhone = '***HIDDEN***';
    
    console.log('📝 Request Body:', JSON.stringify(sanitizedBody, null, 2));
  }

  next();
};

module.exports = {
  errorHandler,
  notFoundHandler,
  requestLogger
};