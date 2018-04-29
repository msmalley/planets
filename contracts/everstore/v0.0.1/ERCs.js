pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// V1.1 - Private = XXX = 1.1 Ether

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
    
    function toString(address x) public pure returns (string) 
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

library UsingSafeMaths
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

contract AddressProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, address value, address addressNull) public;
    function read(string key, address addressNull) public returns(address);
    function update(string key, address addressNull, address value) public;
    function destroy(string key, address addressNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, address value, address addressNull) public;
    function Read(uint256 key, address addressNull) public returns(address);
    function Update(uint256 key, address value, address addressNull) public;
    function Destroy(uint256 key, address addressNull) public;
    
    // Bytes32 Arrays
    function push(string key, address value, address addressNull) public;
    function pull(string key, uint index, address addressNull) public returns(address);
    function edit(string key, uint index, address addressNull, address value) public;
    function remove(string key, uint index, address addressNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, address value, address addressNull) public;
    function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function Edit(uint256 key, uint index, address value, address addressNull) public;
    function Remove(uint256 key, uint index, address addressNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, address value, address addressNull) public;
    function Set(uint256 key, address value, address addressNull) public;
    function Sets(uint256 key, string index, address value, address addressNull) public;
    function Reads(uint256 key, string index, address addressNull) public returns(address);
    function Removes(uint256 key, string index, address addressNull) public;
}

contract BoolProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, bool value, bool boolNull) public;
    function read(string key, bool boolNull) public returns(bool);
    function update(string key, bool value, bool boolNull) public;
    function destroy(string key, bool boolNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, bool value, bool boolNull) public;
    function Read(uint256 key, bool boolNull) public returns(bool);
    function Update(uint256 key, bool value, bool boolNull) public;
    function Destroy(uint256 key, bool boolNull) public;
    
    // Bytes32 Arrays
    function push(string key, bool value, bool boolNull) public;
    function pull(string key, uint index, bool boolNull) public returns(bool);
    function edit(string key, uint index, bool value, bool boolNull) public;
    function remove(string key, uint index, bool boolNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, bool value, bool boolNull) public;
    function Pull(uint256 key, uint index, bool boolNull) public returns(bool);
    function Edit(uint256 key, uint index, bool value, bool boolNull) public;
    function Remove(uint256 key, uint index, bool boolNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, bool value, bool boolNull) public;
    function Set(uint256 key, bool value, bool boolNull) public;
    function Sets(uint256 key, string index, bool value, bool boolNull) public;
    function Reads(uint256 key, string index, bool boolNull) public returns(bool);
    function Removes(uint256 key, string index, bool boolNull) public;
}

contract StringProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, bytes32 value, string stringNull) public;
    function read(string key, string stringNull) public returns(bytes32);
    function update(string key, bytes32 value, string stringNull) public;
    function destroy(string key, string stringNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, bytes32 value, string stringNull) public;
    function Read(uint256 key, string stringNull) public returns(bytes32);
    function Update(uint256 key, bytes32 value, string stringNull) public;
    function Destroy(uint256 key, string stringNull) public;
    
    // Bytes32 Arrays
    function push(string key, bytes32 value, string stringNull) public;
    function pull(string key, uint index, string stringNull) public returns(bytes32);
    function edit(string key, uint index, bytes32 value, string stringNull) public;
    function remove(string key, uint index, string stringNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, bytes32 value, string stringNull) public;
    function Pull(uint256 key, uint index, string stringNull) public returns(bytes32);
    function Edit(uint256 key, uint index, bytes32 value, string stringNull) public;
    function Remove(uint256 key, uint index, string stringNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, bytes32 value, string stringNull) public;
    function Set(uint256 key, bytes32 value, string stringNull) public;
    function Sets(uint256 key, string index, bytes32 value, string stringNull) public;
    function Reads(uint256 key, string index, string stringNull) public returns(bytes32);
    function Removes(uint256 key, string index, string stringNull) public;
}

