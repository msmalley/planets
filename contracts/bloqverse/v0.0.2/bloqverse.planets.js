pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Main = 0x8e04937F5743094df7A79CC0Bd0862c00c8590Ec

// Interval = 15120
// Wei = 100000000000000
// Ether = 0.0001

// v0.0.2 = 0x0031c9E929C1D132dB5B0602CB2F4eC062345614 = 0.88
// v0.0.2 = XXX = 1.3

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
    function totalSupply(string optionalResource) public view returns (uint);
    function balanceOf(address beneficary, string optionalResource) public view returns (uint);
    function tokenOfOwnerByIndex(address beneficiary, uint index, string optionalResource) public view returns (uint);
    function ownerOf(uint tokenId, string optionalResource) public view returns (address);
    function transfer(address to, uint tokenId, string optionalResource) public;
    function takeOwnership(uint tokenId, string optionalResource) public;
    function approve(address beneficiary, uint tokenId, string optionalResource) public;
    function metadata(uint256 tokenId, string optionalResource) public view returns (string);
    function metabytes(uint256 tokenId, string optionalResource) public view returns (bytes32);
    function mint(address beneficiary, uint256 id, string meta, string optionalResource) external;
    function updateTokenMetadata(uint tokenId, string meta, string optionalResource) public returns(bool);
}

