pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96

// Metallic HQ = 
// 79749637724123944032566148528153547108976317749788729936160560914000030378780

// The Foo Bowl =
// 56233951280438263134293449249286268691915385385200323544533588425545301638212

// Genesis Prime =
// 111289844878109423708526826116317304238808005787352761159317502897542254661420

// bloq002 = 0xF8809C6C1e106EB0e8Fba4fA2f452902C888a707

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

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

Contract 6 = Parents ...
Step 16 -   Initiate Parents() - linking to Proxy, ERC721, ERC20 & Planets
Step 17 -   Add Parents to Proxy Whitelist
Step 18 -   Add Parents to ERC721 Write List
Step 19 -   Add Parents to ERC20 Write List
Step 20 -   Run SetupParents()
Step 21 -   Can then GenerateParents() -- register players

Contract 7 = Choices ...
Step 22 -   Initiate Choices() - linking to Parents contract address
Step 23 -   Add Choices Address to Proxy Whitelist
Step 24 -   Add Choices Address to Parents Write List
Step 25 -   Can now form alliances and choose to become rebel ...

Contract 8 = Families ...
Step 26 -   Initiate Families() - linking to Proxy, Asset, Planet & Parents
Step 27 -   Add Families Address to Proxy Whitelist
Step 28 -   Add Families Address to Assets Write List
Step 29 -   Add Families Address to Parents Write List
Step 30 -   Administrators can now use ForcedMarriage() to generate children!

Contract 9 = Atoms ...
Step 31 -   Initiate Atoms() - linking to Proxy & Token contracts
Step 32 -   Add Atoms Address to Proxy Whitelist
Step 33 -   Add Atoms Address to Tokens Write List
Step 34 -   Can now start adding atomic structure ...
Step 35 -   Administrators can now GenerateAtoms() for testing ...
Step 36 -   Players can sell atoms to banks who converts to NRG
Step 37 -   Players can buy atoms from bank if bank has enough NRG
Step 38 -   Players can perform atomic swaps (based on weight)

Contract 10 = Items ...
Step 39 -   Initiate Items() - linking to Proxy, Token & Atom contracts
Step 40 -   Add Items Address to Proxy Whitelist
Step 41 -   Add Items Address to Tokens Write List
Step 42 -   Add Items Address to Atoms Write List
Step 43 -   Players can now Craft Items (using atoms)
Step 44 -   Or buy items from bank (if it has enough NRG to re-cycle)

Contract 11 = Things ...
Step 45 -   Initiate Things() - linking to Proxy, Assets & Tokens contracts
Step 46 -   Add Things Address to Proxy Whitelist
Step 47 -   Add Things Address to Assets Write List
Step 48 -   Add Things Address to Tokens Write List
Step 49 -   Update Structure to include "BUILDINGS (wood, stone, steel)"

Move to Step 12 - Corporations

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
    function balanceOf(address beneficary, string optionalResource) public view returns(uint);
    function makeTokens(address Address, uint amount, string optionalResource) public;
    function destroyTokens(address Address, uint amount, string optionalResource) public;
    function transfer(address to, uint units, string optionalResource) public returns (bool success);
}

contract ERC721 is Upgradable
{
    function mint(address beneficiary, uint256 id, string meta, string optionalResource) public;
    function destroy(uint256 assetId, address Address, string optionalResource) public;
    function metabytes(uint tokenId, string optionalResource) public view returns(bytes32);
    function ownerOf(uint tokenId, string optionalResource) public view returns (address);
}

