pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private FooFoo = 0xA0d2736e921249278dA7E872694Ae25a38FB050f

// MegaUberCorp Intergalactic = 
// 51903284510384126512393640998007292375040233478966863102742712281380896609667

// bloq002 = 0x875B5a9CAf188343B3385E4265d4c81617361f8D

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

Things ...
Step 43 -   Initiate Things() - linking to Proxy, Assets & Tokens contracts
Step 44 -   Add Things Address to Proxy Whitelist
Step 45 -   Add Things Address to Assets Write List
Step 46 -   Add Things Address to Tokens Write List
Step 47 -   Update Structure to include "BUILDINGS (wood, stone, steel)"

Corporations ...
Step 48 -   Initiate Corporations() - linking to Proxy & Asset Contracts
Step 49 -   Add Corporations to Proxy Whitelist
Step 50 -   Add Corporations to Assets Write List

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

contract ERC721 is Upgradable
{
    function mint(address beneficiary, uint256 id, string meta, string optionalResource) public;
    function destroy(uint256 assetId, address Address, string optionalResource) public;
    function metabytes(uint tokenId, string optionalResource) public view returns(bytes32);
    function ownerOf(uint tokenId, string optionalResource) public view returns (address);
    function transfer(address to, uint id, string optionalResource) public;
}

contract Corporations is Upgradable
{
    Proxy db;
    ERC721 assets;
    
    using SafeMath for uint;
    
    address public centralTrustee;
    
    function() public payable
    {
        revert();
    }
    
    function Corporations
    (
        address proxyAddress,
        address assetContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
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
    
    function updateAssets
    (
        address assetContractAddress
    ) 
    public onlyOwner
    {
        assets = ERC721(assetContractAddress);
    }
    
    function cid
    (
        string name,
        uint256 founder,
        uint256 planet
    ) 
    public view returns(uint256)
    {
        return uint256(keccak256(
            name,
            uintToString(founder),
            uintToString(planet),
            toString(centralTrustee)
        ));
    }
    
    function incorporate
    (
        string name,
        uint256 planet,
        uint256 building,
        uint256 foundingChild
    )
    public returns(uint256)
    {
        uint id = cid
        (
            name, 
            foundingChild,
            planet
        );
        require(
            assets.metabytes(planet, 'PT') 
            != stringToBytes32('')
        );
        require(
            assets.metabytes(id, 'CORPORATION') 
            == stringToBytes32('')
        );
        addEmployee(id, foundingChild);
        addBuilding(id, building);
        db.SetUint(id, 'location', planet);
        db.SetUint(id, 'founder', foundingChild);
        db.SetUint(id, 'bob', block.number);
        assets.mint(tx.origin, id, name, 'CORPORATION');
        return id;
    }
    
    function getCompany(uint company) public view returns
    (
        string name,
        string founder,
        string planetOfIncorporation,
        uint employees,
        uint buildings,
        uint age
    )
    {
        uint256 planetID = getLocation(company);
        return
        (
            bytes32ToString(assets.metabytes(company, 'CORPORATION')),
            getFounder(company),
            bytes32ToString(assets.metabytes(planetID, 'PT')),
            getEmployees(company),
            getBuildings(company),
            getAge(company)
        );
    }
    
    function getLocation(uint company) public view returns(uint256)
    {
        return db.GetUint(company, 'location');
    }
    
    function getFounder(uint company) public view returns(string)
    {
        return bytes32ToString(getFounderBytes(company));
    }
    
    function getFounderBytes(uint company) public view returns(bytes32)
    {
        return assets.metabytes(db.GetUint(company, 'founder'), 'KID');
    }
    
    function getEmployees(uint company) public view returns(uint)
    {
        return db.GetUint(company, 'employees');
    }
    
    function getBuildings(uint company) public view returns(uint)
    {
        return db.GetUint(company, 'buildings');
    }
    
    function getAge(uint company) public view returns(uint)
    {
        return block.number.sub(db.GetUint(company, 'bob'));
    }
    
    function addEmployee(uint256 company, uint256 child) public
    {
        require(assets.ownerOf(child, 'KID') == tx.origin);
        assets.transfer(centralTrustee, child, 'KID');
        db.SetUint(company, 'employees', db.GetUint(company, 'employees').add(1));
        string memory id = combine('employee', '_', uintToString(db.GetUint(company, 'employees')), '', '');
        db.SetUint(company, id, child); 
    }
    
    function addBuilding(uint256 company, uint256 building) public
    {
        require(assets.ownerOf(building, 'BUILDING') == tx.origin);
        assets.transfer(centralTrustee, building, 'BUILDING');
        db.SetUint(company, 'buildings', db.GetUint(company, 'buildings').add(1));
        string memory id = combine('building', '_', uintToString(db.GetUint(company, 'buildings')), '', '');
        db.SetUint(company, id, building);
    }
    
    function unincorporate(uint256 company) public
    {
        require(
            assets.metabytes(company, 'CORPORATION') 
            != stringToBytes32('')
        );
        require(assets.ownerOf(company, 'CORPORATION') == tx.origin);
        uint[] memory employees = new uint[](getEmployees(company));
        uint[] memory buildings = new uint[](getBuildings(company));
        for(uint employee = 0; employee < employees.length; employee++)
        {
            uint employeeID = db.GetUint(company, combine('employee', '_', uintToString(employee.add(1)), '', ''));
            bytes32 employeeMeta = assets.metabytes(employeeID, 'KID');
            assets.destroy(employeeID, centralTrustee, 'KID');
            assets.mint(tx.origin, employeeID, bytes32ToString(employeeMeta), 'KID');
        }
        for(uint building = 0; building < buildings.length; building++)
        {
            uint buildingID = db.GetUint(company, combine('building', '_', uintToString(building.add(1)), '', ''));
            bytes32 buildingMeta = assets.metabytes(buildingID, 'BUILDING');
            assets.destroy(buildingID, centralTrustee, 'BUILDING');
            assets.mint(tx.origin, buildingID, bytes32ToString(buildingMeta), 'BUILDING');
        }
    }
}