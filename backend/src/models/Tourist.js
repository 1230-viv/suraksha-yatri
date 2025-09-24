class TouristModel {
  constructor(data) {
    this.validateRequiredFields(data);
    
    this.kyc = {
      name: data.name?.trim(),
      passport: data.passport?.trim().toUpperCase(),
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality?.trim(),
      phoneNumber: data.phoneNumber?.trim(),
      entryPoint: data.entryPoint?.trim()
    };

    this.trip = {
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      primaryDestination: data.primaryDestination?.trim(),
      purposeOfVisit: data.purposeOfVisit?.trim(),
      accommodationDetails: data.accommodationDetails?.trim() || '',
      itinerary: data.itinerary?.trim() || ''
    };

    this.emergency = {
      emergencyContactName: data.emergencyContactName?.trim(),
      emergencyContactPhone: data.emergencyContactPhone?.trim(),
      emergencyContactRelation: data.emergencyContactRelation?.trim(),
      emergencyContactAddress: data.emergencyContactAddress?.trim() || '',
      localEmergencyContact: data.localEmergencyContact?.trim() || ''
    };

    this.userType = data.userType?.trim() || 'tourist';
    this.validUntil = this.calculateValidUntil(data.departureDate);
  }

  validateRequiredFields(data) {
    const requiredKYCFields = ['name', 'passport', 'dateOfBirth', 'nationality', 'phoneNumber', 'entryPoint'];
    const requiredTripFields = ['arrivalDate', 'departureDate', 'primaryDestination', 'purposeOfVisit'];
    const requiredEmergencyFields = ['emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation', 'emergencyContactAddress'];

    const missingFields = [];

    // Check KYC fields
    requiredKYCFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        missingFields.push(`KYC: ${field}`);
      }
    });

    // Check Trip fields
    requiredTripFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        missingFields.push(`Trip: ${field}`);
      }
    });

    // Check Emergency fields
    requiredEmergencyFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        missingFields.push(`Emergency: ${field}`);
      }
    });

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate date formats
    if (!this.isValidDate(data.dateOfBirth)) {
      throw new Error('Invalid date of birth format. Use YYYY-MM-DD');
    }

    if (!this.isValidDate(data.arrivalDate)) {
      throw new Error('Invalid arrival date format. Use YYYY-MM-DD');
    }

    if (!this.isValidDate(data.departureDate)) {
      throw new Error('Invalid departure date format. Use YYYY-MM-DD');
    }

    // Optional: Validate email format if provided in address field
    // Note: Using address field for now, could be enhanced later

    // Validate dates logic
    const arrival = new Date(data.arrivalDate);
    const departure = new Date(data.departureDate);
    
    if (departure <= arrival) {
      throw new Error('Departure date must be after arrival date');
    }

    // Check if dates are not in the past (with some tolerance for same day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (arrival < today) {
      throw new Error('Arrival date cannot be in the past');
    }
  }

  calculateValidUntil(departureDate) {
    // Add 1 day buffer after departure date for validity
    const departure = new Date(departureDate);
    departure.setDate(departure.getDate() + 1);
    return Math.floor(departure.getTime() / 1000); // Unix timestamp
  }

  isValidDate(dateString) {
    if (!dateString) return false;
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && date.toISOString().slice(0, 10) === dateString;
  }

  isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Convert to blockchain format
  toBlockchainFormat() {
    return {
      kyc: this.kyc,
      trip: this.trip,
      emergency: this.emergency,
      userType: this.userType,
      validUntil: this.validUntil
    };
  }

  // Create from blockchain data
  static fromBlockchainData(blockchainData) {
    return {
      kyc: blockchainData.kyc,
      trip: blockchainData.trip,
      emergency: blockchainData.emergency,
      userType: blockchainData.userType,
      registrationTimestamp: blockchainData.registrationTimestamp,
      validUntil: blockchainData.validUntil,
      isActive: blockchainData.isActive,
      // Computed fields
      isValid: blockchainData.isActive && blockchainData.validUntil > Math.floor(Date.now() / 1000),
      daysRemaining: Math.max(0, Math.ceil((blockchainData.validUntil - Math.floor(Date.now() / 1000)) / 86400))
    };
  }
}

module.exports = TouristModel;