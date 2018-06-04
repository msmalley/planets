pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// John Smith = 0xA0d2736e921249278dA7E872694Ae25a38FB050f

// v0.0.2 = 0x37Da9D8acc8c7D63ba9a0FB41D0a89b247c31385

// bloq002 = 0x8dDE667b6Ed800f4326F2822A3A49fe31A0E62E2

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

- Missing "approve", "takeOwnership", and all Events ...
-- Can view whitelist and blacklist ?

Instructions:

Bloqverse ...
Step 1 -    Initiate Bloqverse()

Proxy ...
Step 2 -    Initiate Proxy() -- linking to Bloqverse Contract Address

Assets ...
Step 3 -    Initiate ERC721() -- linking to Proxy Contract Address
Step 4 -    Add ERC721 to Proxy Whitelist
Step 5 -    Run updateDefaultSymbol('PT') from ERC721 Contract
Step 6 -    Run updateSupplyName('PT', 'Planet Tokens') from ERC721 Contract

Planets ...
Step 7 -    Initiate Planets() -- linking to Proxy & ERC721 Contract Addresses
Step 8 -    Add Planets to Proxy Whitelist
Step 9 -    Add Planets to ERC721 Write List
Step 10 -   Generate Planets using Genesis()

Tokens ...
Step 11 -   Initiate ERC20() -- linking to Proxy Contract
Step 12 -   Add ERC20 to Proxy Whitelist
Step 13 -   Run updateDefaultSymbol('CT') from ERC20 Contract
Step 14 -   Run updateSupplyName('CT', 'Credit Tokens') from ERC20 Contract

Parents ...
Step 15 -   Initiate Parents() - linking to Proxy, ERC721, ERC20 & Planets
Step 16 -   Add Parents to Proxy Whitelist
Step 17 -   Add Parents to ERC721 Write List
Step 18 -   Add Parents to ERC20 Write List
Step 19 -   Run SetupParents()
Step 20 -   Can then GenerateParents() -- register players

Choices ...
Step 21 -   Initiate Choices() - linking to Parents contract address
Step 22 -   Add Choices Address to Proxy Whitelist
Step 23 -   Add Choices Address to Parents Write List
Step 24 -   Can now form alliances and choose to become rebel ...

Families ...
Step 25 -   Initiate Families() - linking to Proxy, Asset, Planet & Parents
Step 26 -   Add Families Address to Proxy Whitelist
Step 27 -   Add Families Address to Assets Write List
Step 27 -   Add Families Address to Parents Write List
Step 28 -   Administrators can now use ForcedMarriage() to generate children!

Atoms ...
Step 29 -   Initiate Atoms() - linking to Proxy & Token contracts
Step 30 -   Add Atoms Address to Proxy Whitelist
Step 31 -   Add Atoms Address to Tokens Write List
Step 32 -   Can now start adding atomic structure ...
Step 33 -   Administrators can now GenerateAtoms() for testing ...
Step 34 -   Players can sell atoms to banks who converts to NRG
Step 35 -   Players can buy atoms from bank if bank has enough NRG
Step 36 -   Players can perform atomic swaps (based on weight)

Items ...
Step 37 -   Initiate Items() - linking to Proxy, Token & Atom contracts
Step 38 -   Add Items Address to Proxy Whitelist
Step 39 -   Add Items Address to Tokens Write List
Step 40 -   Add Items Address to Atoms Write List
Step 41 -   Players can now Craft Items (using atoms)
Step 42 -   Or buy items from bank (if it has enough NRG to re-cycle)

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
    function setUint(string key, uint256 value) public;
    function setString(string key, bytes32 value) public;
    function setsUint(address addressKey, string param, uint256 value) public;
    function SetAddress(uint256 key, string param, address value) public;
    function SetString(uint256 key, string param, bytes32 value) public;
    function SetUint(uint256 key, string param, uint256 value) public;
    function getUint(string key) public view returns(uint256);
    function getString(string key) public view returns(bytes32);
    function getsUint(address addressKey, string param) public view returns(uint256);
    function GetAddress(uint256 key, string param) public view returns(address);
    function GetString(uint256 key, string param) public view returns(bytes32);
    function GetUint(uint256 key, string param) public view returns(uint256);
}

