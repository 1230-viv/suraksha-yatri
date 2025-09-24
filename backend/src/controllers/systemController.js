const blockchainService = require('../services/blockchainService');

class SystemController {
  // Get system statistics
  async getStats(req, res) {
    try {
      const systemInfo = await blockchainService.getSystemInfo();
      
      res.json({
        success: true,
        data: {
          system: 'Digital Tourist ID Generation Platform',
          version: '2.0.0',
          status: 'Active',
          blockchain: systemInfo,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Error getting system stats:', error.message);
      res.status(500).json({
        success: false,
        error: 'System Error',
        message: error.message
      });
    }
  }

  // Get wallet information
  async getWalletInfo(req, res) {
    try {
      const systemInfo = await blockchainService.getSystemInfo();
      
      res.json({
        success: true,
        data: {
          address: systemInfo.signerAddress,
          balance: systemInfo.balance + ' ETH',
          network: systemInfo.network,
          contractAddress: systemInfo.contractAddress
        }
      });

    } catch (error) {
      console.error('❌ Error getting wallet info:', error.message);
      res.status(500).json({
        success: false,
        error: 'Wallet Error',
        message: error.message
      });
    }
  }

  // Health check
  async healthCheck(req, res) {
    try {
      // Test basic blockchain connectivity first
      const systemInfo = await blockchainService.getSystemInfo();
      
      res.json({
        success: true,
        status: 'Healthy',
        services: {
          api: 'OK',
          blockchain: 'Connected',
          contract: 'Accessible'
        },
        data: {
          contractAddress: systemInfo.contractAddress,
          signerAddress: systemInfo.signerAddress,
          network: systemInfo.network,
          touristCount: systemInfo.touristCount || 0,
          uptime: process.uptime(),
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Health check failed:', error.message);
      
      // Provide more specific error information
      const services = {
        api: 'OK',
        blockchain: 'Error',
        contract: 'Inaccessible'
      };
      
      if (error.message.includes('ECONNREFUSED')) {
        services.blockchain = 'Network Unreachable';
      } else if (error.message.includes('not a function')) {
        services.blockchain = 'Connected';
        services.contract = 'ABI Mismatch';
      }
      
      res.status(503).json({
        success: false,
        status: 'Unhealthy',
        services: services,
        error: error.message,
        suggestion: error.message.includes('ECONNREFUSED') 
          ? 'Please ensure Hardhat network is running on port 8545'
          : 'Check contract ABI configuration',
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new SystemController();