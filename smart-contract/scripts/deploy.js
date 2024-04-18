const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const ContractFactory = await hre.ethers.getContractFactory("CrowdFunding");

  console.log("Deploying contracts with the account:", deployer.address);
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Address of this contract: ", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
