pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Main = 0x8e04937F5743094df7A79CC0Bd0862c00c8590Ec
// Private Test = 0x0c87C4132C11B273Db805876CA2d2f0BD60f4C24

// v0.0.2 = Advanced ERC20 Tokens = 0x437eF63a57a9da535Af5F8593dC22dCd5B4391ba = 0.79

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

contract Proxy is Upgradable
{
    // Set Contract Data
    function setAddress(string key, address value) public;
    function setBool(string key, bool value) public;
    function setString(string key, bytes32 value) public;
    function setUint(string key, uint256 value) public;
    // Set Addressed Data
    function setsAddress(address addressKey, string param, address value) public;
    function setsBool(address addressKey, string param, bool value) public;
    function setsString(address addressKey, string param, bytes32 value) public;
    function setsUint(address addressKey, string param, uint256 value) public;
    // Set Token Data
    function SetAddress(uint256 key, string param, address value) public;
    function SetBool(uint256 key, string param, bool value) public;
    function SetString(uint256 key, string param, bytes32 value) public;
    function SetUint(uint256 key, string param, uint256 value) public;
    // Get Contract Data
    function getAddress(string key) public view returns(address);
    function getBool(string key) public view returns(bool);
    function getString(string key) public view returns(bytes32);
    function getUint(string key) public view returns(uint256);
    // Get Addressed Data
    function getsAddress(address addressKey, string param) public view returns(address);
    function getsBool(address addressKey, string param) public view returns(bool);
    function getsString(address addressKey, string param) public view returns(bytes32);
    function getsUint(address addressKey, string param) public view returns(uint256);
    // Get Token Data
    function GetAddress(uint256 key, string param) public view returns(address);
    function GetBool(uint256 key, string param) public view returns(bool);
    function GetString(uint256 key, string param) public view returns(bytes32);
    function GetUint(uint256 key, string param) public view returns(uint256);
    // Get Contract Data Counts
    function contractAddressCount() public view returns(uint);
    function contractBoolCount() public view returns(uint);
    function contractStringCount() public view returns(uint);
    function contractUintCount() public view returns(uint);
    // Get Addressed Data Counts
    function addressAddressCount(address addressKey) public view returns(uint);
    function addressBoolCount(address addressKey) public view returns(uint);
    function addressStringCount(address addressKey) public view returns(uint);
    function addressUintCount(address addressKey) public view returns(uint);
    // Get Token Data Counts
    function tokenAddressCount(uint256 key) public view returns(uint);
    function tokenBoolCount(uint256 key) public view returns(uint);
    function tokenStringCount(uint256 key) public view returns(uint);
    function tokenUintCount(uint256 key) public view returns(uint);
}

contract ERC20 is Upgradable
{
    function totalSupply(string optionalResource) public constant returns (uint);
    function balanceOf(address tokenOwner, string optionalResource) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender, string optionalResource) public constant returns (uint remaining);
    function transfer(address to, uint units, string optionalResource) public returns (bool success);
    function approve(address spender, uint units, string optionalResource) public returns (bool success);
    function transferFrom(address from, address to, uint units, string optionalResource) public returns (bool success);
    event Transfer(address indexed from, address indexed to, uint units);
    event Approval(address indexed tokenOwner, address indexed spender, uint units);
}

contract PlanetMeta is Upgradable
{
    function universeBytes() public view returns(bytes32);
}

contract ApproveAndCallFallBack 
{
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}

contract UniversalCredits is ERC20
{
    Proxy db;
    PlanetMeta meta;
    
    using SafeMath for uint;
    
    string public name = 'Universal Credits';
    string public symbol = 'UCT';
    string public universe;
    
    function UniversalCredits
    (
        address proxyAddress,
        address metaAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        meta = PlanetMeta(metaAddress);
        universe = bytes32ToString(meta.universeBytes());
    }
    
    function updateProxy
    (
        address proxyAddress,
        address metaAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        meta = PlanetMeta(metaAddress);
        universe = bytes32ToString(meta.universeBytes());
    }
    
    function uid(string id) public view returns(uint256)
    {
        return uint256(keccak256(universe, '|', id));
    }
    
    /*
    
    ADVANCED ERC20 FUNCTIONS
    
    -- STANDARD FUNCTIONS PROVIDED FOR CREDITS
    -- ADDED "RESOURCE" VARIABLE FOR TOKENS OTHER THAN "CREDIT" - SUCH AS "WOOD", "STONE", ETC ...
    
    */
    
    function totalSupply(string optionalResource) public constant returns (uint) 
    {
        string memory id = 'credit_total';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'total', '', '');
        }
        return db.getUint(id);
    }

    function balanceOf(address tokenOwner, string optionalResource) public constant returns (uint balance) 
    {
        string memory id = 'credit_balance';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'balance', '', '');
        }
        return db.getsUint(tokenOwner, id);
    }
    
    function transfer(address to, uint units, string optionalResource) public returns (bool success) 
    {
        string memory id = 'credit_balance';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'balance', '', '');
        }
        require(db.getsUint(tx.origin, id) >= units);
        db.setsUint(tx.origin, id, db.getsUint(tx.origin, id).sub(units));
        db.setsUint(to, id, db.getsUint(to, id).add(units));
        emit Transfer(msg.sender, to, units);
        return true;
    }
    
    function approve(address spender, uint units, string optionalResource) public returns (bool success) 
    {
        string memory id = 'credit_allowed';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'allowed', '_', toString(spender));
        }
        db.setsUint(tx.origin, id, units);
        emit Approval(tx.origin, spender, units);
        return true;
    }
    
    function transferFrom(address from, address to, uint units, string optionalResource) public returns (bool success) 
    {
        string memory id = 'credit_allowed';
        string memory key = 'credit_balance';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'allowed', '_', toString(msg.sender));
            key = combine(optionalResource, '_', 'balance', '', '');
        }
        require(db.getsUint(from, id) >= units);
        db.setsUint(msg.sender, id, db.getsUint(msg.sender, id).sub(units));
        db.setsUint(from, key, db.getsUint(from, key).sub(units));
        db.setsUint(to, key, db.getsUint(to, key).add(units));
        emit Transfer(from, to, units);
        return true;
    }
    
    function allowance
    (
        address tokenOwner, 
        address spender, 
        string optionalResource
    ) 
    public constant returns (uint remaining) 
    {
        string memory id = 'credit_allowed';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'allowed', '_', toString(spender));
        }
        return db.getsUint(tokenOwner, id);
    }
    
    function approveAndCall
    (
        address spender, 
        uint units, 
        bytes data, 
        string optionalResource
    ) 
    public returns (bool success) 
    {
        string memory id = 'credit_allowed';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'allowed', '_', toString(spender));
        }
        db.setsUint(msg.sender, id, units);
        emit Approval(msg.sender, spender, units);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, units, this, data);
        return true;
    }
    
    function mint(address beneficary, uint amount, string optionalResource) public onlyOwner
    {
        string memory id = 'credit_balance';
        string memory key = 'credit_total';
        if(stringToBytes32(optionalResource) != stringToBytes32(''))
        {
            id = combine(optionalResource, '_', 'balance', '', '');
            key = combine(optionalResource, '_', 'total', '', '');
        }
        db.setsUint(beneficary, id, db.getsUint(beneficary, id).add(amount));
        db.setUint(key, db.getUint(key).add(amount));
    }

    function () public payable 
    {
        revert();
    }
}