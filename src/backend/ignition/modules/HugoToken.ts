import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const HugoModule = buildModule("HugoModule", (m) => {
  
  const HUGO = m.contract("HugoToken");

  return { HUGO };
});

export default HugoModule;
