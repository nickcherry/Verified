pragma solidity ^0.5.0;

contract Registry {
  mapping (address => mapping (string => bool)) publications;

  function publish(string memory url) public returns (address) {
    publications[msg.sender][url] = true;
    return msg.sender;
  }

  function unpublish(string memory url) public returns (address) {
    publications[msg.sender][url] = false;
    return msg.sender;
  }

  function verify(address publisherAddress, string memory url) public view returns (bool) {
    return publications[publisherAddress][url];
  }
}