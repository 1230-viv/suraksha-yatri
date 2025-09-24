# Suraksha Yatri - Digital Tourist ID Platform

> A blockchain-based digital identity platform for secure tourist registration and verification

[![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-v19.1.1-blue.svg)](https://reactjs.org/)
[![Hardhat](https://img.shields.io/badge/hardhat-blockchain-yellow.svg)](https://hardhat.org/)

## Overview

Suraksha Yatri enables government tourism departments to manage tourist credentials securely using blockchain technology. Tourists can register their information and generate tamper-proof digital IDs, while authorities can verify credentials in real-time.

## Key Features

- **Blockchain Security**: Immutable tourist records stored on Ethereum
- **Complete KYC**: Personal info, travel details, and emergency contacts
- **Real-time Verification**: Instant credential validation
- **Government UI**: Professional interface with responsive design
- **Smart Contracts**: Automated validation and data integrity

## Tech Stack

- **Backend**: Node.js + Express.js (MVC architecture)
- **Frontend**: React 19 + Vite + Tailwind CSS
- **Blockchain**: Ethereum + Hardhat + Solidity
- **Integration**: Ethers.js for blockchain connectivity

## Quick Start

### Prerequisites
- Node.js v18+
- npm

### Installation & Setup

```bash
# Clone and install dependencies
git clone https://github.com/1230-viv/suraksha-yatri.git
cd suraksha-yatri

# Install all dependencies
cd backend && npm install
cd ../frontend && npm install  
cd ../blockchain && npm install

# Start blockchain network
cd blockchain && npx hardhat node

# Deploy contracts (new terminal)
npx hardhat ignition deploy ./ignition/modules/TouristID.ts --network localhost

# Start backend (new terminal)
cd backend && npm start

# Start frontend (new terminal)  
cd frontend && npm run dev
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Blockchain RPC**: http://localhost:8545

## Project Structure

```
├── backend/          # Node.js API (MVC architecture)
├── frontend/         # React + Vite application  
├── blockchain/       # Smart contracts + Hardhat
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tourist/register` | Register new tourist |
| GET | `/api/tourist/address/:address` | Get tourist by wallet |
| GET | `/api/tourist/passport/:passport` | Get tourist by passport |
| GET | `/api/tourist/validate/:address` | Validate tourist status |
| GET | `/api/health` | System health check |

## Environment Setup

Create `.env` files in respective directories:

**Backend (.env)**
```env
PORT=5000
BLOCKCHAIN_NETWORK_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000
```

## Testing

```bash
# Test smart contracts
cd blockchain && npx hardhat test

# Test backend
cd backend && npm test

# Test frontend
cd frontend && npm run test
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Made for Digital India Initiative** 🇮🇳