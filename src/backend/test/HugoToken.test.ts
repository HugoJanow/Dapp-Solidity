import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import hre from "hardhat";

describe("HugoToken Tests", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const HugoToken = await hre.ethers.getContractFactory("HugoToken");
    const hugoToken = await HugoToken.deploy();

    return { hugoToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract and get the right price for 1 eth", async function () {
      const { hugoToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainLink = await hugoToken.getChainlinkDataFeedLatestAnswer();
      const ethDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      assert(parseInt(ethDollars) >= 2900)
    });
  });

  describe('Mint', function() {
    it('Should NOT mint if not enough funds are provided', async function() {
      const { hugoToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainLink = await hugoToken.getChainlinkDataFeedLatestAnswer();
      const ethDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethDollars);
      const priceFor18Tokens = hre.ethers.parseEther(amountEthFor18Tokens.toString());
      await expect(hugoToken.mint(owner.address, 20, { value: priceFor18Tokens })).to.be.
      revertedWith('Not enough funds provided');
    })
  })
});
