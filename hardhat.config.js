require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20", // ou 0.8.28 si tu veux être strictement sur la version de Lock.sol
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};