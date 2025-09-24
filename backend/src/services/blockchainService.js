const { ethers } = require('ethers');
const { BLOCKCHAIN_CONFIG, CONTRACT_ABI } = require('../config/blockchain');

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      // Connect to Hardhat local network
      this.provider = new ethers.JsonRpcProvider(BLOCKCHAIN_CONFIG.HARDHAT_NETWORK_URL);
      
      // Use the first account from Hardhat (for development)
      this.signer = await this.provider.getSigner(0);
      
      // Initialize contract
      this.contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS,
        CONTRACT_ABI,
        this.signer
      );

      this.initialized = true;
      console.log('🔗 Blockchain service initialized successfully');
      console.log('📄 Contract Address:', BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS);
      console.log('👛 Signer Address:', await this.signer.getAddress());
    } catch (error) {
      console.error('❌ Blockchain initialization failed:', error);
      throw error;
    }
  }

  async registerTourist(kycInfo, tripInfo, emergencyInfo, userType, validUntil) {
    try {
      const tx = await this.contract.registerTourist(
        kycInfo,
        tripInfo,
        emergencyInfo,
        userType,
        validUntil
      );
      
      const receipt = await tx.wait();
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async getTouristByAddress(address) {
    try {
      const tourist = await this.contract.getTourist(address);
      
      if (!tourist || !tourist.kyc || !tourist.kyc.name) {
        return null;
      }

      return {
        kyc: {
          name: tourist.kyc.name,
          passport: tourist.kyc.passport,
          dateOfBirth: tourist.kyc.dateOfBirth,
          nationality: tourist.kyc.nationality,
          phoneNumber: tourist.kyc.phoneNumber,
          entryPoint: tourist.kyc.entryPoint
        },
        trip: {
          arrivalDate: tourist.trip.arrivalDate,
          departureDate: tourist.trip.departureDate,
          primaryDestination: tourist.trip.primaryDestination,
          purposeOfVisit: tourist.trip.purposeOfVisit,
          accommodationDetails: tourist.trip.accommodationDetails,
          itinerary: tourist.trip.itinerary
        },
        emergency: {
          emergencyContactName: tourist.emergency.emergencyContactName,
          emergencyContactPhone: tourist.emergency.emergencyContactPhone,
          emergencyContactRelation: tourist.emergency.emergencyContactRelation,
          emergencyContactAddress: tourist.emergency.emergencyContactAddress,
          localEmergencyContact: tourist.emergency.localEmergencyContact
        },
        userType: tourist.userType,
        registrationTimestamp: Number(tourist.registrationTimestamp),
        validUntil: Number(tourist.validUntil),
        isActive: tourist.isActive
      };
    } catch (error) {
      console.error('Error fetching tourist:', error);
      throw new Error(`Failed to fetch tourist: ${error.message}`);
    }
  }

  async getTouristByPassport(passport) {
    try {
      const address = await this.contract.getTouristByPassport(passport);
      
      if (address === '0x0000000000000000000000000000000000000000') {
        return null;
      }

      return await this.getTouristByAddress(address);
    } catch (error) {
      console.error('Error fetching tourist by passport:', error);
      throw new Error(`Failed to fetch tourist by passport: ${error.message}`);
    }
  }

  async validateTourist(address) {
    try {
      const isValid = await this.contract.isValidTourist(address);
      return { isValid };
    } catch (error) {
      console.error('Error validating tourist:', error);
      throw new Error(`Failed to validate tourist: ${error.message}`);
    }
  }

  async getTouristCount() {
    try {
      const count = await this.contract.getTouristCount();
      return Number(count);
    } catch (error) {
      console.error('Error getting tourist count:', error);
      throw new Error(`Failed to get tourist count: ${error.message}`);
    }
  }

  async getSystemInfo() {
    try {
      const signerAddress = await this.signer.getAddress();
      const balance = await this.provider.getBalance(signerAddress);
      const network = await this.provider.getNetwork();
      const touristCount = await this.getTouristCount();

      return {
        contractAddress: BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS,
        signerAddress,
        balance: ethers.formatEther(balance),
        network: {
          name: BLOCKCHAIN_CONFIG.NETWORK_NAME,
          chainId: Number(network.chainId)
        },
        touristCount
      };
    } catch (error) {
      console.error('Error getting system info:', error);
      throw new Error(`Failed to get system info: ${error.message}`);
    }
  }
}

module.exports = new BlockchainService();