require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://rpc.sepolia.org",
      accounts: ["0x" + process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
