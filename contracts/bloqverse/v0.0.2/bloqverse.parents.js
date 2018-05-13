pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Main = 0x8e04937F5743094df7A79CC0Bd0862c00c8590Ec
// Private Test = 0x0c87C4132C11B273Db805876CA2d2f0BD60f4C24
// Private John Smith = 0x5DE0d9a57875B867043d82b2441af94AeeAE596B

// Interval = 15120
// Wei = 10000000000000
// Ether = 0.00001

// v0.0.2 = 0xd5fE8023aDd606603a60C27739891b5ACd646638 = 0.83

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

contract ERC721 is Upgradable
{
    function ownerOf(uint tokenId, string optionalResource) public view returns (address);
    function metabytes(uint256 tokenId, string optionalResource) public view returns (bytes32);
}

contract PlanetTokens is Upgradable
{
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (bool);
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256);
    function donationAddress() public view returns(address);
    function universeBytes() public view returns(bytes32);
}

contract PlanetParents is Upgradable
{
    Proxy db;
    ERC721 assets;
    PlanetTokens planets;
    
    using SafeMath for uint;
    
    address public activeFamilyAddress;
    address public activePlayerAddress;
    
    function() public payable
    {
        address donation_address = planets.donationAddress();
        donation_address.transfer(msg.value);
    }
    
    function PlanetParents
    (
        address proxyAddress,
        address assetContractAddress,
        address planetContractAddress,
        address familyContractAddress,
        address playerContractAddress,
        uint StartingWeiDonation, 
        uint WeiPerParent,
        uint BlockIntervals, 
        uint PlanetSalaryPercentage
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        assets = ERC721(assetContractAddress);
        planets = PlanetTokens(planetContractAddress);
        activeFamilyAddress = familyContractAddress;
        activePlayerAddress = playerContractAddress;
        db.setUint('parent_block_int', BlockIntervals);
        db.setUint('parent_price', WeiPerParent);
        db.setUint('parent_min_don', StartingWeiDonation);
        db.setUint('parent_salary', PlanetSalaryPercentage);
    }
    
    function updateProxy
    (
        address proxyAddress, 
        address assetContractAddress,
        address planetContractAddress,
        address familyContractAddress,
        address playerContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        assets = ERC721(assetContractAddress);
        planets = PlanetTokens(planetContractAddress);
        activeFamilyAddress = familyContractAddress;
        activePlayerAddress = playerContractAddress;
    }
    
    function updateSalary(uint PlanetSalaryPercentage) public onlyOwner
    {
        db.setUint('planet_salary', PlanetSalaryPercentage);
    }
    
    function destroyParent() public
    {
        require(db.getsString(tx.origin, 'parent_name') != stringToBytes32(''));
        uint256 id = db.getsUint(tx.origin, 'parent_pob');
        db.setsString(tx.origin, 'parent_name', stringToBytes32(''));
        db.setsUint(tx.origin, 'parent_bob', 0);
        db.setsUint(tx.origin, 'parent_pob', 0);
        db.setsUint(tx.origin, 'parent_dna', 0);
        db.setsUint(tx.origin, 'parent_ally', 0);
        db.setsAddress(tx.origin, 'parent_spouse', 0);
        db.setUint('parents', db.getUint('parents').sub(1));
        db.SetUint(id, 'parents', db.GetUint(id, 'parents').sub(1));
    }
    
    function generateParent
    (
        string parentName,
        uint xCoordinateOfHomeWorld,
        uint yCoordinateOfHomeWorld,
        uint zCoordinateOfHomeWorld,
        address returnAddress
    ) 
    public payable
    {
        uint minimum_donation = db.getUint('parent_min_don');
        if(msg.value >= minimum_donation)
        {
            address donation_address = planets.donationAddress();
            uint256 id = planets.uid
            (
                xCoordinateOfHomeWorld, 
                yCoordinateOfHomeWorld,
                zCoordinateOfHomeWorld
            );
            require(planets.exists
            (
                xCoordinateOfHomeWorld, 
                yCoordinateOfHomeWorld,
                zCoordinateOfHomeWorld
            ));
            require(db.getsString(tx.origin, 'parent_name') == stringToBytes32(''));
            db.setsString(tx.origin, 'parent_name', stringToBytes32(parentName));
            db.setsUint(tx.origin, 'parent_bob', block.number);
            db.setsUint(tx.origin, 'parent_pob', id);
            db.setsUint(tx.origin, 'parent_dna', uint256(keccak256
            (
                xCoordinateOfHomeWorld, 
                yCoordinateOfHomeWorld, 
                zCoordinateOfHomeWorld, 
                tx.origin, 
                bytes32ToString(planets.universeBytes())
            )));
            db.setUint('parents', db.getUint('parents').add(1));
            db.SetUint(id, 'parents', db.GetUint(id, 'parents').add(1));
            bumpParentDonations();
            address planet_address = assets.ownerOf(id, 'planet');
            uint salary = msg.value.div(db.getUint('planet_salary'));
            uint donation = msg.value.sub(salary);
            planet_address.transfer(salary);
            donation_address.transfer(donation);
        }
        else
        {
            bumpParentDonations();
            returnAddress.transfer(msg.value);
        }
    }
    
    function bumpParentDonations() public
    {
        uint this_block = block.number;
        uint checkpoint = db.getUint('parent_don_check');
        uint interval = db.getUint('parent_block_int');
        if(this_block > (checkpoint + interval))
        {
            uint ppp = db.getUint('parent_price');
            db.setUint('parent_don_check', this_block);
            db.setUint('parent_min_don', (ppp * db.getUint('parents')));
        }
    }
    
    function parentCount() public view returns(uint)
    {
        return db.getUint('parents');
    }
    
    function planetParentCount(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(uint)
    {
        uint256 id = planets.uid(xCoordinate, yCoordinate, zCoordinate);
        return db.GetUint(id, 'parents');
    }
    
    function getParentDNA(address parentAddress) public view returns(uint256 parentDNA)
    {
        return(db.getsUint(parentAddress, 'parent_dna'));
    }
    
    function getParent
    (
        address parentAddress
    ) 
    public view returns
    (
        string parentName,
        uint256 parentDNA,
        uint parentAge,
        string planetOfBirth,
        address ally,
        address spouse
    )
    {
        return
        (
            bytes32ToString(db.getsString(parentAddress, 'parent_name')),
            db.getsUint(parentAddress, 'parent_dna'),
            (block.number - db.getsUint(parentAddress, 'parent_bob')),
            bytes32ToString(assets.metabytes(db.getsUint(parentAddress, 'parent_pob'), 'planet')),
            db.getsAddress(parentAddress, 'parent_ally'),
            db.getsAddress(parentAddress, 'parent_spouse')
        );
    }
    
    function getSalary() public view returns(uint)
    {
        return db.getUint('planet_salary');
    }
    
    function getParentBytes(address parentAddress) public view returns(bytes32)
    {
        return db.getsString(parentAddress, 'parent_name');
    }
    
    function updateParentName(string parentName) public
    {
        require(db.getsString(tx.origin, 'parent_name') != stringToBytes32(''));
        db.setsString(tx.origin, 'parent_name', stringToBytes32(parentName));
    }
    
    function getParentSpouse(address parentAddress) public view returns(address)
    {
        return db.getsAddress(parentAddress, 'parent_spouse');
    }
    
    function getMarried(address parent1, address parent2) public
    {
        require
        (
            activeFamilyAddress == msg.sender
            || activeFamilyAddress == tx.origin
        );
        db.setsAddress(parent1, 'parent_spouse', parent2);
        db.setsAddress(parent2, 'parent_spouse', parent1);
    }
    
    function updateMarriageStatus(address parent1, address parent2) public onlyOwner
    {
        db.setsAddress(parent1, 'parent_spouse', parent2);
        db.setsAddress(parent2, 'parent_spouse', parent1);
    }
    
    function getAlly(address parentAddress) public view returns(address)
    {
        return db.setsAddress(parentAddress, 'parent_ally');
    }
    
    function alliances(address ally1, address ally2) public
    {
        require
        (
            activePlayerAddress == msg.sender
            || activePlayerAddress == tx.origin
        );
        if(ally1 == ally2)
        {
            db.setsAddress(ally1, 'parent_ally', 0);
            db.setsAddress(ally2, 'parent_ally', 0);
        }
        else
        {
            db.setsAddress(ally1, 'parent_ally', ally2);
            db.setsAddress(ally2, 'parent_ally', ally1);
        }
    }
    
    function minimumParentDonation() public view returns(uint)
    {
        return db.getUint('parent_min_don');
    }
    
    function parentBlockIntervals() public view returns(uint)
    {
        return db.getUint('parent_block_int');
    }
    
    function blocksToGoUntilParentPriceIncrease() public view returns(uint)
    {
        uint this_block = block.number;
        uint checkpoint = db.getUint('parent_don_check');
        uint interval = db.getUint('parent_block_int');
        uint next_block = checkpoint + interval;
        if(this_block < next_block)
        {
            return next_block - this_block;
        }
        else
        {
            return 0;
        }
    }
}