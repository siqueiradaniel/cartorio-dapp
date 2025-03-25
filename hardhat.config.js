require('dotenv').config();  // Load .env variables
require("@nomicfoundation/hardhat-toolbox");  // This includes everything you need for Hardhat

module.exports = {
  solidity: "0.8.28",  // Or the version you're using
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // Infura Sepolia RPC
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Your private key from .env
    },
  },
};
