const { ethers } = require('ethers');

// Blockchain configuration
const BLOCKCHAIN_CONFIG = {
  HARDHAT_NETWORK_URL: "http://127.0.0.1:8545",
  CONTRACT_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  CHAIN_ID: 31337,
  NETWORK_NAME: "Hardhat Local"
};

// Contract ABI (from compiled TouristID.sol) - Struct-based implementation
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getTourist",
    "outputs": [
      {
        "components": [
          {
            "components": [
              {"internalType": "string", "name": "name", "type": "string"},
              {"internalType": "string", "name": "passport", "type": "string"},
              {"internalType": "string", "name": "dateOfBirth", "type": "string"},
              {"internalType": "string", "name": "nationality", "type": "string"},
              {"internalType": "string", "name": "phoneNumber", "type": "string"},
              {"internalType": "string", "name": "entryPoint", "type": "string"}
            ],
            "internalType": "struct TouristID.KYCInfo",
            "name": "kyc",
            "type": "tuple"
          },
          {
            "components": [
              {"internalType": "string", "name": "arrivalDate", "type": "string"},
              {"internalType": "string", "name": "departureDate", "type": "string"},
              {"internalType": "string", "name": "primaryDestination", "type": "string"},
              {"internalType": "string", "name": "purposeOfVisit", "type": "string"},
              {"internalType": "string", "name": "accommodationDetails", "type": "string"},
              {"internalType": "string", "name": "itinerary", "type": "string"}
            ],
            "internalType": "struct TouristID.TripInfo",
            "name": "trip",
            "type": "tuple"
          },
          {
            "components": [
              {"internalType": "string", "name": "emergencyContactName", "type": "string"},
              {"internalType": "string", "name": "emergencyContactPhone", "type": "string"},
              {"internalType": "string", "name": "emergencyContactRelation", "type": "string"},
              {"internalType": "string", "name": "emergencyContactAddress", "type": "string"},
              {"internalType": "string", "name": "localEmergencyContact", "type": "string"}
            ],
            "internalType": "struct TouristID.EmergencyInfo",
            "name": "emergency",
            "type": "tuple"
          },
          {"internalType": "string", "name": "userType", "type": "string"},
          {"internalType": "uint256", "name": "validUntil", "type": "uint256"},
          {"internalType": "uint256", "name": "registrationTimestamp", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct TouristID.Tourist",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "passport", "type": "string"},
          {"internalType": "string", "name": "dateOfBirth", "type": "string"},
          {"internalType": "string", "name": "nationality", "type": "string"},
          {"internalType": "string", "name": "phoneNumber", "type": "string"},
          {"internalType": "string", "name": "entryPoint", "type": "string"}
        ],
        "internalType": "struct TouristID.KYCInfo",
        "name": "kycInfo",
        "type": "tuple"
      },
      {
        "components": [
          {"internalType": "string", "name": "arrivalDate", "type": "string"},
          {"internalType": "string", "name": "departureDate", "type": "string"},
          {"internalType": "string", "name": "primaryDestination", "type": "string"},
          {"internalType": "string", "name": "purposeOfVisit", "type": "string"},
          {"internalType": "string", "name": "accommodationDetails", "type": "string"},
          {"internalType": "string", "name": "itinerary", "type": "string"}
        ],
        "internalType": "struct TouristID.TripInfo",
        "name": "tripInfo",
        "type": "tuple"
      },
      {
        "components": [
          {"internalType": "string", "name": "emergencyContactName", "type": "string"},
          {"internalType": "string", "name": "emergencyContactPhone", "type": "string"},
          {"internalType": "string", "name": "emergencyContactRelation", "type": "string"},
          {"internalType": "string", "name": "emergencyContactAddress", "type": "string"},
          {"internalType": "string", "name": "localEmergencyContact", "type": "string"}
        ],
        "internalType": "struct TouristID.EmergencyInfo",
        "name": "emergencyInfo",
        "type": "tuple"
      },
      {"internalType": "string", "name": "userType", "type": "string"},
      {"internalType": "uint256", "name": "validUntil", "type": "uint256"}
    ],
    "name": "registerTourist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "passport", "type": "string"}
    ],
    "name": "getTouristByPassport",
    "outputs": [
      {"internalType": "address", "name": "", "type": "address"},
      {
        "components": [
          {
            "components": [
              {"internalType": "string", "name": "name", "type": "string"},
              {"internalType": "string", "name": "passport", "type": "string"},
              {"internalType": "string", "name": "dateOfBirth", "type": "string"},
              {"internalType": "string", "name": "nationality", "type": "string"},
              {"internalType": "string", "name": "phoneNumber", "type": "string"},
              {"internalType": "string", "name": "entryPoint", "type": "string"}
            ],
            "internalType": "struct TouristID.KYCInfo",
            "name": "kyc",
            "type": "tuple"
          },
          {
            "components": [
              {"internalType": "string", "name": "arrivalDate", "type": "string"},
              {"internalType": "string", "name": "departureDate", "type": "string"},
              {"internalType": "string", "name": "primaryDestination", "type": "string"},
              {"internalType": "string", "name": "purposeOfVisit", "type": "string"},
              {"internalType": "string", "name": "accommodationDetails", "type": "string"},
              {"internalType": "string", "name": "itinerary", "type": "string"}
            ],
            "internalType": "struct TouristID.TripInfo",
            "name": "trip",
            "type": "tuple"
          },
          {
            "components": [
              {"internalType": "string", "name": "emergencyContactName", "type": "string"},
              {"internalType": "string", "name": "emergencyContactPhone", "type": "string"},
              {"internalType": "string", "name": "emergencyContactRelation", "type": "string"},
              {"internalType": "string", "name": "emergencyContactAddress", "type": "string"},
              {"internalType": "string", "name": "localEmergencyContact", "type": "string"}
            ],
            "internalType": "struct TouristID.EmergencyInfo",
            "name": "emergency",
            "type": "tuple"
          },
          {"internalType": "string", "name": "userType", "type": "string"},
          {"internalType": "uint256", "name": "validUntil", "type": "uint256"},
          {"internalType": "uint256", "name": "registrationTimestamp", "type": "uint256"},
          {"internalType": "bool", "name": "isActive", "type": "bool"}
        ],
        "internalType": "struct TouristID.Tourist",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "isValidTourist",
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTouristCount",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = {
  BLOCKCHAIN_CONFIG,
  CONTRACT_ABI
};