contract Things is Upgradable
{
    Proxy db;
    ERC20 tokens;
    ERC721 assets;
    
    using SafeMath for uint;
    
    address public centralTrustee;
    
    function() public payable
    {
        revert();
    }
    
    function Things
    (
        address proxyAddress,
        address tokenContractAddress,
        address assetContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        tokens = ERC20(tokenContractAddress);
        assets = ERC721(assetContractAddress);
        centralTrustee = proxyAddress;
    }
    
    function updateProxy
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        centralTrustee = proxyAddress;
    }
    
    function updateTokens
    (
        address tokenContractAddress
    ) 
    public onlyOwner
    {
        tokens = ERC20(tokenContractAddress);
    }
    
    function updateAssets
    (
        address assetContractAddress
    ) 
    public onlyOwner
    {
        assets = ERC721(assetContractAddress);
    }
    
    function tid
    (
        string key,
        string name, 
        uint item1, 
        uint item2, 
        uint item3,
        uint256 planet
    ) 
    public view returns(uint256)
    {
        return uint256(keccak256(
            key,
            name,
            uintToString(item1),
            uintToString(item2),
            uintToString(item3),
            uintToString(planet),
            toString(centralTrustee)
        ));
    }
    
    function thingy(string key, string id) public pure returns(string)
    {
        return combine('things', '_', key, '_', id);
    }
    
    function updateStructure
    (
        string key,
        string item1,
        string item2,
        string item3
    )
    public onlyOwner
    {
        db.setString(thingy('item1', key), stringToBytes32(item1));
        db.setString(thingy('item2', key), stringToBytes32(item2));
        db.setString(thingy('item3', key), stringToBytes32(item3));
    }
    
    function gotStructure(string key) public view returns(bool)
    {
        require(db.getString(thingy('item1', key)) != stringToBytes32(''));
        return true;
    }
    
    function getItem1(string key) public view returns(string)
    {
        return combine('item', '_', bytes32ToString(db.getString(thingy('item1', key))), '', '');
    }
    
    function getItem2(string key) public view returns(string)
    {
        return combine('item', '_', bytes32ToString(db.getString(thingy('item2', key))), '', '');
    }
    
    function getItem3(string key) public view returns(string)
    {
        return combine('item', '_', bytes32ToString(db.getString(thingy('item3', key))), '', '');
    }
    
    function constructThing
    (
        string key, 
        string name,
        uint item1, 
        uint item2, 
        uint item3,
        uint256 planet
    )
    public returns(uint256)
    {
        require(gotStructure(key) == true);
        require(item1 >= 1);
        require(item2 >= 1);
        require(item3 >= 1);
        require(item1.add(item2).add(item3) == 100);
        uint id = tid
        (
            key,
            name, 
            item1,
            item2,
            item3,
            planet
        );
        require(
            assets.metabytes(planet, 'PT') 
            != stringToBytes32('')
        );
        require(
            assets.metabytes(id, key) 
            == stringToBytes32('')
        );
        require(tokens.transfer(centralTrustee, item1, getItem1(key)) == true);
        require(tokens.transfer(centralTrustee, item2, getItem2(key)) == true);
        require(tokens.transfer(centralTrustee, item3, getItem3(key)) == true);
        assets.mint(tx.origin, id, name, key);
        db.SetUint(id, thingy(key, 'location'), planet);
        db.SetUint(id, thingy(key, 'item1'), item1);
        db.SetUint(id, thingy(key, 'item2'), item2);
        db.SetUint(id, thingy(key, 'item3'), item3);
        require(
            assets.metabytes(id, key) 
            != stringToBytes32('')
        );
        return id;
    }
    
    function getThing(string key, uint id) public view returns
    (
        string name,
        uint item1,
        uint item2,
        uint item3,
        string planet
    )
    {
        uint256 planetID = getLocation(key, id);
        return
        (
            bytes32ToString(assets.metabytes(id, key)),
            getItems1(key, id),
            getItems2(key, id),
            getItems3(key, id),
            bytes32ToString(assets.metabytes(planetID, 'PT'))
        );
    }
    
    function getLocation(string key, uint id) public view returns(uint256)
    {
        return db.GetUint(id, thingy(key, 'location'));
    }
            
    function getItems1(string key, uint id) public view returns(uint)
    {
        return db.GetUint(id, thingy(key, 'item1'));
    }
    
    function getItems2(string key, uint id) public view returns(uint)
    {
        return db.GetUint(id, thingy(key, 'item2'));
    }
    
    function getItems3(string key, uint id) public view returns(uint)
    {
        return db.GetUint(id, thingy(key, 'item3'));
    }
    
    function deconstructThing(string key, uint id) public
    {
        require(assets.ownerOf(id, key) == tx.origin);
        require(tokens.balanceOf(centralTrustee, getItem1(key)) >= getItems1(key, id));
        require(tokens.balanceOf(centralTrustee, getItem2(key)) >= getItems2(key, id));
        require(tokens.balanceOf(centralTrustee, getItem3(key)) >= getItems3(key, id));
        tokens.destroyTokens(centralTrustee, getItems1(key, id).sub(1), getItem1(key));
        tokens.destroyTokens(centralTrustee, getItems2(key, id).sub(1), getItem2(key));
        tokens.destroyTokens(centralTrustee, getItems3(key, id).sub(1), getItem3(key));
        tokens.makeTokens(centralTrustee, 1, combine(key, '_', 'PAYMENTS', '', ''));
        tokens.makeTokens(tx.origin, getItems1(key, id).sub(1), getItem1(key));
        tokens.makeTokens(tx.origin, getItems2(key, id).sub(1), getItem2(key));
        tokens.makeTokens(tx.origin, getItems3(key, id).sub(1), getItem3(key));
        assets.destroy(id, tx.origin, key);
    }
}