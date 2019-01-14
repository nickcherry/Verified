pragma solidity ^0.5.0;

contract Registry {
  function register(string memory url) public pure returns (string memory) {
    return url;
  }
}