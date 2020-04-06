const SalePoint = artifacts.require("SalePoint");

module.exports = function(deployer) {
  deployer.deploy(SalePoint);
};