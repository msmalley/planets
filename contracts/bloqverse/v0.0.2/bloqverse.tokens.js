pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// John Smith = 0xA0d2736e921249278dA7E872694Ae25a38FB050f

// bloq002 = 0x0AEE5fB82dcA635a608B3379AeC83b4CD94B649A

/*

Setup Instructions:

Contract 1 = Bloqverse ...
Step 1 -    Initiate Bloqverse()

Contract 2 = Proxy ...
Step 2 -    Initiate Proxy() -- linking to Bloqverse Contract Address

Contract 3 = Assets ...
Step 3 -    Initiate ERC721() -- linking to Proxy Contract Address
Step 4 -    Add ERC721 to Proxy Whitelist
Step 5 -    Run updateDefaultSymbol('PT') from ERC721 Contract
Step 6 -    Run updateSupplyName('PT', 'Planet Tokens') from ERC721 Contract

Contract 4 = Planets ...
Step 7 -    Initiate Planets() -- linking to Proxy & ERC721 Contract Addresses
Step 8 -    Add Planets to Proxy Whitelist
Step 9 -    Add Planets to ERC721 Write List
Step 10 -`  Run SetupUniverse()
Step 11 -   Generate Planets using Genesis()

Contract 5 = Tokens ...
Step 12 -   Initiate ERC20() -- linking to Proxy Contract
Step 13 -   Add ERC20 to Proxy Whitelist
Step 14 -   Run updateDefaultSymbol('CT') from ERC20 Contract
Step 15 -   Run updateSupplyName('CT', 'Credit Tokens') from ERC20 Contract

Move to Step 6 - Parents

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

contract ApproveAndCallFallBack 
{
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}

contract ERC20 is Upgradable
{
    Proxy db;
    
    using SafeMath for uint;
    
    mapping(address => bool) canWriteToERC20;
    
    function ERC20
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function updateProxy
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function updateSupplyName(string symbol, string name) public onlyOwner
    {
        db.setString(combine('ERC20', '_', symbol, '_', 'NAME'), stringToBytes32(name));
    }
    
    function updateSupplyDecimals(string symbol, uint decimals) public onlyOwner
    {
        db.setUint(combine('ERC20', '_', symbol, '_', 'DECIMALS'), decimals);
    }
    
    function updateDefaultSymbol(string defaultSymbol) public onlyOwner
    {
        db.setString('ERC20_symbol', stringToBytes32(defaultSymbol));
    }
    
    function addWriteAddress(address Address) public onlyOwner
    {
        require(canWriteToERC20[Address] == false);
        canWriteToERC20[Address] = true;
    }
    
    function removeWriteAddress(address Address) public onlyOwner
    {
        require(canWriteToERC20[Address] == true);
        canWriteToERC20[Address] = false;
    }
    
    function uid(string id, string optionalResource) public view returns(string)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = symbol(optionalResource);
        }
        return combine(optionalResource, '_', id, '', '');
    }
    
    /*
    
    ADVANCED ERC20 FUNCTIONS
    
    -- STANDARD FUNCTIONS PROVIDED FOR CREDITS
    -- ADDED "RESOURCE" VARIABLE FOR TOKENS OTHER THAN "CREDIT" - SUCH AS "WOOD", "STONE", ETC ...
    
    */
    
    function name(string optionalResource) public view returns(string)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC20_symbol'));
        }
        return bytes32ToString(db.getString(combine('ERC20', '_', optionalResource, '_', 'NAME')));
    }
    
    function decimals(string optionalResource) public view returns(uint)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC20_symbol'));
        }
        return db.getUint(combine('ERC20', '_', optionalResource, '_', 'DECIMALS'));
    }
    
    function symbol(string optionalResource) public view returns(string)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            return bytes32ToString(db.getString('ERC20_symbol'));
        }
        else
        {
            return optionalResource;
        }
    }
    
    function totalSupply(string optionalResource) public constant returns (uint) 
    {
        return db.getUint(uid('total', optionalResource));
    }

    function balanceOf(address tokenOwner, string optionalResource) public constant returns (uint balance) 
    {
        return db.getsUint(tokenOwner, uid('balance', optionalResource));
    }
    
    function transfer(address to, uint units, string optionalResource) public returns (bool success) 
    {
        require(db.getsUint(tx.origin, uid('balance', optionalResource)) >= units);
        db.setsUint(tx.origin, uid('balance', optionalResource), db.getsUint(tx.origin, uid('balance', optionalResource)).sub(units));
        db.setsUint(to, uid('balance', optionalResource), db.getsUint(to, uid('balance', optionalResource)).add(units));
        return true;
    }
        
    function generateTokens(address Address, uint amount, string optionalResource) public onlyOwner
    {
        mintTokens(Address, amount, optionalResource);
    }
        
    function makeTokens(address Address, uint amount, string optionalResource) public
    {
        require
        (
            canWriteToERC20[msg.sender] == true
            || canWriteToERC20[tx.origin] == true
        );
        db.setsUint(Address, uid('balance', optionalResource), db.getsUint(Address, uid('balance', optionalResource)).add(amount));
        db.setUint(uid('total', optionalResource), db.getUint(uid('total', optionalResource)).add(amount));
    }
        
    function destroyTokens(address Address, uint amount, string optionalResource) public
    {
        require(db.getsUint(Address, uid('balance', optionalResource)) >= amount);
        require
        (
            canWriteToERC20[msg.sender] == true
            || canWriteToERC20[tx.origin] == true
        );
        db.setsUint(Address, uid('balance', optionalResource), db.getsUint(Address, uid('balance', optionalResource)).sub(amount));
        db.setUint(uid('total', optionalResource), db.getUint(uid('total', optionalResource)).sub(amount));
    }
        
    /*
    
    INTERNALS
    
    */
        
    function mintTokens(address Address, uint amount, string optionalResource) internal
    {
        db.setsUint(Address, uid('balance', optionalResource), db.getsUint(Address, uid('balance', optionalResource)).add(amount));
        db.setUint(uid('total', optionalResource), db.getUint(uid('total', optionalResource)).add(amount));
    }

    function () public payable 
    {
        revert();
    }
        
    
}