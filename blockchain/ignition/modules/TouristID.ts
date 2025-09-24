import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TouristIDModule = buildModule("TouristIDModule", (m) => {
  const touristID = m.contract("TouristID");

  return { touristID };
});

export default TouristIDModule;