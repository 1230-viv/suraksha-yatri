const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');

// System Information Routes
router.get('/stats', systemController.getStats);
router.get('/wallet', systemController.getWalletInfo);
router.get('/health', systemController.healthCheck);

module.exports = router;