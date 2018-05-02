pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x2C45B120585Ae79322b12DFD6AF04b0B52E24780 = 0.6

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

contract BoolsDB is Upgradable
{
    function _create(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public;
    function _read(address addressIndex, bytes32 version, bytes32 key, bool boolNull) public view returns(bool);
    function _update(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, bool boolNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public;
    function _Read(address addressIndex, bytes32 version, uint256 key, bool boolNull) public view returns(bool);
    function _Update(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, bool boolNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public;
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, bool boolNull) public view returns(bool);
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, bool value, bool boolNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, bool boolNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public;
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, bool boolNull) public view returns(bool);
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, bool value, bool boolNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, bool boolNull) public;
    function _set(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool value, bool boolNull) public;
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool boolNull) public view returns(bool);
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool boolNull) public;
    function boolBytes32Counts(address addressIndex) public view returns(uint);
    function boolUint256Counts(address addressIndex) public view returns(uint);
    function boolBytes32ArrayCounts(address addressIndex) public view returns(uint);
    function boolUint256ArrayCounts(address addressIndex) public view returns(uint);
    function boolKeyCounts(address addressIndex) public view returns(uint);
}

contract BoolsProxy is Upgradable
{
    // SETUP
    string BoolsVersion;
    address BoolsAddress;
    
    function updateBoolsProxy(address databaseAddress) public onlyOwner
    {
        BoolsAddress = databaseAddress;
    }
    
    function updateBoolsVersion(string databaseName) public onlyOwner
    {
        BoolsVersion = databaseName;
    }
    
    // Bytes32 Keys
    function create(address addressIndex, string key, bool value, bool boolNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._create(addressIndex, uid, _key, value, boolNull);
    }
    
    function read(address addressIndex, string key, bool boolNull) public view returns(bool)
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(BoolsVersion);
        return BoolsDB(BoolsAddress)._read(addressIndex, uid, _key, boolNull);
    }
    
    function update(address addressIndex, string key, bool value, bool boolNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._update(addressIndex, uid, _key, value, boolNull);
    }
    
    function destroy(address addressIndex, string key, bool boolNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._destroy(addressIndex, uid, _key, boolNull);
    }
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Create(addressIndex, uid, key, value, boolNull);
    }
    
    function Read(address addressIndex, uint256 key, bool boolNull) public view returns(bool)
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        return BoolsDB(BoolsAddress)._Read(addressIndex, uid, key, boolNull);
    }
    
    function Update(address addressIndex, uint256 key, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Update(addressIndex, uid, key, value, boolNull);
    }
    
    function Destroy(address addressIndex, uint256 key, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Destroy(addressIndex, uid, key, boolNull);
    }
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _key = stringToBytes32(key);
        BoolsDB(BoolsAddress)._push(addressIndex, uid, _key, value, boolNull);
    }
    
    function pull(address addressIndex, string key, uint index, bool boolNull) public view returns(bool)
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _key = stringToBytes32(key);
        return BoolsDB(BoolsAddress)._pull(addressIndex, uid, _key, index, boolNull);
    }
    
    function edit(address addressIndex, string key, uint index, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _key = stringToBytes32(key);
        BoolsDB(BoolsAddress)._edit(addressIndex, uid, _key, index, value, boolNull);
    }
    
    function remove(address addressIndex, string key, uint index, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _key = stringToBytes32(key);
        BoolsDB(BoolsAddress)._remove(addressIndex, uid, _key, index, boolNull);
    }
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Push(addressIndex, uid, key, value, boolNull);
    }
    
    function Pull(address addressIndex, uint256 key, uint index, bool boolNull) public view returns(bool)
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        return BoolsDB(BoolsAddress)._Pull(addressIndex, uid, key, index, boolNull);
    }
    
    function Edit(address addressIndex, uint256 key, uint index, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Edit(addressIndex, uid, key, index, value, boolNull);
    }
    
    function Remove(address addressIndex, uint256 key, uint index, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Remove(addressIndex, uid, key, index, boolNull);
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _key = stringToBytes32(key);
        BoolsDB(BoolsAddress)._set(addressIndex, uid, _key, value, boolNull);
    }
    
    function Set(address addressIndex, uint256 key, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        BoolsDB(BoolsAddress)._Set(addressIndex, uid, key, value, boolNull);
    }
    
    function Sets(address addressIndex, uint256 key, string index, bool value, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _index = stringToBytes32(index);
        BoolsDB(BoolsAddress)._Sets(addressIndex, uid, key, _index, value, boolNull);
    }
    
    function Reads(address addressIndex, uint256 key, string index, bool boolNull) public view returns(bool)
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _index = stringToBytes32(index);
        return BoolsDB(BoolsAddress)._Reads(addressIndex, uid, key, _index, boolNull);
    }
    
    function Removes(address addressIndex, uint256 key, string index, bool boolNull) public
    {
        bytes32 uid = stringToBytes32(BoolsVersion);
        bytes32 _index = stringToBytes32(index);
        BoolsDB(BoolsAddress)._Removes(addressIndex, uid, key, _index, boolNull);
    }
}

contract DeployBools is BoolsProxy
{   
    function DeployBools(address databaseAddress, string databaseName) public 
    {
        BoolsAddress = databaseAddress;
        BoolsVersion = databaseName;
    }
    
    function updateDatabaseAddress(address databaseAddress) public onlyOwner
    {
        BoolsAddress = databaseAddress;
    }
    
    function updateDatabaseName(string databaseName) public onlyOwner
    {
        BoolsVersion = databaseName;
    }
}