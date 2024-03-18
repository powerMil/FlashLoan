require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10"
      }
    ],
  },
};