contract UintProxy is Upgradable
{
    // Bytes32 Keys
    function create(string key, uint value, uint uintNull) public;
    function read(string key, uint uintNull) public returns(uint);
    function update(string key, uint value, uint uintNull) public;
    function destroy(string key, uint uintNull) public;
    
    // Uint256 Keys
    function Create(uint256 key, uint value, uint uintNull) public;
    function Read(uint256 key, uint uintNull) public returns(uint);
    function Update(uint256 key, uint value, uint uintNull) public;
    function Destroy(uint256 key, uint uintNull) public;
    
    // Bytes32 Arrays
    function push(string key, uint value, uint uintNull) public;
    function pull(string key, uint index, uint uintNull) public returns(uint);
    function edit(string key, uint index, uint value, uint uintNull) public;
    function remove(string key, uint index, uint uintNull) public;
    
    // Uint256 Arrays
    function Push(uint256 key, uint value, uint uintNull) public;
    function Pull(uint256 key, uint index, uint uintNull) public returns(uint);
    function Edit(uint256 key, uint index, uint value, uint uintNull) public;
    function Remove(uint256 key, uint index, uint uintNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(string key, uint value, uint uintNull) public;
    function Set(uint256 key, uint value, uint uintNull) public;
    function Sets(uint256 key, string index, uint value, uint uintNull) public;
    function Reads(uint256 key, string index, uint uintNull) public returns(uint);
    function Removes(uint256 key, string index, uint uintNull) public;
}

contract AddressesProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, address value, address addressNull) public;
    function read(address addressIndex, string key, address addressNull) public returns(address);
    function update(address addressIndex, string key, address value, address addressNull) public;
    function destroy(address addressIndex, string key, address addressNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, address value, address addressNull) public;
    function Read(address addressIndex, uint256 key, address addressNull) public returns(address);
    function Update(address addressIndex, uint256 key, address value, address addressNull) public;
    function Destroy(address addressIndex, uint256 key, address addressNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, address value, address addressNull) public;
    function pull(address addressIndex, string key, uint index, address addressNull) public returns(address);
    function edit(address addressIndex, string key, uint index, address value, address addressNull) public;
    function remove(address addressIndex, string key, uint index, address addressNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, address value, address addressNull) public;
    function Pull(address addressIndex, uint256 key, uint index, address addressNull) public returns(address);
    function Edit(address addressIndex, uint256 key, uint index, address value, address addressNull) public;
    function Remove(address addressIndex, uint256 key, uint index, address addressNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, address value, address addressNull) public;
    function Set(address addressIndex, uint256 key, address value, address addressNull) public;
    function Sets(address addressIndex, uint256 key, string index, address value, address addressNull) public;
    function Reads(address addressIndex, uint256 key, string index, address addressNull) public returns(address);
    function Removes(address addressIndex, uint256 key, string index, address addressNull) public;
}

contract BoolsProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, bool value, bool boolNull) public;
    function read(address addressIndex, string key, bool boolNull) public returns(bool);
    function update(address addressIndex, string key, bool value, bool boolNull) public;
    function destroy(address addressIndex, string key, bool boolNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Read(address addressIndex, uint256 key, bool boolNull) public returns(bool);
    function Update(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Destroy(address addressIndex, uint256 key, bool boolNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, bool value, bool boolNull) public;
    function pull(address addressIndex, string key, uint index, bool boolNull) public returns(bool);
    function edit(address addressIndex, string key, uint index, bool value, bool boolNull) public;
    function remove(address addressIndex, string key, uint index, bool boolNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Pull(address addressIndex, uint256 key, uint index, bool boolNull) public returns(bool);
    function Edit(address addressIndex, uint256 key, uint index, bool value, bool boolNull) public;
    function Remove(address addressIndex, uint256 key, uint index, bool boolNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, bool value, bool boolNull) public;
    function Set(address addressIndex, uint256 key, bool value, bool boolNull) public;
    function Sets(address addressIndex, uint256 key, string index, bool value, bool boolNull) public;
    function Reads(address addressIndex, uint256 key, string index, bool boolNull) public returns(bool);
    function Removes(address addressIndex, uint256 key, string index, bool boolNull) public;
}

contract StringsProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, bytes32 value, string stringNull) public;
    function read(address addressIndex, string key, string stringNull) public returns(bytes32);
    function update(address addressIndex, string key, bytes32 value, string stringNull) public;
    function destroy(address addressIndex, string key, string stringNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Read(address addressIndex, uint256 key, string stringNull) public returns(bytes32);
    function Update(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Destroy(address addressIndex, uint256 key, string stringNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, bytes32 value, string stringNull) public;
    function pull(address addressIndex, string key, uint index, string stringNull) public returns(bytes32);
    function edit(address addressIndex, string key, uint index, bytes32 value, string stringNull) public;
    function remove(address addressIndex, string key, uint index, string stringNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Pull(address addressIndex, uint256 key, uint index, string stringNull) public returns(bytes32);
    function Edit(address addressIndex, uint256 key, uint index, bytes32 value, string stringNull) public;
    function Remove(address addressIndex, uint256 key, uint index, string stringNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, bytes32 value, string stringNull) public;
    function Set(address addressIndex, uint256 key, bytes32 value, string stringNull) public;
    function Sets(address addressIndex, uint256 key, string index, bytes32 value, string stringNull) public;
    function Reads(address addressIndex, uint256 key, string index, string stringNull) public returns(bytes32);
    function Removes(address addressIndex, uint256 key, string index, string stringNull) public;
}

contract UintsProxy is Upgradable
{
    // Bytes32 Keys
    function create(address addressIndex, string key, uint value, uint uintNull) public;
    function read(address addressIndex, string key, uint uintNull) public returns(uint);
    function update(address addressIndex, string key, uint value, uint uintNull) public;
    function destroy(address addressIndex, string key, uint uintNull) public;
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Read(address addressIndex, uint256 key, uint uintNull) public returns(uint);
    function Update(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Destroy(address addressIndex, uint256 key, uint uintNull) public;
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, uint value, uint uintNull) public;
    function pull(address addressIndex, string key, uint index, uint uintNull) public returns(uint);
    function edit(address addressIndex, string key, uint index, uint value, uint uintNull) public;
    function remove(address addressIndex, string key, uint index, uint uintNull) public;
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Pull(address addressIndex, uint256 key, uint index, uint uintNull) public returns(uint);
    function Edit(address addressIndex, uint256 key, uint index, uint value, uint uintNull) public;
    function Remove(address addressIndex, uint256 key, uint index, uint uintNull) public;
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, uint value, uint uintNull) public;
    function Set(address addressIndex, uint256 key, uint value, uint uintNull) public;
    function Sets(address addressIndex, uint256 key, string index, uint value, uint uintNull) public;
    function Reads(address addressIndex, uint256 key, string index, uint uintNull) public returns(uint);
    function Removes(address addressIndex, uint256 key, string index, uint uintNull) public;
}
//

contract ERC721 is AddressProxy, BoolProxy, StringProxy, UintProxy, AddressesProxy, BoolsProxy, StringsProxy, UintsProxy
{
    function totalSupply() public returns (uint);
    function balanceOf(address) public returns (uint);
    function tokenOfOwnerByIndex(address owner, uint index) public returns (uint);
    function ownerOf(uint tokenId) public returns (address);
    function transfer(address to, uint tokenId) public;
    function takeOwnership(uint tokenId) public;
    function approve(address beneficiary, uint tokenId) public;
    function metadata(uint tokenId) public returns (string);
    event TokenCreated(uint tokenId, address owner, string metadata);
    event TokenDestroyed(uint tokenId, address owner);
    event TokenTransferred(uint tokenId, address from, address to);
    event TokenTransferAllowed(uint tokenId, address beneficiary);
    event TokenTransferDisallowed(uint tokenId, address beneficiary);
    event TokenMetadataUpdated(uint tokenId, address owner, string data);
}

contract InterplanetaryEmbassy is ERC721
{
    // PROXY SETUP
    AddressProxy Address;
    BoolProxy Bool;
    StringProxy _String;
    UintProxy Uint;
    AddressesProxy Addresses;
    BoolsProxy Bools;
    StringsProxy Strings;
    UintsProxy Uints;
    
    function InterplanetaryEmbassy(
        address proxyAddress,
        string UniverseName, 
        uint CoordinateLimit, 
        address DonationAddress, 
        uint StartingWeiDonation, 
        uint BlockIntervals, 
        uint WeiPerPlanet
    ) 
    public 
    {
        // Setup Proxies
        Address = AddressProxy(proxyAddress);
        Bool = BoolProxy(proxyAddress);
        _String = StringProxy(proxyAddress);
        Uint = UintProxy(proxyAddress);
        Addresses = AddressesProxy(proxyAddress);
        Bools = BoolsProxy(proxyAddress);
        Strings = StringsProxy(proxyAddress);
        Uints = UintsProxy(proxyAddress);
        
        string memory sNull; uint uNull; address aNull;
        
        // Contract variables
        _String.set('universe', stringToBytes32(UniverseName), sNull);
        Uint.set('min_donation', StartingWeiDonation, uNull);
        Uint.set('coordinate_limit', CoordinateLimit, uNull);
        Uint.set('block_intervals', BlockIntervals, uNull);
        Uint.set('planet_price', WeiPerPlanet, uNull);
        Address.set('donation_address', DonationAddress, aNull);
        
        // Donations
        address donation_address = Address.read('donation_address', aNull);
        Uints.set(donation_address, 'donation_start', Uint.read('min_donation', uNull), uNull);
        Uints.set(donation_address, 'donation_genesis', block.number, uNull);
        Uints.set(donation_address, 'donation_checkpoint', block.number, uNull);
        Uints.set(donation_address, 'donation_interval', Uint.read('block_intervals', uNull), uNull);
        Uints.set(donation_address, 'donation_ppp', Uint.read('planet_price', uNull), uNull);
        Uints.set(donation_address, 'donation_amount', Uint.read('min_donation', uNull), uNull);
    }
    
    function updateProxy(address proxyAddress) public onlyOwner
    {
        Address = AddressProxy(proxyAddress);
        Bool = BoolProxy(proxyAddress);
        _String = StringProxy(proxyAddress);
        Uint = UintProxy(proxyAddress);
        Addresses = AddressesProxy(proxyAddress);
        Bools = BoolsProxy(proxyAddress);
        Strings = StringsProxy(proxyAddress);
        Uints = UintsProxy(proxyAddress);
    }
    
    /*
    
    ERC721 FUNCTIONS
    
    */
    
    function totalSupply() public returns (uint) 
    {
        return Uint.read('total', 0);
    }

    function balanceOf(address beneficiary) public returns (uint) 
    {
        uint uintNull;
        return Uints.read(beneficiary, 'balance', uintNull);
    }

    function tokenOfOwnerByIndex(address beneficiary, uint index) public returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(beneficiary));        
        return Uints.pull(beneficiary, 'owned', index, 0);
    }

    function getAllTokens(address beneficiary) public returns (uint[]) 
    {
        uint size = Uints.read(beneficiary, 'balance', 0);
        uint[] memory result = new uint[](size);
        for (uint index = 0; index < size; index++) 
        {
            result[index] = Uints.pull(beneficiary, 'owned', index, 0);
        }
        return result;
    }

    function ownerOf(uint id) public returns (address) 
    {
        return Address.Reads(id, 'owner', 0);
    }

    function transfer(address to, uint id) public
    {
        require(
            Address.Reads(id, 'owner', 0) == msg.sender 
            || Address.Reads(id, 'allowed', 0) == msg.sender
        );
        _transfer(Address.Reads(id, 'owner', 0), to, id);
    }

    function takeOwnership(uint id) public 
    {
        require(Address.Reads(id, 'allowed', 0) == msg.sender);
        _transfer(Address.Reads(id, 'owner', 0), msg.sender, id);
    }

    function approve(address beneficiary, uint id) public 
    {
        require(Address.Reads(id, 'owner', 0) == msg.sender);
        if(Address.Reads(id, 'allowed', 0) != 0)
        {
            Address.Sets(id, 'allowed', 0, 0);
            emit TokenTransferDisallowed(id, Address.Reads(id, 'allowed', 0));
        }
        Address.Sets(id, 'allowed', beneficiary, 0);
        emit TokenTransferAllowed(id, beneficiary);
    }

    function metadata(uint256 id) public returns(string) 
    {
        return bytes32ToString(_String.Reads(id, 'meta', ''));
    }

    function updateTokenMetadata(uint id, string meta) internal returns(bool)
    {
        string memory sNull;
        require(Address.Reads(id, 'owner', 0) == msg.sender);
        _String.Sets(id, 'meta', stringToBytes32(meta), sNull);
        emit TokenMetadataUpdated(id, msg.sender, meta);
        return true;
    }

    function _transfer(address from, address to, uint id) internal returns(bool)
    {
        Address.Sets(id, 'allowed', 0, 0);
        _removeTokenFrom(from, id);
        _addTokenTo(to, id);
        emit TokenTransferred(id, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint id) internal 
    {
        require(Uints.read(from, 'balance', 0) > 0);
        uint length = Uints.read(from, 'balance', 0);
        uint index = Uint.Reads(id, 'index', 0);
        uint swapToken = Uints.pull(from, 'owned', length - 1, 0);
        Uints.update(from, 'owned', swapToken, 0);
        Uint.Sets(swapToken, 'index', index, 0);
        Uints.set(from, 'balance', Uints.read(from, 'balance', 0) - 1, 0);
    }

    function _addTokenTo(address beneficiary, uint id) internal 
    {
        uint length = Uints.read(beneficiary, 'balance', 0);
        Uints.push(beneficiary, 'owned', id, 0);
        Address.Sets(id, 'owner', beneficiary, 0);
        Uint.Sets(id, 'index', length, 0);
        Uints.set(beneficiary, 'balance', length + 1, 0);
    }
    
    /*
    
    PLANET SPECIFIC FUNCTIONALITY
    
    */
    
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public returns (uint256)
    {
        string memory sNull;
        string memory universe = bytes32ToString(_String.read('universe', sNull));
        return uint256(keccak256(xCoordinate, '|', yCoordinate, '|', zCoordinate, '|', universe));
    }
    
    function genesis
    (
        address beneficiary, 
        uint xCoordinate, 
        uint yCoordinate, 
        uint zCoordinate, 
        string name, 
        string liason, 
        string url
    ) 
    public payable 
    {
        uint uNull; string memory sNull; address aNull;
        
        // Check current fee
        uint MinimumDonation = Uints.read(donation_address, 'donation_amount', uNull);
        uint coordinate_limit = Uint.read('coordinate_limit', uNull);

        // Check required paramters
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(Address.Reads(id, 'owner', aNull) == 0);
        require(msg.value >= MinimumDonation);
        require(xCoordinate <= coordinate_limit);
        require(yCoordinate <= coordinate_limit);
        require(zCoordinate <= coordinate_limit);

        // Update token records
        _addTokenTo(beneficiary, id);
        Uint.set('total', Uint.read('total', uNull) + 1, uNull);
        _String.Sets(id, 'meta', stringToBytes32(name), sNull);

        // Save Planet
        Uint.Sets(id, 'planet_x', xCoordinate, uNull);
        Uint.Sets(id, 'planet_y', yCoordinate, uNull);
        Uint.Sets(id, 'planet_z', zCoordinate, uNull);
        Uint.Sets(id, 'planet_cost', msg.value, uNull);
        Uint.Sets(id, 'planet_index', Uint.read('total', uNull) - 1, uNull); // Effected by array removals?
        _String.Sets(id, 'planet_name', stringToBytes32(name), sNull);
        _String.Sets(id, 'planet_liason', stringToBytes32(liason), sNull);
        _String.Sets(id, 'planet_url', stringToBytes32(url), sNull);
        Address.Sets(id, 'planet_owner', beneficiary, aNull);

        // Finalize process
        emit TokenCreated(id, beneficiary, name);  
        Address.read('donation_address', 0).transfer(msg.value);

        // Update donation info
        uint this_block = block.number;
        address donation_address = Address.read('donation_address', 0);
        uint checkpoint = Uints.read(donation_address, 'donation_checkpoint', 0);
        uint interval = Uints.read(donation_address, 'donation_interval', 0);
        uint new_checkpoint = checkpoint + interval; 
        if(this_block > new_checkpoint)
        {
            uint ppp = Uints.read(donation_address, 'donation_ppp', 0);
            Uints.set(donation_address, 'donation_checkpoint', this_block, 0);
            Uints.set(donation_address, 'donation_amount', ppp + Uint.read('total', 0), 0);
        }
    }
    
    function MinimumDonation() public returns(uint)
    {
        address donation_address = Address.read('donation_address', 0);
        return Uints.read(donation_address, 'donation_amount', 0);
    }

    function BlocksToGo() public returns(uint)
    {
        uint this_block = block.number;
        address donation_address = Address.read('donation_address', 0);
        uint checkpoint = Uints.read(donation_address, 'donation_checkpoint', 0);
        uint interval = Uints.read(donation_address, 'donation_interval', 0);
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
    
    function getPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public returns(
        uint x,
        uint y,
        uint z,
        uint cost,
        uint index,
        bytes32 name,
        bytes32 liason,
        bytes32 url,
        address owner
    ){
        address aNull; string memory sNull; uint uNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return(
            Uint.Reads(id, 'planet_x', uNull),
            Uint.Reads(id, 'planet_y', uNull),
            Uint.Reads(id, 'planet_z', uNull),
            Uint.Reads(id, 'planet_cost', uNull),
            Uint.Reads(id, 'planet_index', uNull),
            _String.Reads(id, 'planet_name', sNull),
            _String.Reads(id, 'planet_liason', sNull),
            _String.Reads(id, 'planet_url', sNull),
            Address.Reads(id, 'planet_owner', aNull)
        );
    }
    
    function UpdateDonationAddress(address NewAddress) onlyOwner public
    {
        address aNull; uint uNull;
        address OldAddress = donation_address;
        Address.set('donation_address', NewAddress, aNull);
        address donation_address = Address.read('donation_address', aNull);
        Uints.set(donation_address, 'donation_start', Uints.read(OldAddress, 'donation_start', uNull), uNull);
        Uints.set(donation_address, 'donation_genesis', Uints.read(OldAddress, 'donation_genesis', uNull), uNull);
        Uints.set(donation_address, 'donation_checkpoint', Uints.read(OldAddress, 'donation_checkpoint', uNull), uNull);
        Uints.set(donation_address, 'donation_interval', Uints.read(OldAddress, 'donation_interval', uNull), uNull);
        Uints.set(donation_address, 'donation_ppp', Uints.read(OldAddress, 'donation_ppp', uNull), uNull);
        Uints.set(donation_address, 'donation_amount', Uints.read(OldAddress, 'donation_amount', uNull), uNull);
    }
    
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public returns (bool) 
    {
        return ownerOfPlanet(xCoordinate, yCoordinate, zCoordinate) != 0;
    }

    function ownerOfPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public returns (address) 
    {
        address aNull;
        return Address.Reads(uid(xCoordinate, yCoordinate, zCoordinate), 'owner', aNull);
    }
    
    function updatePlanetName(uint xCoordinate, uint yCoordinate, uint zCoordinate, string name) public 
    {
        string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        if(updateTokenMetadata(id, name))
        {
            _String.Sets(id, 'planet_name', stringToBytes32(name), sNull);
        }
    }

    function updatePlanetLiason(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonName) public 
    {
        address aNull; string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == Address.Reads(id, 'owner', aNull));
        _String.Sets(id, 'planet_liason', stringToBytes32(LiasonName), sNull);
    }

    function updatePlanetURL(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonURL) public 
    {
        address aNull; string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == Address.Reads(id, 'owner', aNull));
        _String.Sets(id, 'planet_url', stringToBytes32(LiasonURL), sNull);
    }
    
    function getLiasonName(uint xCoordinate, uint yCoordinate, uint zCoordinate) public returns(string)
    {
        string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(_String.Reads(id, 'planet_liason', sNull));
    }

    function getPlanetUrl(uint xCoordinate, uint yCoordinate, uint zCoordinate) public returns(string) 
    {
        string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(_String.Reads(id, 'planet_url', sNull));
    }
}