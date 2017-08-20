var Ballot = artifacts.require("./Ballot.sol");

contract('Ballot', function(accounts) {
    it("should return 0 as the ballot winner", function() {
        return Ballot.deployed().then(function(instance) {
            return instance.winningProposal.call();
        }).then(function(winner) {
            assert.equal(winner.valueOf(), 0, "0 was the winner");
        });
    });
    it("should be able to add a voter and vote", function() {

        var ballot;
        var proposals = ["first", "second"];
        var account_zero = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";
        var account_two = "0x22d491bde2303f2f43325b2108d26f1eaba1e32b";

        return Ballot.new(proposals).then(function(instance) {
            ballot = instance;
            console.log("ballot: " + ballot);
            for(var propName in ballot) {
                propValue = ballot[propName]

                console.log(propName,propValue);
            }
            return ballot.giveRightToVote(account_two, {from: account_zero} );
        }).then(function() {
            return ballot.vote(1, {from: account_two});
        }).then(function() {
            return ballot.winningProposal.call();
        }).then(function(winner) {
            assert.equal(winner.valueOf(), 1, "proposal 1 was the winner");
        });
    });

    it("should not allow voting twice", function() {

        var ballot;
        var proposals = ["first", "second"];
        var account_zero = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";
        var account_two = "0x22d491bde2303f2f43325b2108d26f1eaba1e32b";

        return Ballot.new(proposals).then(function(instance) {
            ballot = instance;
            return ballot.giveRightToVote(account_two, {from: account_zero} );
        }).then(function() {
            return ballot.vote(1, {from: account_two});
        }).then(function() {
            // This should throw an exception as can only call once
            return ballot.vote(2, {from: account_two});
        }).then(function() {
            assert.isOk(false, "Should have thrown exception on second vote");
        });
    });

});
