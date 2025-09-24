const express = require('express');
const router = express.Router();

// Import route modules
const touristRoutes = require('./tourist');
const systemRoutes = require('./system');

// Mount routes
router.use('/tourist', touristRoutes);
router.use('/', systemRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Digital Tourist ID Generation Platform API',
    version: '2.0.0',
    description: 'Comprehensive KYC & Itinerary Management System',
    endpoints: {
      tourist: {
        'POST /tourist/register': 'Register new Digital Tourist ID',
        'GET /tourist/:address': 'Get tourist by wallet address',
        'GET /tourist/passport/:passport': 'Get tourist by passport/aadhaar',
        'GET /tourist/:address/validate': 'Validate tourist status'
      },
      system: {
        'GET /stats': 'Get system statistics',
        'GET /wallet': 'Get system wallet info',
        'GET /health': 'Health check'
      }
    },
    documentation: {
      github: 'https://github.com/your-repo/tourist-id-platform',
      swagger: '/api-docs'
    }
  });
});

module.exports = router;