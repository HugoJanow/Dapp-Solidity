// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataConsumerV3.sol";

contract HugoToken is ERC20, Ownable, DataConsumerV3
{
    uint256 private constant PRICE_PER_TOKEN = 10;

    constructor() ERC20 ("HUGO", "HUGO") Ownable(msg.sender) {}

    function mint(address _to, uint256 _amount) external payable {
        int256 ethdollars = getChainlinkDataFeedLatestAnswer();
        require(ethdollars > 0, "invalid price feed value");

        uint256 ethdollarsUint = uint256(ethdollars / 1e8);
        uint256 expectedPriceInWei = (PRICE_PER_TOKEN * 1 ether * _amount) / ethdollarsUint;
        console.log("eth in dollars", ethdollarsUint);
        console.log("Expected price in Wei", expectedPriceInWei);
        console.log("value provided", msg.value);

        require(msg.value >= expectedPriceInWei, "Not enough funds provided");
        _mint(_to, _amount);
    }
}