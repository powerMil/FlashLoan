// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "./IERC20.sol";


contract SimpleFlashLoan is FlashLoanSimpleReceiverBase {
  event Log(address asset, uint val);

  constructor(IPoolAddressesProvider provider) FlashLoanSimpleReceiverBase(provider) {}

  function createFlashLoan(address asset, uint amount) external {
    address receiver = address(this);
    bytes memory params = "";
    uint16 referralCode = 0;

    emit Log(asset, IERC20(asset).balanceOf(address(this)));

    POOL.flashLoanSimple(
      receiver,
      asset,
      amount,
      params,
      referralCode
    );
  }

  function executeOperation(
    address asset,
    uint256 amount,
    uint256 premium,
    address initiator,
    bytes calldata params
  ) external returns (bool){

    // run arbitrage or liquidations here
    // abi.decode(params) to decode params

    emit Log(asset, IERC20(asset).balanceOf(address(this)));
    
    uint amountOwing = amount + premium;
    IERC20(asset).approve(address(POOL), amountOwing);

    return true;
  }
}