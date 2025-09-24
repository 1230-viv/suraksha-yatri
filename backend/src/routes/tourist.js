const express = require('express');
const router = express.Router();
const touristController = require('../controllers/touristController');
const { validateTouristRegistration, validateAddress, validatePassport } = require('../middleware/validation');

// Tourist Registration Routes
router.post('/register', validateTouristRegistration, touristController.register);

// Tourist Lookup Routes
router.get('/:address', validateAddress, touristController.getTouristByAddress);
router.get('/passport/:passport', validatePassport, touristController.getTouristByPassport);

// Tourist Validation Routes
router.get('/:address/validate', validateAddress, touristController.validateTourist);

module.exports = router;