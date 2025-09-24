import hre from "hardhat";
import { parseEther } from "viem";

async function main() {
  console.log("🚀 Deploying Digital Tourist ID Generation Platform...");
  
  // Get the contract factory using Viem
  const touristID = await hre.viem.deployContract("TouristID");
  
  console.log("✅ TouristID contract deployed successfully!");
  console.log("📄 Contract address:", touristID.address);
  
  // Update the backend configuration
  console.log("\n📝 Update your backend index.js with this contract address:");
  console.log(`const CONTRACT_ADDRESS = "${touristID.address}";`);
  
  return touristID.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then((address) => {
    console.log(`\n🎉 Deployment completed! Contract address: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });