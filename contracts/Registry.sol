pragma solidity ^0.5.0;

contract Registry {
  mapping (address => mapping (string => bool)) publications;

  function publish(string memory url) public returns (bool) {
    publications[msg.sender][url] = true;
    return true;
  }

  function unpublish(string memory url) public returns (bool) {
    publications[msg.sender][url] = false;
    return true;
  }

  function verify(address publisherAddress, string memory url) public view returns (bool) {
    return publications[publisherAddress][url];
  }

  function hi() public pure returns (string memory) {
    return 'Hi!';
  }
}