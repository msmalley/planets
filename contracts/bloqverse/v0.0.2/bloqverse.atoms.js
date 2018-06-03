pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96

// bloq002 = 0xa32379a505c1c83e19aBbCb6b7624f728bC64540

// Periodic element list:
// https://www.science.co.il/elements/

// Periodic Prices:
// https://en.wikipedia.org/wiki/Prices_of_elements_and_their_compounds

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
    function destroyTokens(address target, uint amount, string optionalResource) public;
    function makeTokens(address beneficary, uint amount, string optionalResource) public;
    function transfer(address to, uint units, string optionalResource) public returns (bool success);
    function totalSupply(string optionalResource) public constant returns (uint);
}

contract Atoms is Upgradable
{
    Proxy db;
    ERC20 tokens;
    
    using SafeMath for uint;
    
    address public centralBank;
    
    mapping(address => bool) canWriteToAtoms;
    
    function() public payable
    {
        revert();
    }
    
    function addWriteAddress(address Address) public onlyOwner
    {
        require(canWriteToAtoms[Address] == false);
        canWriteToAtoms[Address] = true;
    }
    
    function removeWriteAddress(address Address) public onlyOwner
    {
        require(canWriteToAtoms[Address] == true);
        canWriteToAtoms[Address] = false;
    }
    
    function Atoms
    (
        address proxyAddress,
        address tokenContractAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        tokens = ERC20(tokenContractAddress);
        centralBank = proxyAddress;
    }
    
    function updateProxy
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        centralBank = proxyAddress;
    }
    
    function updateTokens
    (
        address tokenContractAddress
    ) 
    public onlyOwner
    {
        tokens = ERC20(tokenContractAddress);
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
        return tokens.totalSupply(atomName(atomicSymbol));
    }
    
    function atomicBalance(address Address, string atomicSymbol) public view returns(uint)
    {
        return tokens.balanceOf(Address, atomName(atomicSymbol));
    }
    
    function atomCount() public view returns(uint)
    {
        return db.getUint('atom_count');
    }
    
    function addAtomicStructure(string atomicSymbol, string atomicName, uint atomicIndex, uint atomicWeight, uint atomicPricePerKG) public onlyOwner
    {
        db.setString(atomicID(atomicSymbol, 'name'), stringToBytes32(atomicName));
        db.setString(atomicID(uintToString(atomicIndex), 'index'), stringToBytes32(atomicSymbol));
        db.setUint(atomicID(atomicSymbol, 'weight'), atomicWeight);
        db.setUint(atomicID(atomicSymbol, 'index'), atomicIndex);
        db.setUint(atomicID(atomicSymbol, 'price'), atomicPricePerKG);
        db.setString(atomicID(atomicSymbol, 'symbol'), stringToBytes32(atomicSymbol));
        db.setUint('atom_type_count', db.getUint('atom_type_count').add(1));
    }
    
    // Temporary function to retro-fit old data ...
    function updateAtomicIndex(string atomicSymbol, uint atomicIndex) public
    {
        db.setString(atomicID(uintToString(atomicIndex), 'index'), stringToBytes32(atomicSymbol));
        db.setUint(atomicID(atomicSymbol, 'index'), atomicIndex);
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

    function atomName(string atomicSymbol) public view returns(string)
    {
        return bytes32ToString(atomNameBytes(atomicSymbol));
    }
    
    function atomNameBytes(string atomicSymbol) public view returns(bytes32)
    {
        return db.getString(atomicID(atomicSymbol, 'name'));
    }
    
    function atomIndex(string atomicSymbol) public view returns(uint)
    {
        return db.getUint(atomicID(atomicSymbol, 'index'));
    }
    
    function atomSymbol(string atomicIndex) public view returns(string)
    {
        return bytes32ToString(atomSymbolBytes(atomicIndex));
    }
    
    function atomSymbolBytes(string atomicIndex) public view returns(bytes32)
    {
        string memory symbol = bytes32ToString(db.getString(atomicID(atomicIndex, 'index')));
        return db.getString(atomicID(symbol, 'symbol'));
    }
    
    function atomPrice(string atomicSymbol) public view returns(uint)
    {
        return db.getUint(atomicID(atomicSymbol, 'price'));
    }
    
    function atomWeight(string atomicSymbol) public view returns(uint)
    {
        return db.getUint(atomicID(atomicSymbol, 'weight'));
    }
        
    function atoms(string atomicSymbol) public view returns
    (
        string atomicName,
        uint atomicIndex,
        uint atomicWeight,
        uint pricePerKG,
        uint universalSupply
    ){
        return(
            atomName(atomicSymbol),
            atomIndex(atomicSymbol),
            atomWeight(atomicSymbol),
            atomPrice(atomicSymbol),
            atomicCount(atomicSymbol)
        );
    }
    
    function getAtomicRate(string from, string to, uint amount) public view returns(uint)
    {
        uint weight = atomWeight(from).mul(amount);
        return weight.div(atomWeight(to));
    }
    
    function buyAtomsFromCentralBank(string atomicSymbol, uint amount) public returns(uint cost)
    {
        cost = atomPrice(atomicSymbol).mul(amount);
        uint weight = atomWeight(atomicSymbol).mul(amount);
        require(tokens.balanceOf(tx.origin, 'CT') >= cost);
        require(tokens.balanceOf(centralBank, 'NRG') >= weight);
        require(tokens.transfer(centralBank, cost, 'CT') == true);
        reatomize(tx.origin, centralBank, atomicSymbol, amount);
    }
    
    function sellAtomsToCentralBank(string atomicSymbol, uint amount) public returns(uint credits)
    {
        uint balance = tokens.balanceOf(tx.origin, atomName(atomicSymbol));
        uint price = atomPrice(atomicSymbol).mul(amount);
        require(balance >= amount);
        deatomize(tx.origin, centralBank, atomicSymbol, amount);
        tokens.makeTokens(tx.origin, price, 'CT');
        return price;
    }
    
    function centralBankBalance() public view returns(uint)
    {
        return tokens.balanceOf(centralBank, 'CT');
    }
    
    function creditBalance(address Address) public view returns(uint)
    {
        return tokens.balanceOf(Address, 'CT');
    }
    
    function totalCreditSupply() public view returns(uint)
    {
        return tokens.totalSupply('CT');
    }
    
    function atomicSwap(string from, string to, uint amount) public
    {
        // Temp hack ???
        if(stringToBytes32(to) == stringToBytes32(toString(centralBank)))
        {
            // convert from central dust to atoms
            require(msg.sender != tx.origin);
            require(canWriteToAtoms[msg.sender] == true);
            reatomize(tx.origin, centralBank, from, amount);
        }
        else
        {
            // Check accounts ...
            uint balance_of_origin = tokens.balanceOf(tx.origin, atomName(from));
            uint converted_amount = getAtomicRate(from, to, amount);
            require(balance_of_origin >= amount);
            require(converted_amount >= 1);

            if(stringToBytes32(from) == stringToBytes32(to))
            {
                // convert from atom to dust
                deatomize(tx.origin, centralBank, from, amount);
            }
            else
            {
                // convert from atom to dust
                deatomize(tx.origin, tx.origin, from, amount);

                // convert from dust to atom
                reatomize(tx.origin, tx.origin, to, converted_amount);
            }
        }
    }
    
    function getNRG(address Address) public view returns(uint)
    {
        return tokens.balanceOf(Address, 'NRG');
    }
    
    function totalHarnessedNRG() public view returns(uint)
    {
        return tokens.totalSupply('NRG');
    }
    
    /*

    TEMPORARY ADMIN RIGHTS
    
    */
    
    function generateAtoms(string atomicSymbol, address beneficary, uint amount) public onlyOwner
    {
        tokens.makeTokens(beneficary, amount, atomName(atomicSymbol));
        db.setUint('atom_count', db.getUint('atom_count').add(amount));
    }
    
    /*

    INTERNALS
    
    */
    
    function deatomize(address Address, address energyAddress, string from, uint amount) internal
    {
        uint weight = atomWeight(from).mul(amount);
        atomicDestruction(Address, from, amount);
        tokens.makeTokens(energyAddress, weight, 'NRG');
    }
    
    function reatomize(address Address, address energyAddress, string to, uint amount) internal
    {
        uint weight = atomWeight(to).mul(amount);
        atomicCreation(Address, to, amount);
        tokens.destroyTokens(energyAddress, weight, 'NRG');
    }
    
    function atomicCreation(address Address, string to, uint amount) internal
    {
        db.setUint('atom_count', atomCount().add(amount));
        tokens.makeTokens(Address, amount, atomName(to));
    }
    
    function atomicDestruction(address Address, string from, uint amount) internal
    {
        db.setUint('atom_count', atomCount().sub(amount));
        tokens.destroyTokens(Address, amount, atomName(from));
    }
}