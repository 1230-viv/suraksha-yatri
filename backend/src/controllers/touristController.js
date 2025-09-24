const TouristModel = require('../models/Tourist');
const blockchainService = require('../services/blockchainService');

class TouristController {
  // Register a new tourist
  async register(req, res) {
    try {
      console.log('📝 New tourist registration request');
      
      // Create and validate tourist model
      const tourist = new TouristModel(req.body);
      const { kyc, trip, emergency, userType, validUntil } = tourist.toBlockchainFormat();

      // Register on blockchain
      const result = await blockchainService.registerTourist(kyc, trip, emergency, userType, validUntil);

      console.log('✅ Tourist registered successfully:', result.transactionHash);

      res.status(201).json({
        success: true,
        message: 'Digital Tourist ID registered successfully',
        data: {
          tourist: {
            kyc: kyc,
            trip: trip,
            emergency: emergency,
            userType: userType,
            validUntil: validUntil
          },
          blockchain: result
        }
      });

    } catch (error) {
      console.error('❌ Registration error:', error.message);
      
      if (error.message.includes('Missing required fields') || 
          error.message.includes('Invalid') ||
          error.message.includes('must be')) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Registration Failed',
        message: error.message
      });
    }
  }

  // Get tourist by wallet address
  async getTouristByAddress(req, res) {
    try {
      const { address } = req.params;

      if (!address || address.length !== 42 || !address.startsWith('0x')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Address',
          message: 'Please provide a valid Ethereum address'
        });
      }

      const touristData = await blockchainService.getTouristByAddress(address);

      if (!touristData) {
        return res.status(404).json({
          success: false,
          error: 'Tourist Not Found',
          message: 'No tourist registration found for this address'
        });
      }

      const tourist = TouristModel.fromBlockchainData(touristData);

      res.json({
        success: true,
        data: {
          address: address,
          tourist: tourist
        }
      });

    } catch (error) {
      console.error('❌ Error fetching tourist by address:', error.message);
      res.status(500).json({
        success: false,
        error: 'Fetch Failed',
        message: error.message
      });
    }
  }

  // Get tourist by passport/Aadhaar number
  async getTouristByPassport(req, res) {
    try {
      const { passport } = req.params;

      if (!passport || passport.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Invalid Passport',
          message: 'Please provide a valid passport or Aadhaar number'
        });
      }

      const touristData = await blockchainService.getTouristByPassport(passport.toUpperCase());

      if (!touristData) {
        return res.status(404).json({
          success: false,
          error: 'Tourist Not Found',
          message: 'No tourist registration found for this passport/Aadhaar number'
        });
      }

      const tourist = TouristModel.fromBlockchainData(touristData);

      res.json({
        success: true,
        data: {
          passport: passport.toUpperCase(),
          tourist: tourist
        }
      });

    } catch (error) {
      console.error('❌ Error fetching tourist by passport:', error.message);
      res.status(500).json({
        success: false,
        error: 'Fetch Failed',
        message: error.message
      });
    }
  }

  // Validate tourist status
  async validateTourist(req, res) {
    try {
      const { address } = req.params;

      if (!address || address.length !== 42 || !address.startsWith('0x')) {
        return res.status(400).json({
          success: false,
          error: 'Invalid Address',
          message: 'Please provide a valid Ethereum address'
        });
      }

      const validation = await blockchainService.validateTourist(address);
      const touristData = await blockchainService.getTouristByAddress(address);

      let status = {
        address: address,
        isRegistered: !!touristData,
        isValid: validation.isValid,
        status: 'Unknown'
      };

      if (touristData) {
        const tourist = TouristModel.fromBlockchainData(touristData);
        status = {
          ...status,
          validUntil: new Date(touristData.validUntil * 1000).toISOString(),
          daysRemaining: tourist.daysRemaining,
          status: tourist.isValid ? 'Active' : 'Expired'
        };
      } else {
        status.status = 'Not Registered';
      }

      res.json({
        success: true,
        data: status
      });

    } catch (error) {
      console.error('❌ Error validating tourist:', error.message);
      res.status(500).json({
        success: false,
        error: 'Validation Failed',
        message: error.message
      });
    }
  }
}

module.exports = new TouristController();