contract ERC721 is Upgradable
{
    Proxy db;
    
    using SafeMath for uint;
    
    mapping(address => bool) canWriteToERC721;
    
    function ERC721
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function updateProxy(address proxyAddress) public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    /*
    function updateSupplyName(string symbol, string name) public onlyOwner
    {
        db.setString(combine('ERC721', '_', symbol, '_', 'NAME'), stringToBytes32(name));
    }
    
    function updateDefaultSymbol(string defaultSymbol) public onlyOwner
    {
        db.setString('ERC721_symbol', stringToBytes32(defaultSymbol));
    }
    */
    
    function addWriteAddress(address Address) public onlyOwner
    {
        require(canWriteToERC721[Address] == false);
        canWriteToERC721[Address] = true;
    }
    
    /*
    function removeWriteAddress(address Address) public onlyOwner
    {
        require(canWriteToERC721[Address] == true);
        canWriteToERC721[Address] = false;
    }
    */
    
    function name(string optionalResource) public view returns(string)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC721_symbol'));
        }
        return bytes32ToString(db.getString(combine('ERC721', '_', optionalResource, '_', 'NAME')));
    }
    
    function symbol(string optionalResource) public view returns(string)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            return bytes32ToString(db.getString('ERC721_symbol'));
        }
        else
        {
            return optionalResource;
        }
    }
    
    function token_id(string key, string optionalResource) public view returns(string)
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC721_symbol'));
        }
        return combine(optionalResource, '_', key, '', '');
    }
    
    function metabytes(uint256 id, string optionalResource) public view returns(bytes32) 
    {
        return db.GetString(id, token_id('meta', optionalResource));
    }
    
    /*
    
    MULTI-DIMENSIONAL ERC721 FUNCTIONS
    
    -- ADDED OPTIONALRESOURCE KEY SWITCHES SUPPLIES
    
    */
    
    function totalSupply(string optionalResource) public view returns (uint) 
    {
        return db.getUint(token_id('total', optionalResource));
    }
    
    function balanceOf(address beneficiary, string optionalResource) public view returns (uint) 
    {
        return db.getsUint(beneficiary, token_id('balance', optionalResource));
    }
    
    /*
    function tokenOfOwnerByIndex(address beneficiary, uint index, string optionalResource) public view returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(beneficiary, optionalResource));
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC721_symbol'));
        }
        return db.getsUint(beneficiary, combine('owned', '_', uintToString(index), '_', optionalResource));
    }
    */
    
    function getAllTokens(address beneficiary, string optionalResource) public view returns (uint[]) 
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC721_symbol'));
        }
        uint size = db.getsUint(beneficiary, token_id('balance', optionalResource));
        uint[] memory result = new uint[](size);
        for (uint index = 0; index < size; index++) 
        {
            result[index] = db.getsUint(beneficiary, combine('owned', '_', uintToString(index), '_', optionalResource));
        }
        return result;
    }
    
    function ownerOf(uint id, string optionalResource) public view returns (address) 
    {
        return db.GetAddress(id, token_id('owner', optionalResource));
    }
    
    function transfer(address to, uint id, string optionalResource) public
    {
        require(
            db.GetAddress(id, token_id('owner', optionalResource)) == msg.sender
            || db.GetAddress(id, token_id('owner', optionalResource)) == tx.origin
        );
        _removeTokenFrom(db.GetAddress(id, token_id('owner', optionalResource)), id, optionalResource);
        _addTokenTo(to, id, optionalResource);
    }
    
    function metadata(uint256 id, string optionalResource) public view returns(string) 
    {
        return bytes32ToString(metabytes(id, optionalResource));
    }  
    
    function updateTokenMetadata(uint id, string meta, string optionalResource) public returns(bool)
    {
        require(
            db.GetAddress(id, token_id('owner', optionalResource)) == msg.sender
            || db.GetAddress(id, token_id('owner', optionalResource)) == tx.origin
        );
        db.SetString(id, token_id('meta', optionalResource), stringToBytes32(meta));
        return true;
    }
    
    function mint(address beneficiary, uint256 id, string meta, string optionalResource) public
    {
        require(
            canWriteToERC721[msg.sender] == true
            || canWriteToERC721[tx.origin] == true
        );
        require(db.GetString(id, token_id('meta', optionalResource)) == stringToBytes32(''));
        db.SetString(id, token_id('meta', optionalResource), stringToBytes32(meta));
        db.SetUint(id, token_id('bob', optionalResource), block.number);
        db.setUint(token_id('total', optionalResource), db.getUint(token_id('total', optionalResource)).add(1));
        _addTokenTo(beneficiary, id, optionalResource);
    }
    
    function destroy(uint256 assetId, address Address, string optionalResource) public
    {
        require(
            canWriteToERC721[msg.sender] == true
            || canWriteToERC721[tx.origin] == true
        );
        require(db.GetString(assetId, token_id('meta', optionalResource)) != stringToBytes32(''));
        db.SetString(assetId, token_id('meta', optionalResource), '');
        db.SetUint(assetId, token_id('bob', optionalResource), 0);
        db.setUint(token_id('total', optionalResource), db.getUint(token_id('total', optionalResource)).sub(1));
        _removeTokenFrom(Address, assetId, optionalResource);
    }
    
    /*
    
    INTERNALS
    
    */

    function _removeTokenFrom(address from, uint id, string optionalResource) internal 
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC721_symbol'));
        }
        require(db.getsUint(from, token_id('balance', optionalResource)) > 0);
        uint length = db.getsUint(from, token_id('balance', optionalResource));
        uint index = db.GetUint(id, token_id('index', optionalResource));
        uint swapToken = db.getsUint(from, combine('owned', '_', uintToString(length.sub(1)), '_', optionalResource));
        db.setsUint(from, combine('owned', '_', uintToString(index), '_', optionalResource), swapToken);
        db.SetUint(swapToken, token_id('index', optionalResource), index);
        db.setsUint(from, token_id('balance', optionalResource), length.sub(1));
    }

    function _addTokenTo(address beneficiary, uint id, string optionalResource) internal 
    {
        if(stringToBytes32(optionalResource) == stringToBytes32(''))
        {
            optionalResource = bytes32ToString(db.getString('ERC721_symbol'));
        }
        uint length = db.getsUint(beneficiary, token_id('balance', optionalResource));
        db.setsUint(beneficiary, combine('owned', '_', uintToString(length), '_', optionalResource), id);
        db.SetAddress(id, token_id('owner', optionalResource), beneficiary);
        db.SetUint(id, token_id('index', optionalResource), length);
        db.setsUint(beneficiary, token_id('balance', optionalResource), length.add(1));
    }
}