// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TouristID {
    struct KYCInfo {
        string name;
        string passport; // Will store Aadhaar for Indian citizens
        string dateOfBirth;
        string nationality;
        string phoneNumber;
        string entryPoint;
    }
    
    struct TripInfo {
        string arrivalDate;
        string departureDate;
        string primaryDestination;
        string purposeOfVisit;
        string accommodationDetails;
        string itinerary;
    }
    
    struct EmergencyInfo {
        string emergencyContactName;
        string emergencyContactPhone;
        string emergencyContactRelation;
        string emergencyContactAddress;
        string localEmergencyContact;
    }
    
    struct Tourist {
        KYCInfo kyc;
        TripInfo trip;
        EmergencyInfo emergency;
        string userType; // 'indian' or 'foreign'
        uint256 validUntil;
        uint256 registrationTimestamp;
        bool isActive;
    }

    mapping(address => Tourist) public tourists;
    mapping(string => address) public passportToAddress; // For quick passport lookup
    
    event TouristRegistered(
        address indexed walletAddress,
        string passport,
        string name,
        string userType,
        uint256 validUntil
    );
    
    event TouristUpdated(
        address indexed walletAddress,
        string passport
    );

    function registerTourist(
        KYCInfo memory kycInfo,
        TripInfo memory tripInfo,
        EmergencyInfo memory emergencyInfo,
        string memory userType,
        uint256 validUntil
    ) public {
        require(bytes(kycInfo.name).length > 0, "Name is required");
        require(bytes(kycInfo.passport).length > 0, "Passport/Aadhaar is required");
        require(validUntil > block.timestamp, "Valid until must be in the future");
        
        // Check if passport is already registered
        if (passportToAddress[kycInfo.passport] != address(0) && passportToAddress[kycInfo.passport] != msg.sender) {
            revert("Passport/Aadhaar already registered to another address");
        }
        
        tourists[msg.sender] = Tourist({
            kyc: kycInfo,
            trip: tripInfo,
            emergency: emergencyInfo,
            userType: userType,
            validUntil: validUntil,
            registrationTimestamp: block.timestamp,
            isActive: true
        });
        
        passportToAddress[kycInfo.passport] = msg.sender;
        
        emit TouristRegistered(msg.sender, kycInfo.passport, kycInfo.name, userType, validUntil);
    }

    function getTourist(address user) public view returns (Tourist memory) {
        return tourists[user];
    }
    
    function getTouristByPassport(string memory passport) public view returns (address, Tourist memory) {
        address userAddress = passportToAddress[passport];
        require(userAddress != address(0), "Tourist not found");
        return (userAddress, tourists[userAddress]);
    }
    
    function updateTouristStatus(address user, bool status) public {
        require(tourists[user].registrationTimestamp > 0, "Tourist not found");
        tourists[user].isActive = status;
        emit TouristUpdated(user, tourists[user].kyc.passport);
    }
    
    function isValidTourist(address user) public view returns (bool) {
        Tourist memory tourist = tourists[user];
        return tourist.isActive && 
               tourist.validUntil > block.timestamp && 
               tourist.registrationTimestamp > 0;
    }
    
    function getTouristCount() public view returns (uint256) {
        // Note: This is a simplified counter, in production you'd want to maintain an actual counter
        return 0; // Would need to implement proper counting mechanism
    }
}