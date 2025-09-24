import { useState } from 'react'
import apiService from '../services/apiService.js'

const ViewTourist = () => {
  const [address, setAddress] = useState('')
  const [touristData, setTouristData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTouristData(null)

    try {
      const response = await apiService.getTouristByAddress(address)
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to retrieve tourist information')
      }
      
      setTouristData(response)
    } catch (err) {
      setError(err.message || err.error || 'Failed to retrieve tourist information')
    } finally {
      setLoading(false)
    }
  }

  const getRandomWallet = async () => {
    try {
      const response = await apiService.getWalletInfo()
      
      if (!response.success) {
        throw new Error('Failed to get wallet address')
      }
      
      setAddress(response.data.address)
    } catch (err) {
      setError(err.message || 'Failed to get wallet address')
    }
  }

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">View Tourist Digital ID</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter the blockchain wallet address to retrieve secure tourist information
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <div className="flex space-x-4">
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 flex-1"
                  placeholder="Enter Ethereum wallet address (0x...)"
                  required
                />
                <button
                  type="button"
                  onClick={getRandomWallet}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors duration-200 whitespace-nowrap"
                >
                  Use Test Address
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                The wallet address is generated when a tourist registers their digital ID
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-red-800">Error</h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !address}
              className={`w-full bg-gradient-to-r from-blue-800 to-slate-800 text-white hover:from-blue-700 hover:to-slate-700 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg ${
                (loading || !address) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Retrieving Information...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Retrieve Tourist Information
                </div>
              )}
            </button>
          </form>
        </div>

        {touristData && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Digital Tourist ID</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">Government Verified on Blockchain</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.kyc.name}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Passport Number
                      </label>
                      <p className="text-lg font-mono text-gray-900">{touristData.data.tourist.kyc.passport}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Date of Birth
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.kyc.dateOfBirth}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Nationality
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.kyc.nationality}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Valid Until
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{formatDate(touristData.data.tourist.validUntil)}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.kyc.phoneNumber}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Entry Point
                      </label>
                      <p className="text-lg font-semibold text-gray-900 capitalize">{touristData.data.tourist.kyc.entryPoint}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Status
                      </label>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${touristData.data.tourist.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className={`text-lg font-semibold ${touristData.data.tourist.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {touristData.data.tourist.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Travel Details
                  </h3>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Arrival Date
                    </label>
                    <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.trip.arrivalDate}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Departure Date
                    </label>
                    <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.trip.departureDate}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Primary Destination
                    </label>
                    <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.trip.primaryDestination}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Purpose of Visit
                    </label>
                    <p className="text-lg font-semibold text-gray-900">{touristData.data.tourist.trip.purposeOfVisit}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Travel Itinerary
                    </label>
                    <p className="text-gray-900 leading-relaxed">{touristData.data.tourist.trip.itinerary}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Accommodation Details
                    </label>
                    <p className="text-gray-900 leading-relaxed">{touristData.data.tourist.trip.accommodationDetails}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      Emergency Contact
                    </label>
                    <div className="space-y-2">
                      <p className="text-gray-900 font-medium">{touristData.data.tourist.emergency.emergencyContactName}</p>
                      <p className="text-gray-700">{touristData.data.tourist.emergency.emergencyContactPhone}</p>
                      <p className="text-gray-700">{touristData.data.tourist.emergency.emergencyContactRelation}</p>
                      <p className="text-gray-700">{touristData.data.tourist.emergency.emergencyContactAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Blockchain Information
              </h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 rounded-lg border border-blue-200">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Wallet Address
                    </label>
                    <p className="text-sm font-mono text-gray-900 break-all">{touristData.data.address}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      User Type
                    </label>
                    <p className="text-sm font-medium text-gray-900 capitalize">{touristData.data.tourist.userType}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Days Remaining
                    </label>
                    <p className="text-sm font-medium text-gray-900">{touristData.data.tourist.daysRemaining} days</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Registration Date
                    </label>
                    <p className="text-sm font-medium text-gray-900">{formatDate(touristData.data.tourist.registrationTimestamp)}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Network
                    </label>
                    <p className="text-sm font-medium text-gray-900">Government Secured Network</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  This information is government-verified and cryptographically secured
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print ID Card
              </button>
              <button
                onClick={() => {
                  setTouristData(null)
                  setAddress('')
                }}
                className="inline-flex items-center px-6 py-3 bg-blue-800 text-white hover:bg-blue-700 font-semibold rounded-xl transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Another ID
              </button>
            </div>
          </div>
        )}

        {!touristData && !loading && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500 text-lg">Enter a wallet address to view tourist information</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewTourist