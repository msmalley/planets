pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.2 = 0xDC6BCC77dba5a5f4cbD66A715f173ae8de1DEa42 = 0.53

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

Instructions:

Step 1 -    Initiate Bloqverse()
Step 2 -    Initiate Proxy() -- linking to Bloqverse Contract Address
Step 3 -    Initiate PlanetTokens() -- linking to Proxy Contract Address
Step 4 -    Initiate PlanetMeta() - linking to Proxy AND PlanetTokens Contract Addresses

Step 5 -    Enable external minting:
            Call ActivateMeta() within PlanetTokens() contract linking to PlanetMeta contract address
            
Step 6 -    Only way to issue tokens / planets ...
            Call the Genesis() function in PlanetMeta contract

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

contract Bloqverse is Upgradable
{   
    // Set Contract Data
    function _setAddress(bytes32 version, bytes32 key, address value) public;
    function _setBool(bytes32 version, bytes32 key, bool value) public;
    function _setString(bytes32 version, bytes32 key, bytes32 value) public;
    function _setUint(bytes32 version, bytes32 key, uint256 value) public;
    // Set Addressed Data
    function _setsAddress(bytes32 version, address addressKey, bytes32 param, address value) public;
    function _setsBool(bytes32 version, address addressKey, bytes32 param, bool value) public;
    function _setsString(bytes32 version, address addressKey, bytes32 param, bytes32 value) public;
    function _setsUint(bytes32 version, address addressKey, bytes32 param, uint256 value) public;
    // Set Token Data
    function _SetAddress(bytes32 version, uint256 key, bytes32 param, address value) public;
    function _SetBool(bytes32 version, uint256 key, bytes32 param, bool value) public;
    function _SetString(bytes32 version, uint256 key, bytes32 param, bytes32 value) public;
    function _SetUint(bytes32 version, uint256 key, bytes32 param, uint256 value) public;
    // Get Contract Data
    function _getAddress(bytes32 version, bytes32 key) public view returns(address);
    function _getBool(bytes32 version, bytes32 key) public view returns(bool);
    function _getString(bytes32 version, bytes32 key) public view returns(bytes32);
    function _getUint(bytes32 version, bytes32 key) public view returns(uint256);
    // Get Addressed Data
    function _getsAddress(bytes32 version, address addressKey, bytes32 param) public view returns(address);
    function _getsBool(bytes32 version, address addressKey, bytes32 param) public view returns(bool);
    function _getsString(bytes32 version, address addressKey, bytes32 param) public view returns(bytes32);
    function _getsUint(bytes32 version, address addressKey, bytes32 param) public view returns(uint256);
    // Get Token Data
    function _GetAddress(bytes32 version, uint256 key, bytes32 param) public view returns(address);
    function _GetBool(bytes32 version, uint256 key, bytes32 param) public view returns(bool);
    function _GetString(bytes32 version, uint256 key, bytes32 param) public view returns(bytes32);
    function _GetUint(bytes32 version, uint256 key, bytes32 param) public view returns(uint256);
    // Get Contract Data Counts
    function _contractAddressCount(bytes32 version) public view returns(uint);
    function _contractBoolCount(bytes32 version) public view returns(uint);
    function _contractStringCount(bytes32 version) public view returns(uint);
    function _contractUintCount(bytes32 version) public view returns(uint);
    // Get Addressed Data Counts
    function _addressAddressCount(bytes32 version, address addressKey) public view returns(uint);
    function _addressBoolCount(bytes32 version, address addressKey) public view returns(uint);
    function _addressStringCount(bytes32 version, address addressKey) public view returns(uint);
    function _addressUintCount(bytes32 version, address addressKey) public view returns(uint);
    // Get Token Data Counts
    function _tokenAddressCount(bytes32 version, uint256 key) public view returns(uint);
    function _tokenBoolCount(bytes32 version, uint256 key) public view returns(uint);
    function _tokenStringCount(bytes32 version, uint256 key) public view returns(uint);
    function _tokenUintCount(bytes32 version, uint256 key) public view returns(uint);
}

