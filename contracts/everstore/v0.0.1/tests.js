pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// V1.1 - Private = 0xa22F7c65CbB28c0c499F1287257d178b67989E52 = 0.26

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

/*
contract BoolProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, bool value, bool boolNull) public;
    function read(string key, bool boolNull) public returns(bool);
    function update(string key, bool value, bool boolNull) public;
    function destroy(string key, bool boolNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, bool value, bool boolNull) public;
    function Read(uint256 key, bool boolNull) public returns(bool);
    function Update(uint256 key, bool value, bool boolNull) public;
    function Destroy(uint256 key, bool boolNull) public;
    
    // Bytes32 Arrays
    function push(string key, bool value, bool boolNull) public;
    function pull(string key, uint index, bool boolNull) public returns(bool);
    function edit(string key, uint index, bool value, bool boolNull) public;
    function remove(string key, uint index, bool boolNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, bool value, bool boolNull) public;
    function Pull(uint256 key, uint index, bool boolNull) public returns(bool);
    function Edit(uint256 key, uint index, bool value, bool boolNull) public;
    function Remove(uint256 key, uint index, bool boolNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, bool value, bool boolNull) public;
    function Set(uint256 key, bool value, bool boolNull) public;
    function Sets(uint256 key, string index, bool value, bool boolNull) public;
    function Reads(uint256 key, string index, bool boolNull) public returns(bool);
    function Removes(uint256 key, string index, bool boolNull) public;
}

contract StringProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, bytes32 value, string stringNull) public;
    function read(string key, string stringNull) public returns(bytes32);
    function _read(string key, string stringNull) public returns(string);
    function update(string key, bytes32 value, string stringNull) public;
    function destroy(string key, string stringNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, bytes32 value, string stringNull) public;
    function Read(uint256 key, string stringNull) public returns(bytes32);
    function _Read(uint256 key, string stringNull) public returns(string);
    function Update(uint256 key, bytes32 value, string stringNull) public;
    function Destroy(uint256 key, string stringNull) public;
    
    // Bytes32 Arrays
    function push(string key, bytes32 value, string stringNull) public;
    function pull(string key, uint index, string stringNull) public returns(bytes32);
    function _pull(string key, uint index, string stringNull) public returns(string);
    function edit(string key, uint index, bytes32 value, string stringNull) public;
    function remove(string key, uint index, string stringNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, bytes32 value, string stringNull) public;
    function Pull(uint256 key, uint index, string stringNull) public returns(bytes32);
    function _Pull(uint256 key, uint index, string stringNull) public returns(string);
    function Edit(uint256 key, uint index, bytes32 value, string stringNull) public;
    function Remove(uint256 key, uint index, string stringNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, bytes32 value, string stringNull) public;
    function Set(uint256 key, bytes32 value, string stringNull) public;
    function Sets(uint256 key, string index, bytes32 value, string stringNull) public;
    function Reads(uint256 key, string index, string stringNull) public returns(bytes32);
    function _Reads(uint256 key, string index, string stringNull) public returns(string);
    function Removes(uint256 key, string index, string stringNull) public;
}

contract UintProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, uint value, uint uintNull) public;
    function read(string key, uint uintNull) public returns(uint);
    function update(string key, uint value, uint uintNull) public;
    function destroy(string key, uint uintNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, uint value, uint uintNull) public;
    function Read(uint256 key, uint uintNull) public returns(uint);
    function Update(uint256 key, uint value, uint uintNull) public;
    function Destroy(uint256 key, uint uintNull) public;
    
    // Bytes32 Arrays
    function push(string key, uint value, uint uintNull) public;
    function pull(string key, uint index, uint uintNull) public returns(uint);
    function edit(string key, uint index, uint value, uint uintNull) public;
    function remove(string key, uint index, uint uintNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, uint value, uint uintNull) public;
    function Pull(uint256 key, uint index, uint uintNull) public returns(uint);
    function Edit(uint256 key, uint index, uint value, uint uintNull) public;
    function Remove(uint256 key, uint index, uint uintNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, uint value, uint uintNull) public;
    function Set(uint256 key, uint value, uint uintNull) public;
    function Sets(uint256 key, string index, uint value, uint uintNull) public;
    function Reads(uint256 key, string index, uint uintNull) public returns(uint);
    function Removes(uint256 key, string index, uint uintNull) public;
}

contract AddressesProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, address value, address addressNull) public;
    function read(address addressIndex, string key, address addressNull) public returns(address);
    function update(address addressIndex, string key, address value, address addressNull) public;
    function destroy(address addressIndex, string key, address addressNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, address value, address addressNull) public;
    function Read(address addressIndex, uint256 key, address addressNull) public returns(address);
    function Update(address addressIndex, uint256 key, address value, address addressNull) public;
    function Destroy(address addressIndex, uint256 key, address addressNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, address value, address addressNull) public;
    function pull(address addressIndex, string key, uint index, address addressNull) public returns(address);
    function edit(address addressIndex, string key, uint index, address value, address addressNull) public;
    function remove(address addressIndex, string key, uint index, address addressNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, address value, address addressNull) public;
    function Pull(address addressIndex, uint256 key, uint index, address addressNull) public returns(address);
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
    function Reads(address addressIndex, uint256 key, string index, address addressNull) public returns(address);
    function Removes(address addressIndex, uint256 key, string index, address addressNull) public;
}

contract BoolsProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, bool value, bool boolNull) public;
    function read(address addressIndex, string key, bool boolNull) public returns(bool);
    function update(address addressIndex, string key, bool value, bool boolNull) public;
    function destroy(address addressIndex, string key, bool boolNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Read(address addressIndex, uint256 key, bool boolNull) public returns(bool);
    function Update(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Destroy(address addressIndex, uint256 key, bool boolNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, bool value, bool boolNull) public;
    function pull(address addressIndex, string key, uint index, bool boolNull) public returns(bool);
    function edit(address addressIndex, string key, uint index, bool value, bool boolNull) public;
    function remove(address addressIndex, string key, uint index, bool boolNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Pull(address addressIndex, uint256 key, uint index, bool boolNull) public returns(bool);
    function Edit(address addressIndex, uint256 key, uint index, bool value, bool boolNull) public;
    function Remove(address addressIndex, uint256 key, uint index, bool boolNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, bool value, bool boolNull) public;
    function Set(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Sets(address addressIndex, uint256 key, string index, bool value, bool boolNull) public;
    function Reads(address addressIndex, uint256 key, string index, bool boolNull) public returns(bool);
    function Removes(address addressIndex, uint256 key, string index, bool boolNull) public;
}

contract StringsProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, bytes32 value, string stringNull) public;
    function read(address addressIndex, string key, string stringNull) public returns(bytes32);
    function _read(address addressIndex, string key, string stringNull) public returns(string);
    function update(address addressIndex, string key, bytes32 value, string stringNull) public;
    function destroy(address addressIndex, string key, string stringNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Read(address addressIndex, uint256 key, string stringNull) public returns(bytes32);
    function _Read(address addressIndex, uint256 key, string stringNull) public returns(string);
    function Update(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Destroy(address addressIndex, uint256 key, string stringNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, bytes32 value, string stringNull) public;
    function pull(address addressIndex, string key, uint index, string stringNull) public returns(bytes32);
    function _pull(address addressIndex, string key, uint index, string stringNull) public returns(string);
    function edit(address addressIndex, string key, uint index, bytes32 value, string stringNull) public;
    function remove(address addressIndex, string key, uint index, string stringNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Pull(address addressIndex, uint256 key, uint index, string stringNull) public returns(bytes32);
    function _Pull(address addressIndex, uint256 key, uint index, string stringNull) public returns(string);
    function Edit(address addressIndex, uint256 key, uint index, bytes32 value, string stringNull) public;
    function Remove(address addressIndex, uint256 key, uint index, string stringNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, bytes32 value, string stringNull) public;
    function Set(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Sets(address addressIndex, uint256 key, string index, bytes32 value, string stringNull) public;
    function Reads(address addressIndex, uint256 key, string index, string stringNull) public returns(bytes32);
    function _Reads(address addressIndex, uint256 key, string index, string stringNull) public returns(string);
    function Removes(address addressIndex, uint256 key, string index, string stringNull) public;
}

contract UintsProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, uint value, uint uintNull) public;
    function read(address addressIndex, string key, uint uintNull) public returns(uint);
    function update(address addressIndex, string key, uint value, uint uintNull) public;
    function destroy(address addressIndex, string key, uint uintNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Read(address addressIndex, uint256 key, uint uintNull) public returns(uint);
    function Update(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Destroy(address addressIndex, uint256 key, uint uintNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, uint value, uint uintNull) public;
    function pull(address addressIndex, string key, uint index, uint uintNull) public returns(uint);
    function edit(address addressIndex, string key, uint index, uint value, uint uintNull) public;
    function remove(address addressIndex, string key, uint index, uint uintNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Pull(address addressIndex, uint256 key, uint index, uint uintNull) public returns(uint);
    function Edit(address addressIndex, uint256 key, uint index, uint value, uint uintNull) public;
    function Remove(address addressIndex, uint256 key, uint index, uint uintNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, uint value, uint uintNull) public;
    function Set(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Sets(address addressIndex, uint256 key, string index, uint value, uint uintNull) public;
    function Reads(address addressIndex, uint256 key, string index, uint uintNull) public returns(uint);
    function Removes(address addressIndex, uint256 key, string index, uint uintNull) public;
}

*/

