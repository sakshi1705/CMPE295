const AuctionBox = artifacts.require("AuctionBox");

module.exports = function(deployer) {
  deployer.deploy(AuctionBox);
};