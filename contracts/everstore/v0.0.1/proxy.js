pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x312277E46E8aafA607562cBCEe320CfA4b52373d = 0.59

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

----------------------------------------------------

BLOQVERSE INTERFACE REQUIRED FOR WALLET INTEGRATION 

*/

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

contract AddressDB is Upgradable
{
    function _create(bytes32 version, bytes32 key, address value, address addressNull) public;
    function _read(bytes32 version, bytes32 key, address addressNull) public view returns(address);
    function _update(bytes32 version, bytes32 key, address value, address addressNull) public;
    function _destroy(bytes32 version, bytes32 key, address addressNull) public;
    function _Create(bytes32 version, uint256 key, address value, address addressNull) public;
    function _Read(bytes32 version, uint256 key, address addressNull) public view returns(address);
    function _Update(bytes32 version, uint256 key, address value, address addressNull) public;
    function _Destroy(bytes32 version, uint256 key, address addressNull) public;
    function _push(bytes32 version, bytes32 key, address value, address addressNull) public;
    function _pull(bytes32 version, bytes32 key, uint index, address addressNull) public view returns(address);
    function _edit(bytes32 version, bytes32 key, uint index, address addressNull, address value) public;
    function _remove(bytes32 version, bytes32 key, uint index, address addressNull) public;
    function _Push(bytes32 version, uint256 key, address value, address addressNull) public;
    function _Pull(bytes32 version, uint256 key, uint index, address addressNull) public view returns(address);
    function _Edit(bytes32 version, uint256 key, uint index, address value, address addressNull) public;
    function _Remove(bytes32 version, uint256 key, uint index, address addressNull) public;
    function _set(bytes32 version, bytes32 key, address value, address addressNull) public;
    function _Set(bytes32 version, uint256 key, address value, address addressNull) public;
    function _Sets(bytes32 version, uint256 key, bytes32 index, address value, address addressNull) public;
    function _Reads(bytes32 version, uint256 key, bytes32 index, address addressNull) public view returns(address);
    function _Removes(bytes32 version, uint256 key, bytes32 index, address addressNull) public;
    function addressBytes32Count() public view returns(uint);
    function addressUint256Count() public view returns(uint);
    function addressBytes32ArrayCount() public view returns(uint);
    function addressUint256ArrayCount() public view returns(uint);
    function addressKeyCount() public view returns(uint);
}

contract AddressProxy is Upgradable
{
    // SETUP
    string AddressVersion;
    address AddressAddress;
    
    function updateAddressProxy(address databaseAddress) public onlyOwner
    {
        AddressAddress = databaseAddress;
    }
    
    function updateAddressVersion(string databaseName) public onlyOwner
    {
        AddressVersion = databaseName;
    }
    
    // Bytes32 Keys
    function create(string key, address value, address addressNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._create(uid, _key, value, addressNull);
    }
    
    function read(string key, address addressNull) public view returns(address)
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressVersion);
        return AddressDB(AddressAddress)._read(uid, _key, addressNull);
    }
    
    function update(string key, address value, address addressNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._update(uid, _key, value, addressNull);
    }
    
    function destroy(string key, address addressNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._destroy(uid, _key, addressNull);
    }
    
    // Uint256 Keys
    function Create(uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Create(uid, key, value, addressNull);
    }
    
    function Read(uint256 key, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        return AddressDB(AddressAddress)._Read(uid, key, addressNull);
    }
    
    function Update(uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Update(uid, key, value, addressNull);
    }
    
    function Destroy(uint256 key, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Destroy(uid, key, addressNull);
    }
    
    // Bytes32 Arrays
    function push(string key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _key = stringToBytes32(key);
        AddressDB(AddressAddress)._push(uid, _key, value, addressNull);
    }
    
    function pull(string key, uint index, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _key = stringToBytes32(key);
        return AddressDB(AddressAddress)._pull(uid, _key, index, addressNull);
    }
    
    function edit(string key, uint index, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _key = stringToBytes32(key);
        AddressDB(AddressAddress)._edit(uid, _key, index, value, addressNull);
    }
    
    function remove(string key, uint index, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _key = stringToBytes32(key);
        AddressDB(AddressAddress)._remove(uid, _key, index, addressNull);
    }
    
    // Uint256 Arrays
    function Push(uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Push(uid, key, value, addressNull);
    }
    
    function Pull(uint256 key, uint index, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        return AddressDB(AddressAddress)._Pull(uid, key, index, addressNull);
    }
    
    function Edit(uint256 key, uint index, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Edit(uid, key, index, value, addressNull);
    }
    
    function Remove(uint256 key, uint index, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Remove(uid, key, index, addressNull);
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _key = stringToBytes32(key);
        AddressDB(AddressAddress)._set(uid, _key, value, addressNull);
    }
    
    function Set(uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        AddressDB(AddressAddress)._Set(uid, key, value, addressNull);
    }
    
    function Sets(uint256 key, string index, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _index = stringToBytes32(index);
        AddressDB(AddressAddress)._Sets(uid, key, _index, value, addressNull);
    }
    
    function Reads(uint256 key, string index, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _index = stringToBytes32(index);
        return AddressDB(AddressAddress)._Reads(uid, key, _index, addressNull);
    }
    
    function Removes(uint256 key, string index, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressVersion);
        bytes32 _index = stringToBytes32(index);
        AddressDB(AddressAddress)._Removes(uid, key, _index, addressNull);
    }
}

