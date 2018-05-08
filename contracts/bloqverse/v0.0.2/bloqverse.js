pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.2 = 0x41229fe265cF242d19ea36b530Fb5d2d04bB54aB = 0.31

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

library SafeMath 
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
    
    function toString(address x) internal pure returns (string) 
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
    using SafeMath for uint;
    
    // Base Contract Data
    mapping(address => mapping(bytes32 => mapping(bytes32 => address))) ContractAddresses;
    mapping(address => mapping(bytes32 => mapping(bytes32 => bool))) ContractBools;
    mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32))) ContractStrings;
    mapping(address => mapping(bytes32 => mapping(bytes32 => uint256))) ContractUints;
    
    // Contract Addressed Data
    mapping(address => mapping(bytes32 => mapping(address => mapping(bytes32 => address)))) AddressAddresses;
    mapping(address => mapping(bytes32 => mapping(address => mapping(bytes32 => bool)))) AddressBools;
    mapping(address => mapping(bytes32 => mapping(address => mapping(bytes32 => bytes32)))) AddressStrings;
    mapping(address => mapping(bytes32 => mapping(address => mapping(bytes32 => uint256)))) AddressUints;
    
    // Contract Token Data
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => address)))) TokenAddresses;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bool)))) TokenBools;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bytes32)))) TokenStrings;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => uint256)))) TokenUints;
    
    // Contract Count Variables 
    mapping(address => mapping(bytes32 => uint)) ContractAddressCount;
    mapping(address => mapping(bytes32 => uint)) ContractBoolCount;
    mapping(address => mapping(bytes32 => uint)) ContractStringCount;
    mapping(address => mapping(bytes32 => uint)) ContractUintCount;
    
    // Addressed Count Variables 
    mapping(address => mapping(bytes32 => mapping(address => uint))) AddressAddressCount;
    mapping(address => mapping(bytes32 => mapping(address => uint))) AddressBoolCount;
    mapping(address => mapping(bytes32 => mapping(address => uint))) AddressStringCount;
    mapping(address => mapping(bytes32 => mapping(address => uint))) AddressUintCount;
    
    // Token Count Variables 
    mapping(address => mapping(bytes32 => mapping(uint256 => uint))) TokenAddressCount;
    mapping(address => mapping(bytes32 => mapping(uint256 => uint))) TokenBoolCount;
    mapping(address => mapping(bytes32 => mapping(uint256 => uint))) TokenStringCount;
    mapping(address => mapping(bytes32 => mapping(uint256 => uint))) TokenUintCount;
    
    // Set Contract Data
    function _setAddress(bytes32 version, bytes32 key, address value) public
    {
        ContractAddresses[msg.sender][version][key] = value;
    }
    function _setBool(bytes32 version, bytes32 key, bool value) public
    {
        ContractBools[msg.sender][version][key] = value;
    }
    function _setString(bytes32 version, bytes32 key, bytes32 value) public
    {
        ContractStrings[msg.sender][version][key] = value;
    }
    function _setUint(bytes32 version, bytes32 key, uint256 value) public
    {
        ContractUints[msg.sender][version][key] = value;
    }
    
    // Set Addressed Data
    function _setsAddress(bytes32 version, address addressKey, bytes32 param, address value) public
    {
        AddressAddresses[msg.sender][version][addressKey][param] = value;
    }
    function _setsBool(bytes32 version, address addressKey, bytes32 param, bool value) public
    {
        AddressBools[msg.sender][version][addressKey][param] = value;
    }
    function _setsString(bytes32 version, address addressKey, bytes32 param, bytes32 value) public
    {
        AddressStrings[msg.sender][version][addressKey][param] = value;
    }
    function _setsUint(bytes32 version, address addressKey, bytes32 param, uint256 value) public
    {
        AddressUints[msg.sender][version][addressKey][param] = value;
    }
    
    // Set Token Data
    function _SetAddress(bytes32 version, uint256 key, bytes32 param, address value) public
    {
        TokenAddresses[msg.sender][version][key][param] = value;
    }
    function _SetBool(bytes32 version, uint256 key, bytes32 param, bool value) public
    {
        TokenBools[msg.sender][version][key][param] = value;
    }
    function _SetString(bytes32 version, uint256 key, bytes32 param, bytes32 value) public
    {
        TokenStrings[msg.sender][version][key][param] = value;
    }
    function _SetUint(bytes32 version, uint256 key, bytes32 param, uint256 value) public
    {
        TokenUints[msg.sender][version][key][param] = value;
    }
    
    // Get Contract Data
    function _getAddress(bytes32 version, bytes32 key) public view returns(address)
    {
        return ContractAddresses[msg.sender][version][key];
    }
    function _getBool(bytes32 version, bytes32 key) public view returns(bool)
    {
        return ContractBools[msg.sender][version][key];
    }
    function _getString(bytes32 version, bytes32 key) public view returns(bytes32)
    {
        return ContractStrings[msg.sender][version][key];
    }
    function _getUint(bytes32 version, bytes32 key) public view returns(uint256)
    {
        return ContractUints[msg.sender][version][key];
    }
    
    // Get Addressed Data
    function _getsAddress(bytes32 version, address addressKey, bytes32 param) public view returns(address)
    {
        return AddressAddresses[msg.sender][version][addressKey][param];
    }
    function _getsBool(bytes32 version, address addressKey, bytes32 param) public view returns(bool)
    {
        return AddressBools[msg.sender][version][addressKey][param];
    }
    function _getsString(bytes32 version, address addressKey, bytes32 param) public view returns(bytes32)
    {
        return AddressStrings[msg.sender][version][addressKey][param];
    }
    function _getsUint(bytes32 version, address addressKey, bytes32 param) public view returns(uint256)
    {
        return AddressUints[msg.sender][version][addressKey][param];
    }
    
    // Get Token Data
    function _GetAddress(bytes32 version, uint256 key, bytes32 param) public view returns(address)
    {
        return TokenAddresses[msg.sender][version][key][param];
    }
    function _GetBool(bytes32 version, uint256 key, bytes32 param) public view returns(bool)
    {
        return TokenBools[msg.sender][version][key][param];
    }
    function _GetString(bytes32 version, uint256 key, bytes32 param) public view returns(bytes32)
    {
        return TokenStrings[msg.sender][version][key][param];
    }
    function _GetUint(bytes32 version, uint256 key, bytes32 param) public view returns(uint256)
    {
        return TokenUints[msg.sender][version][key][param];
    }
    
    // Get Contract Data Counts
    function _contractAddressCount(bytes32 version) public view returns(uint)
    {
        return ContractAddressCount[msg.sender][version];
    }
    function _contractBoolCount(bytes32 version) public view returns(uint)
    {
        return ContractBoolCount[msg.sender][version];
    }
    function _contractStringCount(bytes32 version) public view returns(uint)
    {
        return ContractStringCount[msg.sender][version];
    }
    function _contractUintCount(bytes32 version) public view returns(uint)
    {
        return ContractUintCount[msg.sender][version];
    }
    
    // Get Addressed Data Counts
    function _addressAddressCount(bytes32 version, address addressKey) public view returns(uint)
    {
        return AddressAddressCount[msg.sender][version][addressKey];
    }
    function _addressBoolCount(bytes32 version, address addressKey) public view returns(uint)
    {
        return AddressBoolCount[msg.sender][version][addressKey];
    }
    function _addressStringCount(bytes32 version, address addressKey) public view returns(uint)
    {
        return AddressStringCount[msg.sender][version][addressKey];
    }
    function _addressUintCount(bytes32 version, address addressKey) public view returns(uint)
    {
        return AddressUintCount[msg.sender][version][addressKey];
    }
    
    // Get Token Data Counts
    function _tokenAddressCount(bytes32 version, uint256 key) public view returns(uint)
    {
        return TokenAddressCount[msg.sender][version][key];
    }
    function _tokenBoolCount(bytes32 version, uint256 key) public view returns(uint)
    {
        return TokenAddressCount[msg.sender][version][key];
    }
    function _tokenStringCount(bytes32 version, uint256 key) public view returns(uint)
    {
        return TokenAddressCount[msg.sender][version][key];
    }
    function _tokenUintCount(bytes32 version, uint256 key) public view returns(uint)
    {
        return TokenAddressCount[msg.sender][version][key];
    }
}