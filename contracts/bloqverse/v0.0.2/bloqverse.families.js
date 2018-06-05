pragma solidity ^0.4.18;

// Private Floyd = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private FooFoo = 0xA0d2736e921249278dA7E872694Ae25a38FB050f

// Genesis Prime
// 111289844878109423708526826116317304238808005787352761159317502897542254661420

// Belly Pop Boo
// 94011976869775928030958177182292812687116659522861038973095974402452914434165

// Smithy Smitherson The Third
// 51209924265025273315270136721647240845648238365126095795692133168641388244097

// bloq002 = 0x4b9e77627F6C97a314807703f6C16cc7eb165cf4

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

Move to Step 9 - Atoms

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
    function totalSupply(string optionalResource) public view returns (uint);
    function balanceOf(address tokenOwner, string optionalResource) public view returns (uint);
    function metabytes(uint256 tokenId, string optionalResource) public view returns (bytes32);
    function mint(address beneficiary, uint256 id, string meta, string optionalResource) public;
    function ownerOf(uint id, string optionalResource) public view returns (address);
}

contract Planets is Upgradable
{
    function donationAddress() public view returns(address);
    function universeBytes() public view returns(bytes32);
}

contract Parents is Upgradable
{
    function getParentDNA(address parentAddress) public view returns(uint256 parentDNA);
    function getParentBytes(address parentAddress) public view returns(bytes32);
    function getMarried(address parent1, address parent2) public;
    function getParentSpouse(address parentAddress) public view returns(address);
    function getParentAge(address parentAddress) public view returns(uint);
    function getPlanetOfBytes(address Address) public view returns(bytes32);
}

contract Choices is Upgradable
{
    function currentPlanetBytes(address playerAddress) public view returns(bytes32);
}

