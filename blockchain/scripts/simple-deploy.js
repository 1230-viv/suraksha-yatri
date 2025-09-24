const hre = require("hardhat");

async function main() {
  console.log("Deploying TouristID contract...");
  
  const TouristID = await hre.ethers.getContractFactory("TouristID");
  const touristID = await TouristID.deploy();
  
  await touristID.waitForDeployment();
  
  const address = await touristID.getAddress();
  console.log("TouristID deployed to:", address);
  
  // The deployed address should match the one in the backend config
  console.log("Expected address: 0x5FbDB2315678afecb367f032d93F642f64180aa3");
  console.log("Addresses match:", address.toLowerCase() === "0x5FbDB2315678afecb367f032d93F642f64180aa3".toLowerCase());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });