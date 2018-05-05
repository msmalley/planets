pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 - Private = XXX = 1.1 Ether

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
    function read(string key, address addressNull) public view returns(address);
    function Read(uint256 key, address addressNull) public view returns(address);
    function Reads(uint256 key, string index, address addressNull) public view returns(address);
    function set(string key, address value, address addressNull) public;
    function Sets(uint256 key, string index, address value, address addressNull) public;
}

contract AddressesProxy is Upgradable
{
    
}

contract BoolProxy is Upgradable
{
    
}

contract BoolsProxy is Upgradable
{
    
}

contract StringProxy is Upgradable
{
    function read(string key, string stringNull) public view returns(bytes32);
    function Read(uint256 key, string stringNull) public view returns(bytes32);
    function Reads(uint256 key, string index, string stringNull) public view returns(bytes32);
    function set(string key, bytes32 value, string stringNull) public;
    function Sets(uint256 key, string index, bytes32 value, string stringNull) public;
}

contract StringsProxy is Upgradable
{
    
}

contract UintProxy is Upgradable
{
    function read(string key, uint uintNull) public view returns(uint256);
    function Reads(uint256 key, string index, uint uintNull) public view returns(uint256);
    function set(string key, uint256 value, uint uintNull) public;
    function Sets(uint256 key, string index, uint256 value, uint uintNull) public;
}

contract UintsProxy is Upgradable
{
    function pull(address addressIndex, string key, uint index, uint uintNull) public view returns(uint256);
    function read(address addressIndex, string key, uint uintNull) public returns (uint256);
    function set(address addressIndex, string key, uint256 value, uint uintNull) public;
    function Sets(address addressIndex, uint256 key, string index, uint256 value, uint uintNull) public;
    function push(address addressIndex, string key, uint256 value, uint uintNull) public;
    function update(address addressIndex, string key, uint index, uint uintNull) public;
}

