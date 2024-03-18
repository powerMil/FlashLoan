const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


// Mainnet DAI Address
const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";

// Random user's address that happens to have a lot of DAI on Polygon Mainnet
//const DAI_WHALE = "0xdfD74E3752c187c4BA899756238C76cbEEfa954B";

// Mainnet Pool contract address
const POOL_ADDRESS_PROVIDER = "0xa97684ead0e402dc232d5a977953df7ecbab3cdb";

describe("Storage", function () {
  it("test initial value", async function () {
    const SimpleFlashLoan = await ethers.getContractFactory("SimpleFlashLoan", [POOL_ADDRESS_PROVIDER]);
    let simpleFlashLoan = SimpleFlashLoan.attach("0x45C823850AeB23E2ed11c9105d5f666C0BD539d1")

    const token = await ethers.getContractAt("IERC20", DAI);
    const BALANCE_AMOUNT_DAI = ethers.parseEther("1");


    // Random user's address that happens to have a lot of DAI on Polygon Mainnet
    const DAI_WHALE = "0x25E53Fe97360906cb990417cf0292a25DcF06075";

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    });

    const signer = await ethers.getSigner(DAI_WHALE);

    await token.connect(signer).transfer(simpleFlashLoan.target, BALANCE_AMOUNT_DAI);

    const tx = await simpleFlashLoan.createFlashLoan(DAI, ethers.parseEther("1000000")); // Borrow 1000 DAI in a Flash Loan with no upfront collateral
    await tx.wait();
    console.log(tx);
    const remainingBalance = await token.balanceOf(simpleFlashLoan.target); // Check the balance of DAI in the Flash Loan contract afterwards
    console.log(`remaining balance: ${remainingBalance}`)
    
  });
});