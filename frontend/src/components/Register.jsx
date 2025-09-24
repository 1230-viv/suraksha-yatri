import { useState } from 'react'
import apiService from '../services/apiService.js'

const Register = () => {
  const [formData, setFormData] = useState({
    // KYC Information
    name: '',
    passport: '',
    aadhaar: '',
    dateOfBirth: '',
    nationality: '',
    phoneNumber: '',
    entryPoint: '',
    
    // Trip Itinerary
    arrivalDate: '',
    departureDate: '',
    primaryDestination: '',
    purposeOfVisit: '',
    accommodationDetails: '',
    itinerary: '',
    
    // Emergency Contacts
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    emergencyContactAddress: '',
    localEmergencyContact: '',
    
    // System fields
    validUntil: ''
  })
  const [userType, setUserType] = useState('indian') // 'indian' or 'foreign'
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Get wallet address first
      const walletResponse = await apiService.getWalletInfo()
      
      if (!walletResponse.success) {
        throw new Error('Failed to get wallet information')
      }
      
      const address = walletResponse.data.address

      // Automatically set validity period based on departure date
      const validUntil = formData.departureDate || formData.validUntil

      // Prepare registration data for new MVC backend structure
      const registrationData = {
        // KYC Information
        name: formData.name,
        passport: userType === 'foreign' ? formData.passport : formData.aadhaar,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
        phoneNumber: formData.phoneNumber,
        entryPoint: formData.entryPoint,
        
        // Trip Itinerary
        arrivalDate: formData.arrivalDate,
        departureDate: formData.departureDate,
        primaryDestination: formData.primaryDestination,
        purposeOfVisit: formData.purposeOfVisit,
        accommodationDetails: formData.accommodationDetails || '',
        itinerary: formData.itinerary || '',
        
        // Emergency Contacts (matching smart contract structure)
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        emergencyContactRelation: formData.emergencyContactRelation,
        emergencyContactAddress: formData.emergencyContactAddress,
        localEmergencyContact: formData.localEmergencyContact || '',
        
        // System Information
        userType,
        validUntil
      }
      
      const response = await apiService.registerTourist(registrationData)

      if (!response.success) {
        throw new Error(response.message || 'Registration failed')
      }

      setWalletAddress(address)
      setSuccess(true)
      setFormData({
        // KYC Information
        name: '',
        passport: '',
        aadhaar: '',
        dateOfBirth: '',
        nationality: '',
        phoneNumber: '',
        entryPoint: '',
        
        // Trip Itinerary
        arrivalDate: '',
        departureDate: '',
        primaryDestination: '',
        purposeOfVisit: '',
        accommodationDetails: '',
        itinerary: '',
        
        // Emergency Contacts
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        emergencyContactAddress: '',
        localEmergencyContact: '',
        
        // System fields
        validUntil: ''
      })
        } catch (error) {
      console.error('Registration failed:', error)
      setError(error.message || error.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in border border-gray-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your digital tourist ID has been created and stored securely on the blockchain.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Your Wallet Address:</p>
              <p className="text-xs font-mono bg-white p-2 rounded border break-all">{walletAddress}</p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex items-center px-6 py-3 bg-blue-800 text-white hover:bg-blue-700 font-semibold rounded-xl transition-colors duration-200 mr-4"
            >
              Register Another Tourist
            </button>
            <a
              href="/view"
              className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors duration-200"
            >
              View Your ID
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Digital Tourist ID Generation Platform</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Secure blockchain-based digital ID system for tourists. Valid only for your visit duration with complete KYC verification.
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setUserType('indian')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  userType === 'indian'
                    ? 'bg-gradient-to-r from-blue-600 to-slate-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                �️ Indian Citizen
              </button>
              <button
                type="button"
                onClick={() => setUserType('foreign')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  userType === 'foreign'
                    ? 'bg-gradient-to-r from-slate-600 to-blue-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌍 Foreign Visitor
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* KYC Information Section */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                KYC Information (Know Your Customer)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="As per government ID document"
                  />
                </div>

                <div>
                  {userType === 'indian' ? (
                    <>
                      <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Card Number *
                      </label>
                      <input
                        type="text"
                        id="aadhaar"
                        name="aadhaar"
                        required
                        value={formData.aadhaar}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="1234 5678 9012"
                        pattern="[0-9]{12}"
                        maxLength="12"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        12-digit Aadhaar number for Indian citizens
                      </p>
                    </>
                  ) : (
                    <>
                      <label htmlFor="passport" className="block text-sm font-medium text-gray-700 mb-2">
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        id="passport"
                        name="passport"
                        required
                        value={formData.passport}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                        placeholder="e.g., A1234567"
                      />
                    </>
                  )}
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder={userType === 'indian' ? 'Indian' : 'Your nationality'}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="entryPoint" className="block text-sm font-medium text-gray-700 mb-2">
                    Entry Point *
                  </label>
                  <select
                    id="entryPoint"
                    name="entryPoint"
                    required
                    value={formData.entryPoint}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  >
                    <option value="">Select entry point</option>
                    <option value="airport">Airport</option>
                    <option value="hotel">Hotel</option>
                    <option value="checkpost">Border Check Post</option>
                    <option value="railway">Railway Station</option>
                    <option value="seaport">Seaport</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Trip Itinerary Section */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Trip Itinerary Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Date *
                  </label>
                  <input
                    type="date"
                    id="arrivalDate"
                    name="arrivalDate"
                    required
                    value={formData.arrivalDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    required
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label htmlFor="primaryDestination" className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Destination *
                  </label>
                  <input
                    type="text"
                    id="primaryDestination"
                    name="primaryDestination"
                    required
                    value={formData.primaryDestination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="e.g., New Delhi, Mumbai, Goa"
                  />
                </div>

                <div>
                  <label htmlFor="purposeOfVisit" className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose of Visit *
                  </label>
                  <select
                    id="purposeOfVisit"
                    name="purposeOfVisit"
                    required
                    value={formData.purposeOfVisit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  >
                    <option value="">Select purpose</option>
                    <option value="tourism">Tourism/Leisure</option>
                    <option value="business">Business</option>
                    <option value="medical">Medical</option>
                    <option value="education">Education</option>
                    <option value="pilgrimage">Pilgrimage</option>
                    <option value="family">Family Visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="accommodationDetails" className="block text-sm font-medium text-gray-700 mb-2">
                  Accommodation Details *
                </label>
                <textarea
                  id="accommodationDetails"
                  name="accommodationDetails"
                  required
                  rows="3"
                  value={formData.accommodationDetails}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 resize-none"
                  placeholder="Hotel name, address, booking confirmation number"
                />
              </div>

              <div>
                <label htmlFor="itinerary" className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Travel Itinerary *
                </label>
                <textarea
                  id="itinerary"
                  name="itinerary"
                  required
                  rows="4"
                  value={formData.itinerary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 resize-none"
                  placeholder="Places to visit, planned activities, transportation details"
                />
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Emergency Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    required
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="Full name of emergency contact"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    required
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContactRelation" className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship *
                  </label>
                  <select
                    id="emergencyContactRelation"
                    name="emergencyContactRelation"
                    required
                    value={formData.emergencyContactRelation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  >
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                    <option value="colleague">Colleague</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="emergencyContactAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Address *
                  </label>
                  <input
                    type="text"
                    id="emergencyContactAddress"
                    name="emergencyContactAddress"
                    required
                    value={formData.emergencyContactAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="Full address of emergency contact"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="localEmergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                  Local Emergency Contact (Optional)
                </label>
                <input
                  type="text"
                  id="localEmergencyContact"
                  name="localEmergencyContact"
                  value={formData.localEmergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  placeholder="Local contact person in India (name and phone)"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-red-800">Registration Error</h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Auto Validity Calculation */}
            {formData.arrivalDate && formData.departureDate && (
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Digital ID Validity Period
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Valid From</p>
                      <p className="text-lg font-semibold text-gray-900">{new Date(formData.arrivalDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Valid Until</p>
                      <p className="text-lg font-semibold text-gray-900">{new Date(formData.departureDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {Math.ceil((new Date(formData.departureDate) - new Date(formData.arrivalDate)) / (1000 * 60 * 60 * 24))} days
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-amber-700 mt-3 text-center">
                    Your digital ID will be automatically valid for your entire visit duration
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">Digital Tourist ID Generation Platform</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Secure blockchain-based system that issues digital IDs at entry points (airports, hotels, check-posts). 
                    Includes complete KYC verification and is valid only for your visit duration.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-800 to-slate-800 text-white hover:from-blue-700 hover:to-slate-700 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Your Digital ID...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Create Secure Digital ID
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have a digital ID?{' '}
              <a href="/view" className="text-blue-600 hover:text-blue-700 font-medium">
                View your information
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register