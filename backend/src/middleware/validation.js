// Validation middleware for request data
const validateTouristRegistration = (req, res, next) => {
  const requiredFields = [
    // KYC fields
    'name', 'passport', 'dateOfBirth', 'nationality', 'phoneNumber', 'entryPoint',
    // Trip fields
    'arrivalDate', 'departureDate', 'primaryDestination', 'purposeOfVisit',
    // Emergency fields
    'emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation', 'emergencyContactAddress'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = req.body[field];
    return !value || (typeof value === 'string' && value.trim() === '');
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: `Missing required fields: ${missingFields.join(', ')}`,
      missingFields
    });
  }

  // Sanitize string fields
  const stringFields = requiredFields.concat(['accommodationDetails', 'itinerary', 'localEmergencyContact']);
  stringFields.forEach(field => {
    if (req.body[field] && typeof req.body[field] === 'string') {
      req.body[field] = req.body[field].trim();
    }
  });

  next();
};

const validateAddress = (req, res, next) => {
  const { address } = req.params;
  
  if (!address) {
    return res.status(400).json({
      success: false,
      error: 'Missing Parameter',
      message: 'Address parameter is required'
    });
  }

  if (address.length !== 42 || !address.startsWith('0x')) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Address',
      message: 'Please provide a valid Ethereum address (42 characters starting with 0x)'
    });
  }

  next();
};

const validatePassport = (req, res, next) => {
  const { passport } = req.params;
  
  if (!passport || passport.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Missing Parameter',
      message: 'Passport/Aadhaar parameter is required'
    });
  }

  // Normalize passport/aadhaar to uppercase
  req.params.passport = passport.trim().toUpperCase();
  
  next();
};

module.exports = {
  validateTouristRegistration,
  validateAddress,
  validatePassport
};