contract ERC721 is Upgradable
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
    AddressesProxy Addresses;
    BoolProxy Bool;
    BoolsProxy Bools;
    UintProxy Uint;
    UintsProxy Uints;
    StringProxy _String;
    StringsProxy Strings;
    
    function InterplanetaryEmbassy(
        address proxyForAddress, 
        address proxyForAddresses, 
        address proxyForBool, 
        address proxyForBools, 
        address proxyForString, 
        address proxyForStrings, 
        address proxyForUint, 
        address proxyForUints
    ) 
    public 
    {
        updateProxy(proxyForAddress, proxyForAddresses, proxyForBool, proxyForBools, proxyForString, proxyForStrings, proxyForUint, proxyForUints);
    }
    
    function updateProxy(
        address proxyForAddress, 
        address proxyForAddresses, 
        address proxyForBool, 
        address proxyForBools, 
        address proxyForString, 
        address proxyForStrings, 
        address proxyForUint, 
        address proxyForUints
    ) public onlyOwner
    {
        Address = AddressProxy(proxyForAddress);
        Addresses = AddressesProxy(proxyForAddresses);
        Bool = BoolProxy(proxyForBool);
        Bools = BoolsProxy(proxyForBools);
        _String = StringProxy(proxyForString);
        Strings = StringsProxy(proxyForStrings);
        Uint = UintProxy(proxyForUint);
        Uints = UintsProxy(proxyForUints);
    }
    
    function setupUniverse(string UniverseName, uint StartingWeiDonation, uint CoordinateLimit, uint BlockIntervals, uint WeiPerPlanet, address DonationAddress) public onlyOwner
    {
        address aNull; string memory sNull; uint uNull; bytes32 bNull;
        require(_String.read('universe', sNull) != bNull);
        _String.set('universe', stringToBytes32(UniverseName), sNull);
        Uint.set('coordinate_limit', CoordinateLimit, uNull);
        Uint.set('block_intervals', BlockIntervals, uNull);
        Uint.set('planet_price', WeiPerPlanet, uNull);
        Uint.set('min_donation', StartingWeiDonation, uNull);
        Address.set('donation_address', DonationAddress, aNull);
    }
    
    function setupDonations() public onlyOwner
    {
        uint this_block = block.number;
        address aNull; uint uNull;
        address donation_address = Address.read('donation_address', aNull);
        require(Uints.read(donation_address, 'donation_start', uNull) != uNull);
        Uints.set(donation_address, 'donation_start', Uint.read('min_donation', uNull), uNull);
        Uints.set(donation_address, 'donation_genesis', this_block, uNull);
        Uints.set(donation_address, 'donation_checkpoint', this_block, uNull);
        Uints.set(donation_address, 'donation_interval', Uint.read('block_intervals', uNull), uNull);
        Uints.set(donation_address, 'donation_ppp', Uint.read('planet_price', uNull), uNull);
        Uints.set(donation_address, 'donation_amount', Uint.read('min_donation', uNull), uNull);
    }
    
    /*
    
    ERC721 FUNCTIONS
    
    */
    
    function totalSupply() public returns (uint) 
    {
        uint uintNull;
        return Uint.read('total', uintNull);
    }

    function balanceOf(address beneficiary) public returns (uint) 
    {
        uint uintNull;
        return Uints.read(beneficiary, 'balance', uintNull);
    }

    function tokenOfOwnerByIndex(address beneficiary, uint index) public returns (uint) 
    {
        uint uintNull;
        require(index >= 0);
        require(index < balanceOf(beneficiary));        
        return Uints.pull(beneficiary, 'owned', index, uintNull);
    }

    function getAllTokens(address beneficiary) public returns (uint[]) 
    {
        uint uintNull;
        uint size = Uints.read(beneficiary, 'balance', uintNull);
        uint[] memory result = new uint[](size);
        for (uint index = 0; index < size; index++) 
        {
            result[index] = Uints.pull(beneficiary, 'owned', index, uintNull);
        }
        return result;
    }

    function ownerOf(uint id) public returns (address) 
    {
        address addressNull;
        return Address.Reads(id, 'owner', addressNull);
    }

    function transfer(address to, uint id) public
    {
        address addressNull;
        require(
            Address.Reads(id, 'owner', addressNull) == msg.sender 
            || Address.Reads(id, 'allowed', addressNull) == msg.sender
        );
        _transfer(Address.Reads(id, 'owner', addressNull), to, id);
    }

    function takeOwnership(uint id) public 
    {
        address addressNull;
        require(Address.Reads(id, 'allowed', addressNull) == msg.sender);
        _transfer(Address.Reads(id, 'owner', addressNull), msg.sender, id);
    }

    function approve(address beneficiary, uint id) public 
    {
        address addressNull;
        require(Address.Reads(id, 'owner', addressNull) == msg.sender);
        if(Address.Reads(id, 'allowed', addressNull) != 0)
        {
            Address.Sets(id, 'allowed', 0, addressNull);
            emit TokenTransferDisallowed(id, Address.Reads(id, 'allowed', addressNull));
        }
        Address.Sets(id, 'allowed', beneficiary, addressNull);
        emit TokenTransferAllowed(id, beneficiary);
    }

    function metadata(uint256 id) public returns(string) 
    {
        string memory stringNull;
        return bytes32ToString(_String.Reads(id, 'meta', stringNull));
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
        address addressNull;
        Address.Sets(id, 'allowed', 0, addressNull);
        _removeTokenFrom(from, id);
        _addTokenTo(to, id);
        emit TokenTransferred(id, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint id) internal 
    {
        uint uintNull;
        require(Uints.read(from, 'balance', uintNull) > 0);
        uint length = Uints.read(from, 'balance', uintNull);
        uint index = Uint.Reads(id, 'index', uintNull);
        uint swapToken = Uints.pull(from, 'owned', length - 1, uintNull);
        Uints.update(from, 'owned', swapToken, uintNull);
        Uint.Sets(swapToken, 'index', index, uintNull);
        Uints.set(from, 'balance', Uints.read(from, 'balance', uintNull) - 1, uintNull);
    }

    function _addTokenTo(address beneficiary, uint id) internal 
    {
        uint uintNull; address addressNull;
        uint length = Uints.read(beneficiary, 'balance', uintNull);
        Uints.push(beneficiary, 'owned', id, uintNull);
        Address.Sets(id, 'owner', beneficiary, addressNull);
        Uint.Sets(id, 'index', length, uintNull);
        Uints.set(beneficiary, 'balance', length + 1, uintNull);
    }
    
    /*
    
    PLANET SPECIFIC FUNCTIONALITY
    
    */
    
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256)
    {
        string memory sNull;
        string memory universe = bytes32ToString(_String.read('universe', sNull));
        return uint256(keccak256(xCoordinate, '|', yCoordinate, '|', zCoordinate, '|', universe));
    }
    
    function generate_token(address beneficiary, uint256 id, string name) internal
    {
        string memory sNull; uint uNull;
        _addTokenTo(beneficiary, id);
        Uint.set('total', Uint.read('total', uNull) + 1, uNull);
        _String.Sets(id, 'meta', stringToBytes32(name), sNull);
        emit TokenCreated(id, beneficiary, name);  
    }
    
    function generate_planet(
        uint xCoordinate, 
        uint yCoordinate, 
        uint zCoordinate, 
        uint value, 
        string name, 
        string liason, 
        string url
    ) 
    internal
    {
        string memory sNull; uint uNull;
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        Uint.Sets(id, 'planet_x', xCoordinate, uNull);
        Uint.Sets(id, 'planet_y', yCoordinate, uNull);
        Uint.Sets(id, 'planet_z', zCoordinate, uNull);
        Uint.Sets(id, 'planet_cost', value, uNull);
        _String.Sets(id, 'planet_name', stringToBytes32(name), sNull);
        _String.Sets(id, 'planet_liason', stringToBytes32(liason), sNull);
        _String.Sets(id, 'planet_url', stringToBytes32(url), sNull);
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
        // Variables required for require ...
        address aNull; uint uNull; 
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        address donation_address = Address.read('donation_address', aNull);
        uint minimum_donation = Uints.read(donation_address, 'donation_amount', uNull);
        uint coordinate_limit = Uint.read('coordinate_limit', uNull);

        // Check required paramters
        require(Address.Reads(id, 'owner', aNull) == 0);
        require(msg.value >= minimum_donation);
        require(xCoordinate <= coordinate_limit);
        require(yCoordinate <= coordinate_limit);
        require(zCoordinate <= coordinate_limit);
        
        address(donation_address).transfer(msg.value);
        
        generate_token(beneficiary, id, name);
        generate_planet(xCoordinate, yCoordinate, zCoordinate, msg.value, name, liason, url);
        Address.Sets(id, 'planet_owner', beneficiary, aNull);
        
        bumpDonations();
    }
    
    function bumpDonations() public
    {
        address aNull; uint uNull;
        uint this_block = block.number;
        address donation_address = Address.read('donation_address', aNull);
        uint checkpoint = Uints.read(donation_address, 'donation_checkpoint', uNull);
        uint interval = Uints.read(donation_address, 'donation_interval', uNull);
        if(this_block > (checkpoint + interval))
        {
            uint ppp = Uints.read(donation_address, 'donation_ppp', uNull);
            Uints.set(donation_address, 'donation_checkpoint', this_block, uNull);
            Uints.set(donation_address, 'donation_amount', (ppp * Uint.read('total', uNull)), uNull);
        }
    }
    
    function MinimumDonation() public returns(uint)
    {
        address addressNull; uint uintNull;
        address donation_address = Address.read('donation_address', addressNull);
        return Uints.read(donation_address, 'donation_amount', uintNull);
    }

    function BlocksToGo() public returns(uint)
    {
        uint uintNull; address addressNull;
        uint this_block = block.number;
        address donation_address = Address.read('donation_address', addressNull);
        uint checkpoint = Uints.read(donation_address, 'donation_checkpoint', uintNull);
        uint interval = Uints.read(donation_address, 'donation_interval', uintNull);
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
    
    function getPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(
        uint x,
        uint y,
        uint z,
        uint cost,
        address owner
    ){
        address aNull; uint uNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return(
            Uint.Reads(id, 'planet_x', uNull),
            Uint.Reads(id, 'planet_y', uNull),
            Uint.Reads(id, 'planet_z', uNull),
            Uint.Reads(id, 'planet_cost', uNull),
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
    
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (bool) 
    {
        return ownerOfPlanet(xCoordinate, yCoordinate, zCoordinate) != 0;
    }

    function ownerOfPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (address) 
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
    
    function getLiasonName(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string)
    {
        string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(_String.Reads(id, 'planet_liason', sNull));
    }

    function getPlanetUrl(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string) 
    {
        string memory sNull;
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(_String.Reads(id, 'planet_url', sNull));
    }
}