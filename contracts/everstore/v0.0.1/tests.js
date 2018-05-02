pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 - Addresses Only = 0x71A346577fED04057BD81d95de66Bb32919B9663 = 0.42

// MS Personal = 0x7d0C58E478479c8f6f5A96C2424d6AE4F82980e0

contract AbleToUtilizeStrings
{
    function bytes32ToString(bytes32 x) internal pure returns (string) 
    {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) 
        {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) 
            {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) 
        {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
    
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) 
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) 
        {
            return 0x0;
        }
        assembly 
        {
            result := mload(add(source, 32))
        }
    }
    
    function uintToString(uint i) internal pure returns (string) 
    {
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0)
        {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (i != 0)
        {
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        return string(bstr);
    }
    
    function combine(string _a, string _b, string _c, string _d, string _e) internal pure returns (string)
    {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }
    
    function char(byte b) internal pure returns (byte c) 
    {
        if (b < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }
    
    function toString(address x) public pure returns (string) 
    {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) 
        {
            byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }
}

library UsingSafeMaths
{
    function add(uint a, uint b) internal pure returns (uint c) 
    {
        c = a + b;
        require(c >= a);
    }

    function sub(uint a, uint b) internal pure returns (uint c) 
    {
        require(b <= a);
        c = a - b;
    }

    function mul(uint a, uint b) internal pure returns (uint c) 
    {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function div(uint a, uint b) internal pure returns (uint c) 
    {
        require(b > 0);
        c = a / b;
    }
}

contract Upgradable is AbleToUtilizeStrings
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

contract AddressProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, address value, address addressNull) public;
    function read(string key, address addressNull) public view returns(address);
    function update(string key, address addressNull, address value) public;
    function destroy(string key, address addressNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, address value, address addressNull) public;
    function Read(uint256 key, address addressNull) public view returns(address);
    function Update(uint256 key, address value, address addressNull) public;
    function Destroy(uint256 key, address addressNull) public;
    
    // Bytes32 Arrays
    function push(string key, address value, address addressNull) public;
    function pull(string key, uint index, address addressNull) public view returns(address);
    function edit(string key, uint index, address addressNull, address value) public;
    function remove(string key, uint index, address addressNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, address value, address addressNull) public;
    function Pull(uint256 key, uint index, address addressNull) public view returns(address);
    function Edit(uint256 key, uint index, address value, address addressNull) public;
    function Remove(uint256 key, uint index, address addressNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, address value, address addressNull) public;
    function Set(uint256 key, address value, address addressNull) public;
    function Sets(uint256 key, string index, address value, address addressNull) public;
    function Reads(uint256 key, string index, address addressNull) public view returns(address);
    function Removes(uint256 key, string index, address addressNull) public;
}

contract AddressesProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, address value, address addressNull) public;
    function read(address addressIndex, string key, address addressNull) public view returns(address);
    function update(address addressIndex, string key, address value, address addressNull) public;
    function destroy(address addressIndex, string key, address addressNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, address value, address addressNull) public;
    function Read(address addressIndex, uint256 key, address addressNull) public view returns(address);
    function Update(address addressIndex, uint256 key, address value, address addressNull) public;
    function Destroy(address addressIndex, uint256 key, address addressNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, address value, address addressNull) public;
    function pull(address addressIndex, string key, uint index, address addressNull) public view returns(address);
    function edit(address addressIndex, string key, uint index, address value, address addressNull) public;
    function remove(address addressIndex, string key, uint index, address addressNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, address value, address addressNull) public;
    function Pull(address addressIndex, uint256 key, uint index, address addressNull) public view returns(address);
    function Edit(address addressIndex, uint256 key, uint index, address value, address addressNull) public;
    function Remove(address addressIndex, uint256 key, uint index, address addressNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, address value, address addressNull) public;
    function Set(address addressIndex, uint256 key, address value, address addressNull) public;
    function Sets(address addressIndex, uint256 key, string index, address value, address addressNull) public;
    function Reads(address addressIndex, uint256 key, string index, address addressNull) public view returns(address);
    function Removes(address addressIndex, uint256 key, string index, address addressNull) public;
}

