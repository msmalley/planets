pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96

// Metallic HQ = 
// 50828425710504467065371676546184894242207639619273079355697657823752347769406

// bloq002 = 0x5d8B04EFf342134F5224893eD0BbE48ea546c46f



/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

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

XXX -       Missing setup universe ???

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

Buildings ...
Step 43 -   Initiate Buildings() - linking to Proxy, Assets & Item contracts
Step 44 -   Add Buildings Address to Proxy Whitelist
Step 45 -   Add Buildings Address to Assets Write List
Step 46 -   Add Buildings Address to Tokens Write List

Inventory (always LAST)
Step XX -   Initiate Inventory() - linking to Proxy, Tokens & Assets
Step XX -   Add Inventory Address to Proxy Whitelist

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
    function balanceOf(address beneficary, string optionalResource) public view returns(uint);
    function mint(address beneficiary, uint256 id, string meta, string optionalResource) public;
    function destroy(uint256 assetId, address Address, string optionalResource) public;
    function metabytes(uint tokenId, string optionalResource) public view returns(bytes32);
    function ownerOf(uint tokenId, string optionalResource) public view returns (address);
}

contract Items is Upgradable
{
    
}

contract Buildings is Upgradable
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
    
    function Buildings
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
    
    function bid
    (
        string name, 
        uint wood, 
        uint stone, 
        uint steel,
        uint256 planet
    ) 
    public view returns(uint256)
    {
        return uint256(keccak256(
            name,
            uintToString(wood),
            uintToString(stone),
            uintToString(steel),
            uintToString(planet),
            toString(centralTrustee)
        ));
    }
    
    function constructBuilding
    (
        string name, 
        uint wood, 
        uint stone, 
        uint steel,
        uint256 planet
    )
    public returns(uint256)
    {
        require(wood >= 1);
        require(stone >= 1);
        require(steel >= 1);
        require(wood.add(stone).add(steel) == 100);
        uint id = bid
        (
            name, 
            wood,
            stone,
            steel,
            planet
        );
        require(
            assets.metabytes(planet, 'PT') 
            != stringToBytes32('')
        );
        require(
            assets.metabytes(id, 'BUILDING') 
            == stringToBytes32('')
        );
        require(tokens.transfer(centralTrustee, wood, 'item_wood') == true);
        require(tokens.transfer(centralTrustee, stone, 'item_stone') == true);
        require(tokens.transfer(centralTrustee, steel, 'item_steel') == true);
        assets.mint(tx.origin, id, name, 'BUILDING');
        db.SetUint(id, 'building_location', planet);
        db.SetUint(id, 'building_wood', wood);
        db.SetUint(id, 'building_stone', stone);
        db.SetUint(id, 'building_steel', steel);
        db.SetUint(id, 'building_bob', block.number);
        require(
            assets.metabytes(id, 'BUILDING') 
            != stringToBytes32('')
        );
        return id;
    }
    
    function getBuilding(uint id) public view returns
    (
        string name,
        uint wood,
        uint stone,
        uint steel,
        string planet,
        uint age
    )
    {
        uint256 planetID = getLocation(id);
        return
        (
            bytes32ToString(assets.metabytes(id, 'BUILDING')),
            getWood(id),
            getStone(id),
            getSteel(id),
            bytes32ToString(assets.metabytes(planetID, 'PT')),
            getAge(id)
        );
    }
    
    function getLocation(uint id) public view returns(uint256)
    {
        return db.GetUint(id, 'building_location');
    }
            
    function getWood(uint id) public view returns(uint)
    {
        return db.GetUint(id, 'building_wood');
    }
    
    function getStone(uint id) public view returns(uint)
    {
        return db.GetUint(id, 'building_stone');
    }
    
    function getSteel(uint id) public view returns(uint)
    {
        return db.GetUint(id, 'building_steel');
    }
    
    function getAge(uint id) public view returns(uint)
    {
        return (block.number - db.GetUint(id, 'building_bob'));
    }
    
    function deconstructBuilding(uint id) public
    {
        require(assets.ownerOf(id, 'BUILDING') == tx.origin);
        require(tokens.balanceOf(centralTrustee, 'item_wood') >= getWood(id));
        require(tokens.balanceOf(centralTrustee, 'item_stone') >= getStone(id));
        require(tokens.balanceOf(centralTrustee, 'item_steel') >= getSteel(id));
        tokens.destroyTokens(centralTrustee, getWood(id), 'item_wood');
        tokens.destroyTokens(centralTrustee, getStone(id), 'item_stone');
        tokens.destroyTokens(centralTrustee, getSteel(id), 'item_steel');
        tokens.makeTokens(tx.origin, getWood(id), 'item_wood');
        tokens.makeTokens(tx.origin, getStone(id), 'item_stone');
        tokens.makeTokens(tx.origin, getSteel(id), 'item_steel');
        assets.destroy(id, tx.origin, 'BUILDING');
    }
}