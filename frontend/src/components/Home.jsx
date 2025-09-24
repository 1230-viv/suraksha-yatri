import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Home = () => {
  const [stats, setStats] = useState({
    tourists: 1247,
    countries: 45,
    transactions: 12456,
    uptime: 99.9
  })

  const features = [
    {
      title: 'Blockchain Security',
      description: 'Tamper-proof digital IDs stored securely with government-grade encryption.',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Government Verified',
      description: 'Complete identity verification with Aadhaar, passport, and travel itinerary integration.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'from-slate-600 to-slate-700'
    },
    {
      title: 'Emergency Support',
      description: 'Instant access to tourist information for Indian authorities and emergency services.',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      color: 'from-red-600 to-red-700'
    },
    {
      title: 'Pan-India Access',
      description: 'Access your digital ID across all Indian states with instant verification capabilities.',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      color: 'from-amber-600 to-yellow-600'
    }
  ]

  const benefits = [
    { icon: '🔒', title: 'Secure', description: 'Government-grade security' },
    { icon: '⚡', title: 'Instant', description: 'Quick verification' },
    { icon: '🏛️', title: 'Official', description: 'Government approved' },
    { icon: '📱', title: 'Digital', description: 'Modern technology' }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-slate-800/90 to-blue-900/95"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <g fill="currentColor" fillOpacity="0.1">
                <circle cx="30" cy="30" r="2"/>
                <circle cx="10" cy="10" r="1"/>
                <circle cx="50" cy="50" r="1"/>
                <circle cx="10" cy="50" r="1"/>
                <circle cx="50" cy="10" r="1"/>
              </g>
            </g>
          </svg>
        </div>

        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="block">Welcome to</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                Suaraksha Yatri
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              India's secure blockchain-powered digital tourist identification system. 
              Travel across India with government-verified digital identity.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-800 hover:bg-gray-50 font-semibold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Register Now
              </Link>
              <Link
                to="/view"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{benefit.icon}</div>
                  <h3 className="text-white font-semibold text-lg">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2">
                {stats.tourists.toLocaleString()}+
              </div>
              <div className="text-gray-700 font-medium">Registered Tourists</div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200">
              <div className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                28
              </div>
              <div className="text-gray-700 font-medium">Indian States</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-xl border border-amber-200">
              <div className="text-3xl lg:text-4xl font-bold text-amber-800 mb-2">
                {stats.transactions.toLocaleString()}+
              </div>
              <div className="text-gray-700 font-medium">Verified IDs</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
              <div className="text-3xl lg:text-4xl font-bold text-green-800 mb-2">
                {stats.uptime}%
              </div>
              <div className="text-gray-700 font-medium">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-800">Suaraksha Yatri</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience secure travel across India with government-approved blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 animate-slide-up rounded-xl border border-gray-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Status Section */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Blockchain Network Status
              </h2>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Live
              </span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-2">Network</div>
                <div className="text-lg font-bold text-gray-900">Hardhat Local</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-2">Smart Contract</div>
                <div className="text-lg font-bold text-gray-900">TouristID.sol</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-2">Response Time</div>
                <div className="text-lg font-bold text-gray-900">&lt; 100ms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-slate-800 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Explore India Safely?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian travelers who trust Suaraksha Yatri for secure digital identity
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-800 font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-2xl"
          >
            Start Your Journey
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home