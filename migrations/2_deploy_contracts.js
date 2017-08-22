var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Ballot = artifacts.require("./Ballot.sol");
var SubscriptionWallet = artifacts.require("./SubscriptionWallet.sol");


module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Ballot);
  deployer.deploy(SubscriptionWallet);
};
