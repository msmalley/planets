pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Contract = 0xfed8C83fC74E5FC12e77e640F3786Da6Ac3c12F2

contract Ownable 
{
  address public owner;
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}

contract utils
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
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
    
    function uintToString(uint i) internal pure returns (string) {
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0){
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (i != 0){
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
    
    function char(byte b) internal pure returns (byte c) {
        if (b < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }
    
    function toString(address x) public pure returns (string) 
    {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }
    
    function ts() internal view returns(string)
    {
        return bytes32ToString(stringToBytes32(uintToString(now)));
    }
}

/* 

INTERFACE REQUIRED FOR WALLET INTEGRATION 

*/
contract KeyValueStorage 
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

contract Proxy is Ownable, utils 
{

    KeyValueStorage db;
    string public nameSpace;
    
    mapping(string => uint) stringLookups;
    uint stringLookupCount;
    
    function Proxy(address databaseAddress, string databaseName) public
    {
        db = KeyValueStorage(databaseAddress);
        nameSpace = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        db = KeyValueStorage(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        nameSpace = databaseName;
    }
    
    function stringToLookup(string key) public returns(string)
    {
        if(stringLookups[key] > 0)
        {
            return combine('X', uintToString(stringLookups[key]), '', '', '');
        }
        else
        {
            stringLookupCount++;
            stringLookups[key] = stringLookupCount;
            return combine('X', uintToString(stringLookups[key]), '', '', '');
        }
    }
    
    function GetAddress(string key) public returns(address) 
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        return db.getAddress(_key);
    }
    
    function GetBool(string key) public returns(bool) 
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        return db.getBool(_key);
    }
    
    function GetString(string key) public returns(bytes32) 
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        return db.getString(_key);
    }
    
    function GetRealString(string key) public returns(string) 
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        string memory value = bytes32ToString(db.getString(_key));
        return value;
    }
    
    function GetUint(string key) public returns(uint) 
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        return db.getUint(_key);
    }
    
    function GetAddressCount() public view returns(uint) 
    {
        return db.getAddressCount();
    }
    
    function GetBoolCount() public view returns(uint) 
    {
        return db.getBoolCount();
    }
    
    function GetStringCount() public view returns(uint) 
    {
        return db.getStringCount();
    }
    
    function GetUintCount() public view returns(uint) 
    {
        return db.getUintCount();
    }
    
    function SetAddress(string key, address value) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.setAddress(_key, value);
    }
    
    function SetBool(string key, bool value) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.setBool(_key, value);
    }
    
    function SetString(string key, bytes32 value) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.setString(_key, value);
    }
    
    function SetUint(string key, uint value) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.setUint(_key, value);
    }
    
    function DeleteAddress(string key) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.deleteAddress(_key);
    }
    
    function DeleteBool(string key) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.deleteBool(_key);
    }
    
    function DeleteString(string key) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.deleteString(_key);
    }
    
    function DeleteUint(string key) public
    {
        bytes32 _key = stringToBytes32(combine(nameSpace, stringToLookup(key), '', '', ''));
        db.deleteUint(_key);
    }
}