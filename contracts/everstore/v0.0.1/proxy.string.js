pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0xfde2cC77bC1F9E2f4056cf84b0eAFb72c1654b81 = 0.74

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

contract StringDB is Upgradable
{
    function _create(bytes32 version, bytes32 key, bytes32 value, string stringNull) public;
    function _read(bytes32 version, bytes32 key, string stringNull) public view returns(bytes32);
    function _update(bytes32 version, bytes32 key, bytes32 value, string stringNull) public;
    function _destroy(bytes32 version, bytes32 key, string stringNull) public;
    function _Create(bytes32 version, uint256 key, bytes32 value, string stringNull) public;
    function _Read(bytes32 version, uint256 key, string stringNull) public view returns(bytes32);
    function _Update(bytes32 version, uint256 key, bytes32 value, string stringNull) public;
    function _Destroy(bytes32 version, uint256 key, string stringNull) public;
    function _push(bytes32 version, bytes32 key, bytes32 value, string stringNull) public;
    function _pull(bytes32 version, bytes32 key, uint index, string stringNull) public view returns(bytes32);
    function _edit(bytes32 version, bytes32 key, uint index, bytes32 value, string stringNull) public;
    function _remove(bytes32 version, bytes32 key, uint index, string stringNull) public;
    function _Push(bytes32 version, uint256 key, bytes32 value, string stringNull) public;
    function _Pull(bytes32 version, uint256 key, uint index, string stringNull) public view returns(bytes32);
    function _Edit(bytes32 version, uint256 key, uint index, bytes32 value, string stringNull) public;
    function _Remove(bytes32 version, uint256 key, uint index, string stringNull) public;
    function _set(bytes32 version, bytes32 key, bytes32 value, string stringNull) public;
    function _Set(bytes32 version, uint256 key, bytes32 value, string stringNull) public;
    function _Sets(bytes32 version, uint256 key, bytes32 index, bytes32 value, string stringNull) public;
    function _Reads(bytes32 version, uint256 key, bytes32 index, string stringNull) public view returns(bytes32);
    function _Removes(bytes32 version, uint256 key, bytes32 index, string stringNull) public;
    function uintBytes32Count() public view returns(uint);
    function uintUint256Count() public view returns(uint);
    function uintBytes32ArrayCount() public view returns(uint);
    function uintUint256ArrayCount() public view returns(uint);
    function uintKeyCount() public view returns(uint);
}

contract StringProxy is Upgradable
{
    // SETUP
    string StringVersion;
    address StringAddress;
    
    function updateStringProxy(address databaseAddress) public onlyOwner
    {
        StringAddress = databaseAddress;
    }
    
    function updateStringVersion(string databaseName) public onlyOwner
    {
        StringVersion = databaseName;
    }
    
    // Bytes32 Keys
    function create(string key, bytes32 value, string stringNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._create(uid, _key, value, stringNull);
    }
    
    function read(string key, string stringNull) public view returns(bytes32)
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(StringVersion);
        return StringDB(StringAddress)._read(uid, _key, stringNull);
    }
    
    function update(string key, bytes32 value, string stringNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._update(uid, _key, value, stringNull);
    }
    
    function destroy(string key, string stringNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._destroy(uid, _key, stringNull);
    }
    
    // Uint256 Keys
    function Create(uint256 key, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Create(uid, key, value, stringNull);
    }
    
    function Read(uint256 key, string stringNull) public view returns(bytes32)
    {
        bytes32 uid = stringToBytes32(StringVersion);
        return StringDB(StringAddress)._Read(uid, key, stringNull);
    }
    
    function Update(uint256 key, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Update(uid, key, value, stringNull);
    }
    
    function Destroy(uint256 key, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Destroy(uid, key, stringNull);
    }
    
    // Bytes32 Arrays
    function push(string key, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _key = stringToBytes32(key);
        StringDB(StringAddress)._push(uid, _key, value, stringNull);
    }
    
    function pull(string key, uint index, string stringNull) public view returns(bytes32)
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _key = stringToBytes32(key);
        return StringDB(StringAddress)._pull(uid, _key, index, stringNull);
    }
    
    function edit(string key, uint index, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _key = stringToBytes32(key);
        StringDB(StringAddress)._edit(uid, _key, index, value, stringNull);
    }
    
    function remove(string key, uint index, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _key = stringToBytes32(key);
        StringDB(StringAddress)._remove(uid, _key, index, stringNull);
    }
    
    // Uint256 Arrays
    function Push(uint256 key, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Push(uid, key, value, stringNull);
    }
    
    function Pull(uint256 key, uint index, string stringNull) public view returns(bytes32)
    {
        bytes32 uid = stringToBytes32(StringVersion);
        return StringDB(StringAddress)._Pull(uid, key, index, stringNull);
    }
    
    function Edit(uint256 key, uint index, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Edit(uid, key, index, value, stringNull);
    }
    
    function Remove(uint256 key, uint index, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Remove(uid, key, index, stringNull);
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _key = stringToBytes32(key);
        StringDB(StringAddress)._set(uid, _key, value, stringNull);
    }
    
    function Set(uint256 key, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        StringDB(StringAddress)._Set(uid, key, value, stringNull);
    }
    
    function Sets(uint256 key, string index, bytes32 value, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _index = stringToBytes32(index);
        StringDB(StringAddress)._Sets(uid, key, _index, value, stringNull);
    }
    
    function Reads(uint256 key, string index, string stringNull) public view returns(bytes32)
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _index = stringToBytes32(index);
        return StringDB(StringAddress)._Reads(uid, key, _index, stringNull);
    }
    
    function Removes(uint256 key, string index, string stringNull) public
    {
        bytes32 uid = stringToBytes32(StringVersion);
        bytes32 _index = stringToBytes32(index);
        StringDB(StringAddress)._Removes(uid, key, _index, stringNull);
    }
}

contract DeployString is StringProxy
{   
    function DeployString(address databaseAddress, string databaseName) public 
    {
        StringAddress = databaseAddress;
        StringVersion = databaseName;
    }
    
    function updateDatabaseAddress(address databaseAddress) public onlyOwner
    {
        StringAddress = databaseAddress;
    }
    
    function updateDatabaseName(string databaseName) public onlyOwner
    {
        StringVersion = databaseName;
    }
}