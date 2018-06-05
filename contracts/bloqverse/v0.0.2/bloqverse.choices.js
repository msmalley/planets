pragma solidity ^0.4.18;

// Private Floyd = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private FooFoo = 0xA0d2736e921249278dA7E872694Ae25a38FB050f

// bloq002 = 0x34310BDBc8bbD9e383ef21d962A8aD41C7ec2dA0

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

Move to Step 8 - Families

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

contract Parents is Upgradable
{
    function getAlly(address parentAddress) public view returns(address);
    function alliances(address ally1, address ally2) public;
    function getParentBytes(address parentAddress) public view returns(bytes32);
    function getPlanetOfBytes(address Address) public view returns(bytes32);
}

contract Planets is Upgradable
{
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256);
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (bool);
}

contract ERC721 is Upgradable
{
    function ownerOf(uint id, string optionalResource) public view returns (address);
    function metabytes(uint256 id, string optionalResource) public view returns(bytes32);
}

contract Choices is Upgradable
{
    Proxy db;
    Parents parents;
    Planets planets;
    ERC721 assets;
    
    using SafeMath for uint;
    
    function() public payable
    {
        revert();
    }
    
    function Choices
    (
        address proxyAddress,
        address parentContractAddress,
        address planetContractAddress,
        address assetContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        parents = Parents(parentContractAddress);
        planets = Planets(planetContractAddress);
        assets = ERC721(assetContractAddress);
    }
    
    function updateProxy
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function updateParents
    (
        address parentContractAddress
    ) 
    public onlyOwner
    {
        parents = Parents(parentContractAddress);
    }
    
    function updatePlanets
    (
        address planetContractAddress
    ) 
    public onlyOwner
    {
        planets = Planets(planetContractAddress);
    }
    
    function updateAssets
    (
        address assetContractAddress
    ) 
    public onlyOwner
    {
        assets = ERC721(assetContractAddress);
    }
    
    function isActivePlayer(address Address) public view returns(bool)
    {
        require(stringToBytes32(getPlayerName(Address)) != stringToBytes32(''));
        return true;
    }
    
    function becomeAlly(address allyAddress) public
    {
        require(isActivePlayer(tx.origin) == true);
        parents.alliances(tx.origin, allyAddress);
    }
    
    function renounceAlliance() public
    {
        require(isActivePlayer(tx.origin) == true);
        address allyAddress = parents.getAlly(tx.origin);
        parents.alliances(tx.origin, tx.origin);
        parents.alliances(allyAddress, allyAddress);
    }
    
    function becomeRebel() public
    {
        require(isActivePlayer(tx.origin) == true);
        require(db.getsBool(tx.origin, 'is_rebel') == false);
        db.setsBool(tx.origin, 'is_rebel', true);
    }
    
    function renounceRebellion() public
    {
        require(isActivePlayer(tx.origin) == true);
        require(db.getsBool(tx.origin, 'is_rebel') == true);
        db.setsBool(tx.origin, 'is_rebel', false);
    }
    
    function isRebel(address playerAddress) public view returns(bool)
    {
        return db.getsBool(playerAddress, 'is_rebel');
    }
    
    function currentPlanet(address playerAddress) public view returns(string)
    {
        return bytes32ToString(currentPlanetBytes(playerAddress));
    }
    
    function currentPlanetBytes(address playerAddress) public view returns(bytes32)
    {
        uint256 location = db.getsUint(playerAddress, 'location');
        if(location > 0)
        {
            return assets.metabytes(location, 'PT');
        }
        else
        {
            return parents.getPlanetOfBytes(playerAddress);
        }
    }
    
    function switchPlanet(uint xCoordinates, uint yCoordinates, uint zCoordinates) public 
    {
        require(isActivePlayer(tx.origin) == true);
        uint256 planet = planets.uid(xCoordinates, yCoordinates, zCoordinates);
        require(planets.exists(xCoordinates, yCoordinates, zCoordinates) == true);
        db.setsUint(tx.origin, 'location', planet);
    }
    
    function isRebelPlanet(uint xCoordinates, uint yCoordinates, uint zCoordinates) public view returns(bool) 
    {
        uint256 planet = planets.uid(xCoordinates, yCoordinates, zCoordinates);
        require(planets.exists(xCoordinates, yCoordinates, zCoordinates) == true);
        address planetOwner = assets.ownerOf(planet, 'PT');
        return isRebel(planetOwner);
    }
    
    function hasAlly(address playerAddress) public view returns(bool)
    {
        require(parents.getAlly(playerAddress) > 0);
        return true;
    }
    
    function areAllied(address address1, address address2) public view returns(bool)
    {
        require(parents.getAlly(address1) == address2);
        require(parents.getAlly(address2) == address1);
        return true;
    }
    
    function playerChoices(address Address) public view returns
    (
        string name,
        string playerLocation,
        bool rebel,
        bool gotAlly,
        string allyName,
        bool allyIsRebel,
        string allyLocation
    )
    {
        return
        (
            getPlayerName(Address),
            currentPlanet(Address),
            isRebel(Address),
            hasAlly(Address),
            getPlayerAllyName(Address),
            isPlayerAllyRebel(Address),
            currentAllyPlanet(Address)
        );
    }
    
    function currentAllyPlanet(address playerAddress) public view returns(string)
    {
        address allyAddress = parents.getAlly(playerAddress);
        return currentPlanet(allyAddress);
    }
    
    function getPlayerAllyName(address playerAddress) public view returns(string)
    {
        address allyAddress = parents.getAlly(playerAddress);
        return getPlayerName(allyAddress);
    }
    
    function isPlayerAllyRebel(address playerAddress) public view returns(bool)
    {
        address allyAddress = parents.getAlly(playerAddress);
        return isRebel(allyAddress);
    }
    
    function getPlayerName(address Address) public view returns(string)
    {
        return bytes32ToString(parents.getParentBytes(Address));
    }
    
    function generateChild(address mother, address father, uint256 planetID, string childName) internal returns(uint256)
    {
        uint256 dna = families.childDNA(mother, father, planetID);
        require(assets.metabytes(dna, 'KID') == stringToBytes32(''));
        require(assets.metabytes(planetID, 'PT') != stringToBytes32(''));
        require(parents.getParentBytes(mother) != stringToBytes32(''));
        require(parents.getParentBytes(father) != stringToBytes32(''));
        assets.mint(mother, dna, childName, 'KID');
        db.SetUint(dna, 'children_bob', block.number);
        db.SetUint(dna, 'children_pob', planetID);
        db.SetAddress(dna, 'children_mother', mother);
        db.SetAddress(dna, 'children_father', father);
        db.setsUint(mother, 'children_births', db.getsUint(mother, 'children_births').add(1));
        db.setsUint(father, 'children_spawn', db.getsUint(father, 'children_spawn').add(1));
        require(assets.metabytes(dna, 'KID') != stringToBytes32(''));
        return dna;
    }
    
    function proposeMarriage(address mother) public
    {
        require(hasProposed(tx.origin, mother) == false);
        propose(tx.origin, mother);
    }
    
    function planWedding(address father) public
    {
        require(hasProposed(father, tx.origin) == true);
        wed(tx.origin, father);
    }
    
    function haveChild(string nameOfChild) public returns(uint256)
    {
        address mother = parents.getParentSpouse(tx.origin);
        require(mother > 0);
        require(parents.getParentSpouse(mother) == tx.origin);
        uint child = generateChild(mother, tx.origin, planet, name);
        require(child > 0);
        return child;
    }
    
    function hasProposed(address father, address mother) public view returns(bool);
    {
        require((db.GetAddress(father, 'proposed') != mother));
        return true;
    }
    
    function propose(address father, address mother) internal
    {
        db.SetAddress(father, 'proposed', mother);
    }
    
    function wed(address mother, address father) internal
    {
        parents.getMarried(mother, father);
    }
}