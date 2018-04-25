pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

----------------------------------------------------

BLOQVERSE INTERFACE REQUIRED FOR WALLET INTEGRATION 

*/
contract BloqVerse 
{
    function getAddress(bytes32 key) public view returns (address);
    function getBool(bytes32 key) public view returns (bool);
    function getString(bytes32 key) public view returns (bytes32);
    function getUint(bytes32 key) public view returns (uint);
    function getAddressCount() public view returns (uint);
    function getBoolCount() public view returns (uint);
    function getStringCount() public view returns (uint);
    function getUintCount() public view returns (uint);
    function setAddress(bytes32 key, address value) public;
    function setBool(bytes32 key, bool value) public;
    function setString(bytes32 key, bytes32 value) public;
    function setUint(bytes32 key, uint value) public;
    function deleteAddress(bytes32 key) public;
    function deleteBool(bytes32 key) public;
    function deleteString(bytes32 key) public;
    function deleteUint(bytes32 key) public;
}

contract Upgradable 
{
    address public owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    function Upgradable() public 
    {
        owner = msg.sender;
    }

    modifier onlyOwner() 
    {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public 
    {
        require(newOwner != address(0));
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract Extensible is Upgradable
{

    BloqVerse db;
    string public nameSpace;
    
    function Proxy(address databaseAddress, string databaseName) public
    {
        db = BloqVerse(databaseAddress);
        nameSpace = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        db = BloqVerse(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        nameSpace = databaseName;
    }
}