contract tests is Upgradable
{
    AddressProxy Address;
    AddressesProxy Addresses;
 
    function tests(address proxyForAddress, address proxyForAddresses) public 
    {
        Address = AddressProxy(proxyForAddress);
        Addresses = AddressesProxy(proxyForAddresses);
    }
    
    function updateProxy(address proxyForAddress, address proxyForAddresses) public onlyOwner
    {
        Address = AddressProxy(proxyForAddress);
        Addresses = AddressesProxy(proxyForAddresses);
    }
    
    /*
    
    SETS
    
    */
    function setAddress(string key, address value) public
    {
        address addressNull;
        Address.set(key, value, addressNull);
    }
    function SetAddress(uint256 key, address value) public
    {
        address addressNull;
        Address.Set(key, value, addressNull);
    }
    function SetsAddress(uint256 key, string index, address value) public
    {
        address addressNull;
        Address.Sets(key, index, value, addressNull);
    }
    function setAddressArray(string key, address value) public
    {
        address addressNull;
        Address.push(key, value, addressNull);
    }
    function SetAddressArray(uint256 key, address value) public
    {
        address addressNull;
        Address.Push(key, value, addressNull);
    }
    
    /*
    
    GETS
    
    */
    function getAddress(string key) public view returns(address)
    {
        address addressNull;
        return Address.read(key, addressNull);
    }
    function GetAddress(uint256 key) public view returns(address)
    {
        address addressNull;
        return Address.Read(key, addressNull);
    }
    function GetsAddress(uint256 key, string index) public view returns(address)
    {
        address addressNull;
        return Address.Reads(key, index, addressNull);
    }
    function getAddressArray(string key, uint index) public view returns(address)
    {
        address addressNull;
        return Address.pull(key, index, addressNull);
    }
    function GetAddressArray(uint256 key, uint index) public view returns(address)
    {
        address addressNull;
        return Address.Pull(key, index, addressNull);
    }
    
    /*
    
    ADDRESSED SETS
    
    */
    function setAddresses(address addressIndex, string key, address value) public
    {
        address addressNull;
        Addresses.set(addressIndex, key, value, addressNull);
    }
    function SetAddresses(address addressIndex, uint256 key, address value) public
    {
        address addressNull;
        Addresses.Set(addressIndex, key, value, addressNull);
    }
    function SetsAddresses(address addressIndex, uint256 key, string index, address value) public
    {
        address addressNull;
        Addresses.Sets(addressIndex, key, index, value, addressNull);
    }
    function setAddressesArray(address addressIndex, string key, address value) public
    {
        address addressNull;
        Addresses.push(addressIndex, key, value, addressNull);
    }
    function SetAddressesArray(address addressIndex, uint256 key, address value) public
    {
        address addressNull;
        Addresses.Push(addressIndex, key, value, addressNull);
    }
    
    /*
    
    ADDRESSED GETS
    
    */
    function getAddresses(address addressIndex, string key) public view returns(address)
    {
        address addressNull;
        return Addresses.read(addressIndex, key, addressNull);
    }
    function GetAddresses(address addressIndex, uint256 key) public view returns(address)
    {
        address addressNull;
        return Addresses.Read(addressIndex, key, addressNull);
    }
    function GetsAddresses(address addressIndex, uint256 key, string index) public view returns(address)
    {
        address addressNull;
        return Addresses.Reads(addressIndex, key, index, addressNull);
    }
    function getAddressesArray(address addressIndex, string key, uint index) public view returns(address)
    {
        address addressNull;
        return Addresses.pull(addressIndex, key, index, addressNull);
    }
    function GetAddressesArray(address addressIndex, uint256 key, uint index) public view returns(address)
    {
        address addressNull;
        return Addresses.Pull(addressIndex, key, index, addressNull);
    }
}