contract tests is Upgradable
{
    // PROXY SETUP
    //address AddressAddress;
    AddressProxy Address;
    
    /*
    BoolProxy Bool;
    StringProxy _String;
    UintProxy Uint;
    AddressesProxy Addresses;
    BoolsProxy Bools;
    StringsProxy Strings;
    UintsProxy Uints;
    */
    
    function tests(address proxyAddress) public 
    {
        // Setup Proxies
        //AddressAddress = proxyAddress;
        Address = AddressProxy(proxyAddress);
        
        /*
        Bool = BoolProxy(proxyAddress);
        _String = StringProxy(proxyAddress);
        Uint = UintProxy(proxyAddress);
        Addresses = AddressesProxy(proxyAddress);
        Bools = BoolsProxy(proxyAddress);
        Strings = StringsProxy(proxyAddress);
        Uints = UintsProxy(proxyAddress);
        
        string memory sNull; uint uNull; address aNull;
        */
    }
    
    function updateProxy(address proxyAddress) public onlyOwner
    {
        //AddressAddress = proxyAddress;
        Address = AddressProxy(proxyAddress);
        
        /*
        Bool = BoolProxy(proxyAddress);
        _String = StringProxy(proxyAddress);
        Uint = UintProxy(proxyAddress);
        Addresses = AddressesProxy(proxyAddress);
        Bools = BoolsProxy(proxyAddress);
        Strings = StringsProxy(proxyAddress);
        Uints = UintsProxy(proxyAddress);
        */
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
}