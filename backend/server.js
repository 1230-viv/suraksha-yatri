const app = require('./src/app');
const { APP_CONFIG } = require('./src/config/app');
const blockchainService = require('./src/services/blockchainService');

async function startServer() {
  try {
    // Initialize blockchain service
    console.log('🔄 Initializing blockchain connection...');
    await blockchainService.initialize();

    // Start the server
    const server = app.listen(APP_CONFIG.PORT, () => {
      console.log('\n🚀 Digital Tourist ID Generation Platform API');
      console.log('📋 Comprehensive KYC & Itinerary Management System');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🌐 Server running on: http://localhost:${APP_CONFIG.PORT}`);
      console.log(`📊 API Endpoints: http://localhost:${APP_CONFIG.PORT}${APP_CONFIG.API_PREFIX}`);
      console.log(`❤️  Health Check: http://localhost:${APP_CONFIG.PORT}${APP_CONFIG.API_PREFIX}/health`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🔧 Environment: ${APP_CONFIG.NODE_ENV}`);
      console.log(`⚙️  Process ID: ${process.pid}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('\n⏹️  Received SIGTERM. Graceful shutdown...');
      server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\n⏹️  Received SIGINT. Graceful shutdown...');
      server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();