contract Families is Upgradable
{
    Proxy db;
    ERC721 assets;
    Planets planets;
    Parents parents;
    Choices choices;
    
    using SafeMath for uint;
    
    function() public payable
    {
        address donation_address = planets.donationAddress();
        donation_address.transfer(msg.value);
    }
    
    function Families
    (
        address proxyAddress,
        address assetContractAddress,
        address planetContractAddress,
        address parentContractAddress,
        address choicesContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        assets = ERC721(assetContractAddress);
        planets = Planets(planetContractAddress);
        parents = Parents(parentContractAddress);
        choices = Choices(choicesContractAddress);
    }
    
    function updateProxy
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function updateAssets
    (
        address assetContractAddress
    ) 
    public onlyOwner
    {
        assets = ERC721(assetContractAddress);
    }
    
    function updatePlanets
    (
        address planetContractAddress
    ) 
    public onlyOwner
    {
        planets = Planets(planetContractAddress);
    }
    
    function updateParents
    (
        address parentContractAddress
    ) 
    public onlyOwner
    {
        parents = Parents(parentContractAddress);
    }
    
    function updateChoices
    (
        address choicesContractAddress
    ) 
    public onlyOwner
    {
        choices = Choices(choicesContractAddress);
    }
    
    function childDNA(address mother, address father, uint256 planetID) public view returns(uint256)
    {
        uint256 parent1DNA = parents.getParentDNA(mother);
        uint256 parent2DNA = parents.getParentDNA(father);
        string memory universe = bytes32ToString(planets.universeBytes());
        return uint256(keccak256(universe, '|', planetID, '|', parent1DNA, '|', parent2DNA, '|', birthCount(mother)));
    }
    
    function generateChild(address mother, address father, uint256 planetID, string childName) internal
    {
        uint256 dna = childDNA(mother, father, planetID);
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
    }
    
    function forcedMarriage
    (
        address mother, 
        address father, 
        uint256 planetID, 
        string childName
    ) 
    public onlyOwner
    {
        parents.getMarried(mother, father);
        generateChild(mother, father, planetID, childName);
    }
    
    function childCount() public view returns(uint)
    {
        return assets.totalSupply('KID');
    }
    
    function childrenCount(address parent) public view returns(uint)
    {
        return assets.balanceOf(parent, 'KID');
    }
    
    function birthCount(address parent) public view returns(uint)
    {
        return db.getsUint(parent, 'children_births');
    }
    
    function spawnCount(address parent) public view returns(uint)
    {
        return db.getsUint(parent, 'children_spawn');
    }
    
    function getChildAge(uint256 dna) public view returns(uint)
    {
        return block.number.sub(db.GetUint(dna, 'children_bob'));
    }
    
    function getChild(uint256 dna) public view returns
    (
        string childName,
        uint childAge,
        string motherName,
        string fatherName,
        string planetOfBirth,
        string currentGuardian
    )
    {
        return
        (
            getChildName(dna),
            getChildAge(dna),
            getMotherName(dna),
            getFatherName(dna),
            getChildPlanet(dna),
            getChildGuardian(dna)
        );
    }
    
    function childMother(uint256 dna) public view returns
    (
        string childName,
        uint childAge,
        string motherName,
        uint motherAge,
        string motherPlanetOfBirth,
        string motherLocation
    )
    {
        return
        (
            getChildName(dna),
            getChildAge(dna),
            getMotherName(dna),
            getMotherAge(dna),
            getMotherPlanetOfBirth(dna),
            getMotherLocation(dna)
        );
    }
    
    function childFather(uint256 dna) public view returns
    (
        string childName,
        uint childAge,
        string fatherName,
        uint fatherAge,
        string fatherPlanetOfBirth,
        string fatherLocation
    )
    {
        return
        (
            getChildName(dna),
            getChildAge(dna),
            getFatherName(dna),
            getFatherAge(dna),
            getFatherPlanetOfBirth(dna),
            getFatherLocation(dna)
        );
    }
    
    function getChildGuardian(uint256 dna) public view returns(string)
    {
        if(getChildGuardianBytes(dna) == stringToBytes32(''))
        {
            uint id = db.GetUint(dna, 'employed');
            return bytes32ToString(assets.metabytes(id, 'CORPORATION'));
        }
        else
        {
            return bytes32ToString(getChildGuardianBytes(dna));
        }
    }
    
    function getChildGuardianBytes(uint256 dna) public view returns(bytes32)
    {
        return parents.getParentBytes(assets.ownerOf(dna, 'KID'));
    }
    
    function getChildPlanet(uint256 dna) public view returns(string)
    {
        return bytes32ToString(getChildPlanetBytes(dna));
    }
    
    function getChildPlanetBytes(uint256 dna) public view returns(bytes32)
    {
        return assets.metabytes(db.GetUint(dna, 'children_pob'), 'PT');
    }
    
    function getChildName(uint256 dna) public view returns(string)
    {
        return bytes32ToString(getChildBytes(dna));
    }
    
    function getChildBytes(uint256 dna) public view returns(bytes32)
    {
        return assets.metabytes(dna, 'KID');
    }
    
    function getMotherAge(uint256 dna) public view returns(uint)
    {
        address parent = db.GetAddress(dna, 'children_mother');
        return parents.getParentAge(parent);
    }
    
    function getMotherPlanetOfBirth(uint256 dna) public view returns(string)
    {
        address parent = db.GetAddress(dna, 'children_mother');
        return bytes32ToString(parents.getPlanetOfBytes(parent));
    }
    
    function getMotherLocation(uint256 dna) public view returns(string)
    {
        address parent = db.GetAddress(dna, 'children_mother');
        return bytes32ToString(choices.currentPlanetBytes(parent));
    }
    
    function getMotherName(uint256 dna) public view returns(string)
    {
        return bytes32ToString(getMotherBytes(dna));
    }
    
    function getMotherBytes(uint256 dna) public view returns(bytes32)
    {
        return parents.getParentBytes(db.GetAddress(dna, 'children_mother'));
    }
    
    function getFatherAge(uint256 dna) public view returns(uint)
    {
        address parent = db.GetAddress(dna, 'children_father');
        return parents.getParentAge(parent);
    }
    
    function getFatherPlanetOfBirth(uint256 dna) public view returns(string)
    {
        address parent = db.GetAddress(dna, 'children_father');
        return bytes32ToString(parents.getPlanetOfBytes(parent));
    }
    
    function getFatherLocation(uint256 dna) public view returns(string)
    {
        address parent = db.GetAddress(dna, 'children_father');
        return bytes32ToString(choices.currentPlanetBytes(parent));
    }
    
    function getFatherName(uint256 dna) public view returns(string)
    {
        return bytes32ToString(getFatherBytes(dna));
    }
    
    function getFatherBytes(uint256 dna) public view returns(bytes32)
    {
        return parents.getParentBytes(db.GetAddress(dna, 'children_father'));
    }
    
    function familyTree(address parent) public view returns
    (
        string name,
        string currentSpouse,
        uint childrenBirthed,
        uint childrenSpawn,
        uint childrenInPossession,
        uint childrenInSpousePossession
    )
    {
        address spouse = parents.getParentSpouse(parent);
        return
        (
            bytes32ToString(parents.getParentBytes(parent)),
            bytes32ToString(parents.getParentBytes(spouse)),
            birthCount(parent),
            spawnCount(parent),
            assets.balanceOf(parent, 'KID'),
            assets.balanceOf(spouse, 'KID')
        );
    }
}