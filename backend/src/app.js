const express = require('express');
const cors = require('cors');
const { APP_CONFIG } = require('./config/app');
const routes = require('./routes');
const { errorHandler, notFoundHandler, requestLogger } = require('./middleware/errorHandler');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // CORS configuration
    this.app.use(cors(APP_CONFIG.CORS_OPTIONS));
    
    // Request parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    // Request logging
    this.app.use(requestLogger);
    
    // Security headers
    this.app.use((req, res, next) => {
      res.header('X-Content-Type-Options', 'nosniff');
      res.header('X-Frame-Options', 'DENY');
      res.header('X-XSS-Protection', '1; mode=block');
      next();
    });
  }

  setupRoutes() {
    // Mount API routes
    this.app.use(APP_CONFIG.API_PREFIX, routes);
    
    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Digital Tourist ID Generation Platform',
        version: '2.0.0',
        status: 'Active',
        api: {
          prefix: APP_CONFIG.API_PREFIX,
          documentation: `${req.protocol}://${req.get('host')}${APP_CONFIG.API_PREFIX}`,
          health: `${req.protocol}://${req.get('host')}${APP_CONFIG.API_PREFIX}/health`
        },
        timestamp: new Date().toISOString()
      });
    });
  }

  setupErrorHandling() {
    // 404 handler (must be before error handler)
    this.app.use(notFoundHandler);
    
    // Global error handler (must be last)
    this.app.use(errorHandler);
  }

  getApp() {
    return this.app;
  }
}

module.exports = new App().getApp();