contract PlanetTokens is Upgradable
{
    Proxy db;
    ERC721 assets;
    
    string public name = 'Planet Tokens';
    string public symbol = 'PT';
    
    using SafeMath for uint;
    
    function token_id(string key) public pure returns(string)
    {
        return combine('planet', '_', key, '', '');
    }
    
    function() public payable
    {
        address donation_address = db.getAddress(token_id('donation'));
        donation_address.transfer(msg.value);
    }
    
    function PlanetTokens
    (
        address proxyAddress,
        address assetAddress,
        string UniverseName, 
        uint StartingWeiDonation, 
        uint CoordinateLimit, 
        uint BlockIntervals, 
        uint WeiPerPlanet, 
        address DonationAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
        assets = ERC721(assetAddress);
        setup_universe
        (
            UniverseName, 
            StartingWeiDonation, 
            CoordinateLimit, 
            BlockIntervals, 
            WeiPerPlanet, 
            DonationAddress
        );
    }
    
    function updateProxy(address proxyAddress, address assetAddress) public onlyOwner
    {
        db = Proxy(proxyAddress);
        assets = ERC721(assetAddress);
    }
    
    function setup_universe
    (
        string UniverseName, 
        uint StartingWeiDonation, 
        uint CoordinateLimit, 
        uint BlockIntervals, 
        uint WeiPerPlanet, 
        address DonationAddress
    ) 
    internal
    {
        db.setString(token_id('universe'), stringToBytes32(UniverseName));
        db.setUint(token_id('coord_limit'), CoordinateLimit);
        db.setUint(token_id('block_int'), BlockIntervals);
        db.setUint(token_id('price'), WeiPerPlanet);
        db.setUint(token_id('min_don'), StartingWeiDonation);
        db.setAddress(token_id('donation'), DonationAddress);
    }
    
    /*
    
    PLANET SPECIFIC FUNCTIONALITY
    
    */
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256)
    {
        string memory universe = bytes32ToString(db.getString(token_id('universe')));
        return uint256(keccak256(xCoordinate, '|', yCoordinate, '|', zCoordinate, '|', universe));
    }
    
    function generate_token(address beneficiary, uint256 id, string planetName) internal
    {
        assets.mint(beneficiary, id, planetName, 'planet');
    }
    
    function generate_planet
    (
        uint xCoordinate, 
        uint yCoordinate, 
        uint zCoordinate, 
        uint value, 
        string planetName, 
        string liason, 
        string url
    ) 
    internal
    {
        string memory universe = bytes32ToString(db.getString(token_id('universe')));
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        db.SetUint(id, token_id('x_coord'), xCoordinate);
        db.SetUint(id, token_id('y_coord'), yCoordinate);
        db.SetUint(id, token_id('z_coord'), zCoordinate);
        db.SetUint(id, token_id('d_life'), uint256(keccak256(xCoordinate, '|x|', msg.sender, '|', universe)));
        db.SetUint(id, token_id('n_life'), uint256(keccak256(yCoordinate, '|y|', msg.sender, '|', universe)));
        db.SetUint(id, token_id('a_life'), uint256(keccak256(zCoordinate, '|z|', msg.sender, '|', universe)));
        db.SetUint(id, token_id('cost'), value);
        db.SetString(id, token_id('liaison'), stringToBytes32(liason));
        db.SetString(id, token_id('url'), stringToBytes32(url));
        assets.updateTokenMetadata(id, planetName, 'planet');
    }
    
    function genesis
    (
        address beneficiary, 
        address returnAddress, 
        uint xCoordinate, 
        uint yCoordinate, 
        uint zCoordinate, 
        string planetName, 
        string liason, 
        string url
    ) 
    public payable 
    {
        // Variables required for require ...
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        address donation_address = db.getAddress(token_id('donation'));
        uint minimum_donation = db.getUint(token_id('min_don'));
        uint coordinate_limit = db.getUint(token_id('coord_limit'));

        // Check required paramters
        require(assets.ownerOf(id, 'planet') == 0);
        if(msg.value >= minimum_donation)
        {
            require(xCoordinate < coordinate_limit);
            require(yCoordinate < coordinate_limit);
            require(zCoordinate < coordinate_limit);

            generate_token(beneficiary, id, planetName);
            generate_planet(xCoordinate, yCoordinate, zCoordinate, msg.value, planetName, liason, url);

            donation_address.transfer(msg.value);
        }
        else
        {
            returnAddress.transfer(msg.value);
        }
        bumpDonations();
    }
    
    function bumpDonations() public
    {
        uint this_block = block.number;
        uint checkpoint = db.getUint(token_id('don_check'));
        uint interval = db.getUint(token_id('block_int'));
        if(this_block > (checkpoint + interval))
        {
            uint ppp = db.getUint(token_id('price'));
            db.setUint(token_id('don_check'), this_block);
            db.setUint(token_id('min_don'), (ppp * assets.totalSupply('planet')));
        }
    }
    
    function minimumDonation() public view returns(uint)
    {
        return db.getUint(token_id('min_don'));
    }
    
    function donationAddress() public view returns(address)
    {
        return db.getAddress(token_id('donation'));
    }
    
    function blockIntervals() public view returns(uint)
    {
        return db.getUint(token_id('block_int'));
    }
    
    function blocksToGo() public view returns(uint)
    {
        uint this_block = block.number;
        uint checkpoint = db.getUint(token_id('don_check'));
        uint interval = db.getUint(token_id('block_int'));
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
        uint d,
        uint n,
        uint a,
        uint age,
        string planetName,
        string ownerName,
        string ownerHome,
        address planetOwner
    ){
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return(
            db.GetUint(id, token_id('d_life')),
            db.GetUint(id, token_id('n_life')),
            db.GetUint(id, token_id('a_life')),
            getPlanetAge(xCoordinate, yCoordinate, zCoordinate),
            bytes32ToString(db.GetString(id, token_id('meta'))),
            bytes32ToString(db.GetString(id, token_id('liaison'))),
            bytes32ToString(db.GetString(id, token_id('url'))),
            assets.ownerOf(id, 'planet')
        );
    }
    
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (bool) 
    {
        return ownerOfPlanet(xCoordinate, yCoordinate, zCoordinate) != 0;
    }
    
    function universeBytes() public view returns (bytes32) 
    {
        return db.getString(token_id('universe'));
    }

    function ownerOfPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (address) 
    {
        return assets.ownerOf(uid(xCoordinate, yCoordinate, zCoordinate), 'planet');
    }
    
    function updatePlanetName(uint xCoordinate, uint yCoordinate, uint zCoordinate, string planetName) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        assets.updateTokenMetadata(id, planetName, 'planet');
    }

    function updatePlanetLiason(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonName) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == assets.ownerOf(id, 'planet'));
        db.SetString(id, token_id('liaison'), stringToBytes32(LiasonName));
    }

    function updatePlanetURL(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonURL) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == assets.ownerOf(id, 'planet'));
        db.SetString(id, token_id('url'), stringToBytes32(LiasonURL));
    }
    
    function getPlanetCost(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(uint) 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return db.GetUint(id, token_id('cost'));
    }
    
    function getPlanetAge(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(uint) 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return (block.number - db.GetUint(id, token_id('bob')));
    }
    
    function getPlanetCoordinates(uint256 id) public view returns
    (
        uint xCoordinate,
        uint yCoordinate,
        uint zCoordinate
    ) 
    {
        return(
            db.GetUint(id, token_id('x_coord')),
            db.GetUint(id, token_id('y_coord')),
            db.GetUint(id, token_id('z_coord'))
        );
    }
    
    function transferPlanet(address beneficiary, uint xCoordinate, uint yCoordinate, uint zCoordinate) public
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        assets.transfer(beneficiary, id, 'planet');
    }
    
    function planetsDiscovered() public view returns(uint)
    {
        return assets.totalSupply('planet');
    }
    
    function planetsUndiscovered() public view returns(uint)
    {
        uint limit = db.getUint(token_id('coord_limit'));
        return ((limit * limit * limit) - assets.totalSupply('planet'));
    }
}