contract Proxy is Upgradable
{
    Bloqverse bloq;
    bytes32 dbVersion;
    
    function Proxy(address bloqverseAddress, string databaseVersion) public onlyOwner
    {
        dbVersion = stringToBytes32(databaseVersion);
        bloq = Bloqverse(bloqverseAddress);
    }
    
    // Set Contract Data
    function setAddress(string key, address value) public
    {
        bytes32 _key = stringToBytes32(key);
        bloq._setAddress(dbVersion, _key, value);
    }
    function setBool(string key, bool value) public
    {
        bytes32 _key = stringToBytes32(key);
        bloq._setBool(dbVersion, _key, value);
    }
    function setString(string key, bytes32 value) public
    {
        bytes32 _key = stringToBytes32(key);
        bloq._setString(dbVersion, _key, value);
    }
    function setUint(string key, uint256 value) public
    {
        bytes32 _key = stringToBytes32(key);
        bloq._setUint(dbVersion, _key, value);
    }
    
    // Set Addressed Data
    function setsAddress(address addressKey, string param, address value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._setsAddress(dbVersion, addressKey, _param, value);
    }
    function setsBool(address addressKey, string param, bool value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._setsBool(dbVersion, addressKey, _param, value);
    }
    function setsString(address addressKey, string param, bytes32 value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._setsString(dbVersion, addressKey, _param, value);
    }
    function setsUint(address addressKey, string param, uint256 value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._setsUint(dbVersion, addressKey, _param, value);
    }
    
    // Set Token Data
    function SetAddress(uint256 key, string param, address value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._SetAddress(dbVersion, key, _param, value);
    }
    function SetBool(uint256 key, string param, bool value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._SetBool(dbVersion, key, _param, value);
    }
    function SetString(uint256 key, string param, bytes32 value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._SetString(dbVersion, key, _param, value);
    }
    function SetUint(uint256 key, string param, uint256 value) public
    {
        bytes32 _param = stringToBytes32(param);
        bloq._SetUint(dbVersion, key, _param, value);
    }
    
    // Get Contract Data
    function getAddress(string key) public view returns(address)
    {
        bytes32 _key = stringToBytes32(key);
        return bloq._getAddress(dbVersion, _key);
    }
    function getBool(string key) public view returns(bool)
    {
        bytes32 _key = stringToBytes32(key);
        return bloq._getBool(dbVersion, _key);
    }
    function getString(string key) public view returns(bytes32)
    {
        bytes32 _key = stringToBytes32(key);
        return bloq._getString(dbVersion, _key);
    }
    function getUint(string key) public view returns(uint256)
    {
        bytes32 _key = stringToBytes32(key);
        return bloq._getUint(dbVersion, _key);
    }
    
    // Get Addressed Data
    function getsAddress(address addressKey, string param) public view returns(address)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._getsAddress(dbVersion, addressKey, _param);
    }
    function getsBool(address addressKey, string param) public view returns(bool)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._getsBool(dbVersion, addressKey, _param);
    }
    function getsString(address addressKey, string param) public view returns(bytes32)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._getsString(dbVersion, addressKey, _param);
    }
    function getsUint(address addressKey, string param) public view returns(uint256)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._getsUint(dbVersion, addressKey, _param);
    }
    
    // Get Token Data
    function GetAddress(uint256 key, string param) public view returns(address)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._GetAddress(dbVersion, key, _param);
    }
    function GetBool(uint256 key, string param) public view returns(bool)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._GetBool(dbVersion, key, _param);
    }
    function GetString(uint256 key, string param) public view returns(bytes32)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._GetString(dbVersion, key, _param);
    }
    function GetUint(uint256 key, string param) public view returns(uint256)
    {
        bytes32 _param = stringToBytes32(param);
        return bloq._GetUint(dbVersion, key, _param);
    }
    
    // Get Contract Data Counts
    function contractAddressCount() public view returns(uint)
    {
        return bloq._contractAddressCount(dbVersion);
    }
    function contractBoolCount() public view returns(uint)
    {
        return bloq._contractBoolCount(dbVersion);
    }
    function contractStringCount() public view returns(uint)
    {
        return bloq._contractStringCount(dbVersion);
    }
    function contractUintCount() public view returns(uint)
    {
        return bloq._contractUintCount(dbVersion);
    }
    
    // Get Addressed Data Counts
    function addressAddressCount(address addressKey) public view returns(uint)
    {
        return bloq._addressAddressCount(dbVersion, addressKey);
    }
    function addressBoolCount(address addressKey) public view returns(uint)
    {
        return bloq._addressBoolCount(dbVersion, addressKey);
    }
    function addressStringCount(address addressKey) public view returns(uint)
    {
        return bloq._addressStringCount(dbVersion, addressKey);
    }
    function addressUintCount(address addressKey) public view returns(uint)
    {
        return bloq._addressUintCount(dbVersion, addressKey);
    }
    
    // Get Token Data Counts
    function tokenAddressCount(uint256 key) public view returns(uint)
    {
        return bloq._tokenAddressCount(dbVersion, key);
    }
    function tokenBoolCount(uint256 key) public view returns(uint)
    {
        return bloq._tokenAddressCount(dbVersion, key);
    }
    function tokenStringCount(uint256 key) public view returns(uint)
    {
        return bloq._tokenAddressCount(dbVersion, key);
    }
    function tokenUintCount(uint256 key) public view returns(uint)
    {
        return bloq._tokenAddressCount(dbVersion, key);
    }
}