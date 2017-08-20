# truffle-voting-example
Solidity contract example using truffle

Example of how to write a Solidity contract that allows for a vote with tallying of the results.

Also has java script tests written to show how to exercise the Solidity contract and prove it works correctly.

Contract is adapted from the [solidity by example - voting example](http://solidity.readthedocs.io/en/develop/solidity-by-example.html).
(Removed the delegation to keep it simple.)

Pre-requisites:
* Have [truffle](http://truffleframework.com/) installed
* Have an instance of [testrpc](https://github.com/ethereumjs/testrpc) running

To run:

```
truffle compile
truffle test
```
