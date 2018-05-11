pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Main = 0x8e04937F5743094df7A79CC0Bd0862c00c8590Ec
// Private Test = 0x0c87C4132C11B273Db805876CA2d2f0BD60f4C24

// v0.0.2 = 0x6BF88EC4957b1b1946e23b7A03Acb0b007ED5dbD = 0.79

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
    function balanceOf(address beneficary, string optionalResource) public view returns(uint);
    function destroy(address target, uint amount, string optionalResource) public;
    function make(address beneficary, uint amount, string optionalResource) public;
}

contract PlanetTokens is Upgradable
{
    function donationAddress() public view returns(address);
}

contract UniversalMarkets is Upgradable
{
    Proxy db;
    ERC20 tokens;
    PlanetTokens planets;
    
    using SafeMath for uint;
    
    function() public payable
    {
        address donation_address = planets.donationAddress();
        donation_address.transfer(msg.value);
    }
    
    function UniversalMarkets
    (
        address proxyAddress,
        address tokenContractAddress,
        address planetContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        tokens = ERC20(tokenContractAddress);
        planets = PlanetTokens(planetContractAddress);
    }
    
    function updateProxy
    (
        address proxyAddress, 
        address tokenContractAddress,
        address planetContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        tokens = ERC20(tokenContractAddress);
        planets = PlanetTokens(planetContractAddress);
    }
    
    function atomicID(string atomicSymbol, string key) public pure returns(string)
    {
        return combine('atomic', '_', atomicSymbol, '_', key);
    }
    
    function atomicTypeCount() public view returns(uint)
    {
        return db.getUint('atom_type_count');
    }
    
    function atomicCount(string atomicSymbol) public view returns(uint)
    {
        return db.getUint(atomicID(atomicSymbol, 'atom_count'));
    }
    
    function atomCount() public view returns(uint)
    {
        return db.getUint('atom_count');
    }
    
    function addAtomicStructure(string atomicSymbol, string atomicName, uint atomicWeight, uint atomicPricePerKG) public onlyOwner
    {
        db.setString(atomicID(atomicSymbol, 'name'), stringToBytes32(atomicName));
        db.setUint(atomicID(atomicSymbol, 'weight'), atomicWeight);
        db.setUint(atomicID(atomicSymbol, 'price'), atomicPricePerKG);
        db.setString(atomicID(atomicSymbol, 'symbol'), stringToBytes32(atomicSymbol));
        db.setUint('atom_type_count', db.getUint('atom_type_count').add(1));
    }
    
    function updateAtomicPrice(string atomicSymbol, uint atomicPricePerKG) public
    {
        db.setUint(atomicID(atomicSymbol, 'price'), atomicPricePerKG);
    }
    
    function removeAtomicStructure(string atomicSymbol) public onlyOwner
    {
        db.setString(atomicID(atomicSymbol, 'name'), '');
        db.setUint(atomicID(atomicSymbol, 'weight'), 0);
        db.setUint(atomicID(atomicSymbol, 'price'), 0);
        db.setString(atomicID(atomicSymbol, 'symbol'), '');
        db.setUint('atom_type_count', db.getUint('atom_type_count').sub(1));
    }
    
    function atoms(string atomicSymbol) public view returns
    (
        string atomicName,
        uint atomicWeight,
        uint pricePerKG,
        uint universalSupply
    ){
        return(
            bytes32ToString(db.getString(atomicID(atomicSymbol, 'name'))),
            db.getUint(atomicID(atomicSymbol, 'weight')),
            db.getUint(atomicID(atomicSymbol, 'price')),
            db.getUint(atomicID(atomicSymbol, 'atom_count'))
        );
    }
    
    function getAtomicRate(string from, string to, uint amount) public view returns(uint)
    {
        uint from_price = db.getUint(atomicID(from, 'price')).mul(amount);
        uint to_price = db.getUint(atomicID(to, 'price'));
        return from_price.div(to_price);
    }
    
    function atomicConversion(string from, string to, uint amount) public
    {
        uint converted_amount = getAtomicRate(from, to, amount);
        uint balance_of_origin = tokens.balanceOf(tx.origin, bytes32ToString(db.getString(atomicID(from, 'name'))));
        require(balance_of_origin >= amount);
        db.setUint(atomicID(from, 'atom_count'), db.getUint(atomicID(from, 'atom_count')).sub(amount));
        db.setUint('atom_count', db.getUint('atom_count').sub(amount));
        tokens.destroy(tx.origin, amount, bytes32ToString(db.getString(atomicID(from, 'name'))));
        db.setUint(atomicID(to, 'atom_count'), db.getUint(atomicID(to, 'atom_count')).add(converted_amount));
        db.setUint('atom_count', db.getUint('atom_count').add(converted_amount));
        tokens.make(tx.origin, converted_amount, bytes32ToString(db.getString(atomicID(to, 'name'))));
    }
    
    function generateAtoms(string atomicSymbol, address beneficary, uint amount) public onlyOwner
    {
        tokens.make(beneficary, amount, bytes32ToString(db.getString(atomicID(atomicSymbol, 'name'))));
        db.setUint(atomicID(atomicSymbol, 'atom_count'), db.getUint(atomicID(atomicSymbol, 'atom_count')).add(amount));
        db.setUint('atom_count', db.getUint('atom_count').add(amount));
    }
}