/*
contract BoolProxy is Upgradable
{
    // SETUP
    BoolProxy BoolDB;
    string public Version;
    
    function BoolProxy(address databaseAddress, string databaseName) public
    {
        BoolDB = BoolProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        BoolDB = BoolProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
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
    // SETUP
    StringProxy StringDB;
    string public Version;
    
    function StringProxy(address databaseAddress, string databaseName) public
    {
        StringDB = StringProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        StringDB = StringProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
    // Bytes32 Keys
    function create(string key, bytes32 value, string stringNull) public;
    function read(string key, string stringNull) public returns(bytes32);
    function update(string key, bytes32 value, string stringNull) public;
    function destroy(string key, string stringNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, bytes32 value, string stringNull) public;
    function Read(uint256 key, string stringNull) public returns(bytes32);
    function Update(uint256 key, bytes32 value, string stringNull) public;
    function Destroy(uint256 key, string stringNull) public;
    
    // Bytes32 Arrays
    function push(string key, bytes32 value, string stringNull) public;
    function pull(string key, uint index, string stringNull) public returns(bytes32);
    function edit(string key, uint index, bytes32 value, string stringNull) public;
    function remove(string key, uint index, string stringNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, bytes32 value, string stringNull) public;
    function Pull(uint256 key, uint index, string stringNull) public returns(bytes32);
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
    function Removes(uint256 key, string index, string stringNull) public;
}

contract UintProxy is Upgradable
{
    // SETUP
    UintProxy UintDB;
    string public Version;
    
    function UintProxy(address databaseAddress, string databaseName) public
    {
        UintDB = UintProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        UintDB = UintProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
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

// Addressed Keys & Values
contract AddressesProxy is Upgradable
{
    // SETUP
    AddressesProxy AddressesDB;
    string public Version;
    
    function AddressesProxy(address databaseAddress, string databaseName) public
    {
        AddressesDB = AddressesProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        AddressesDB = AddressesProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
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
    // SETUP
    BoolsProxy BoolsDB;
    string public Version;
    
    function BoolsProxy(address databaseAddress, string databaseName) public
    {
        BoolsDB = BoolsProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        BoolsDB = BoolsProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
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
    // SETUP
    StringsProxy StringsDB;
    string public Version;
    
    function StringsProxy(address databaseAddress, string databaseName) public
    {
        StringsDB = StringsProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        StringsDB = StringsProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
    // Bytes32 Keys
    function create(address addressIndex, string key, bytes32 value, string stringNull) public;
    function read(address addressIndex, string key, string stringNull) public returns(bytes32);
    function update(address addressIndex, string key, bytes32 value, string stringNull) public;
    function destroy(address addressIndex, string key, string stringNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Read(address addressIndex, uint256 key, string stringNull) public returns(bytes32);
    function Update(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Destroy(address addressIndex, uint256 key, string stringNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, bytes32 value, string stringNull) public;
    function pull(address addressIndex, string key, uint index, string stringNull) public returns(bytes32);
    function edit(address addressIndex, string key, uint index, bytes32 value, string stringNull) public;
    function remove(address addressIndex, string key, uint index, string stringNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Pull(address addressIndex, uint256 key, uint index, string stringNull) public returns(bytes32);
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
    // SETUP
    UintsProxy UintsDB;
    string public Version;
    
    function UintsProxy(address databaseAddress, string databaseName) public
    {
        UintsDB = UintsProxy(databaseAddress);
        Version = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        UintsDB = UintsProxy(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        Version = databaseName;
    }
    
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

contract DeployProxies is AddressProxy
{   
    // AddressProxy _address;
    
    /*
    BoolProxy Bool;
    StringProxy _String;
    UintProxy Uint;
    AddressesProxy Addresses;
    BoolsProxy Bools;
    StringsProxy Strings;
    UintsProxy Uints;
    
    */
    
    function DeployProxies(address databaseAddress, string databaseName) public 
    {
        AddressAddress = databaseAddress;
        AddressVersion = databaseName;
        
        /*
        Bool = BoolProxy(databaseAddress);
        Bool.updateProxy(databaseAddress);
        Bool.updateVersion(databaseName);
        
        _String = StringProxy(databaseAddress);
        _String.updateProxy(databaseAddress);
        _String.updateVersion(databaseName);
        
        Uint = UintProxy(databaseAddress);
        Uint.updateProxy(databaseAddress);
        Uint.updateVersion(databaseName);
        
        Addresses = AddressesProxy(databaseAddress);
        Addresses.updateProxy(databaseAddress);
        Addresses.updateVersion(databaseName);
        
        Bools = BoolsProxy(databaseAddress);
        Bools.updateProxy(databaseAddress);
        Bools.updateVersion(databaseName);
        
        Strings = StringsProxy(databaseAddress);
        Strings.updateProxy(databaseAddress);
        Strings.updateVersion(databaseName);
        
        Uints = UintsProxy(databaseAddress);
        Uints.updateProxy(databaseAddress);
        Uints.updateVersion(databaseName);
        */
    }
    
    function updateDatabaseAddress(address databaseAddress) public onlyOwner
    {
        AddressAddress = databaseAddress;
        
        /*
        Bool.updateProxy(databaseAddress);
        _String.updateProxy(databaseAddress);
        Uint.updateProxy(databaseAddress);
        Addresses.updateProxy(databaseAddress);
        Bools.updateProxy(databaseAddress);
        Strings.updateProxy(databaseAddress);
        Uints.updateProxy(databaseAddress);
        */
    }
    
    function updateDatabaseName(string databaseName) public onlyOwner
    {
        AddressVersion = databaseName;
        
        /*
        Bool.updateVersion(databaseName);
        _String.updateVersion(databaseName);
        Uint.updateVersion(databaseName);
        Addresses.updateVersion(databaseName);
        Bools.updateVersion(databaseName);
        Strings.updateVersion(databaseName);
        Uints.updateVersion(databaseName);
        */
    }
}