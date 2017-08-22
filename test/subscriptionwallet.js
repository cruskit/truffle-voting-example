var SubscriptionWallet = artifacts.require("./SubscriptionWallet.sol");

contract('SubscriptionWallet', function(accounts) {

    var wallet;

    it("should start with a zero balance", function () {
        return SubscriptionWallet.deployed().then(function (instance) {
            wallet = instance;
            return wallet.getBalance.call();
        }).then(function (balance) {
            assert.equal(balance.valueOf(), 0, "wallet balance initally zero");
        });
    });


    it("should increase balance when sent funds", function () {
            var funds = 234;
            return wallet.fundMe( {from: accounts[1], value: funds} ).then(function () {
            return wallet.getBalance.call();
        }).then(function (balance) {
            assert.equal(balance.valueOf(), 234, "wallet balance increased to 2345");
        });
    });


    it("should allow a subscription to be registered", function () {
        return wallet.addSubscription( accounts[2], "demo", 10).then(function () {
            return wallet.subscriptions.call( accounts[2] );
        }).then(function (subscription) {
            //console.log("subscription: " + subscription);
            // for(var propName in subscription) {
            //     propValue = subscription[propName]
            //     console.log(propName,propValue);
            // }
            assert.equal(subscription[0], 1, "new subscription is in pending state");
            assert.equal(subscription[2], 10, "new subscription is has 10 monthly charge");
        });
    });

});
