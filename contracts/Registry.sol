pragma solidity ^0.5.0;

contract Registry {
  event Registered(address creator, string url);

  function Register(string memory url) public returns (string memory) {
    emit Registered(msg.sender, url); 
    return url;
  }
}