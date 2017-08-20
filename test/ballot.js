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
        var account_zero = accounts[0];
        var account_two = accounts[2];

        return Ballot.new(proposals).then(function(instance) {
            ballot = instance;
            console.log("ballot: " + ballot);
            // for(var propName in ballot) {
            //     propValue = ballot[propName]
            //
            //     console.log(propName,propValue);
            // }
            return ballot.giveRightToVote(account_two, {from: account_zero} );
        }).then(function() {
            return ballot.vote(1, {from: account_two});
        }).then(function() {
            return ballot.winningProposal.call();
        }).then(function(winner) {
            assert.equal(winner.valueOf(), 1, "proposal 1 was the winner");
        }).then(function() {
            return ballot.winnerName.call();
        }).then(function(winnerNameStr) {

          // Convert the hex string of bytes to ascii
          // TODO: there must be a nicer way to do this...
          var nameStr = winnerNameStr.match(/.{1,2}/g).map(function(v){
              return String.fromCharCode(parseInt(v, 16));
          }).join('');

          // Trim all the nul characters from the conversion
          nameStr = nameStr.replace(new RegExp("\u0000", 'g'), ""); // removes NUL chars

          assert.equal(nameStr, "second", "proposal 'second' was the winner");
        });
    });

    it("should not allow voting twice", function() {

        var ballot;
        var proposals = ["first", "second"];
        var account_zero = accounts[0];
        var account_two = accounts[2];

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
