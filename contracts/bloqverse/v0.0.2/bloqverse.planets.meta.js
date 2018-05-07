pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Main = 0x8e04937F5743094df7A79CC0Bd0862c00c8590Ec

// v0.0.2 = 0x9961035A3D91Cc4D7e7B0691306BB30d4076d173 = 0.77

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
    function totalSupply() public view returns (uint);
    function balanceOf(address) public view returns (uint);
    function tokenOfOwnerByIndex(address beneficiary, uint index) public view returns (uint);
    function ownerOf(uint tokenId) public view returns (address);
    function transferToken(address to, uint tokenId) public;
    function takeOwnership(uint tokenId) public;
    function approve(address beneficiary, uint tokenId) public;
    function metadata(uint256 tokenId) public view returns (string);
    function metabytes(uint256 tokenId) public view returns (bytes32);
    function mint(address beneficiary, uint256 id, string meta) external;
    function updateTokenMetadata(uint tokenId, string meta) public returns(bool);
}

contract PlanetMeta is Upgradable
{
    Proxy db;
    ERC721 tokens;
    
    function PlanetMeta
    (
        address proxyAddress,
        address tokenAddress,
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
        tokens = ERC721(tokenAddress);
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
    
    function updateProxy(address proxyAddress, address tokenAddress) public onlyOwner
    {
        db = Proxy(proxyAddress);
        tokens = ERC721(tokenAddress);
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
        db.setString('universe', stringToBytes32(UniverseName));
        db.setUint('coordinate_limit', CoordinateLimit);
        db.setUint('block_intervals', BlockIntervals);
        db.setUint('planet_price', WeiPerPlanet);
        db.setUint('min_donation', StartingWeiDonation);
        db.setAddress('donation_address', DonationAddress);
    }
    
    /*
    
    PLANET SPECIFIC FUNCTIONALITY
    
    */
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256)
    {
        string memory universe = bytes32ToString(db.getString('universe'));
        return uint256(keccak256(xCoordinate, '|', yCoordinate, '|', zCoordinate, '|', universe));
    }
    
    function generate_token(address beneficiary, uint256 id, string planetName) internal
    {
        tokens.mint(beneficiary, id, planetName);
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
        string memory universe = bytes32ToString(db.getString('universe'));
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        db.SetUint(id, 'planet_x', xCoordinate);
        db.SetUint(id, 'planet_y', yCoordinate);
        db.SetUint(id, 'planet_z', zCoordinate);
        db.SetUint(id, 'planet_d', uint256(keccak256(xCoordinate, '|x|', msg.sender, '|', universe)));
        db.SetUint(id, 'planet_n', uint256(keccak256(yCoordinate, '|y|', msg.sender, '|', universe)));
        db.SetUint(id, 'planet_a', uint256(keccak256(zCoordinate, '|z|', msg.sender, '|', universe)));
        db.SetUint(id, 'planet_cost', value);
        db.SetString(id, 'planet_liason', stringToBytes32(liason));
        db.SetString(id, 'planet_url', stringToBytes32(url));
        tokens.updateTokenMetadata(id, planetName);
    }
    
    function genesis
    (
        address beneficiary, 
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
        address donation_address = db.getAddress('donation_address');
        uint minimum_donation = db.getUint('min_donation');
        uint coordinate_limit = db.getUint('coordinate_limit');

        // Check required paramters
        require(tokens.ownerOf(id) == 0);
        require(msg.value >= minimum_donation);
        require(xCoordinate <= coordinate_limit);
        require(yCoordinate <= coordinate_limit);
        require(zCoordinate <= coordinate_limit);
        
        generate_token(beneficiary, id, planetName);
        generate_planet(xCoordinate, yCoordinate, zCoordinate, msg.value, planetName, liason, url);
        
        donation_address.transfer(msg.value);
        bumpDonations();
    }
    
    function bumpDonations() public
    {
        uint this_block = block.number;
        uint checkpoint = db.getUint('donation_checkpoint');
        uint interval = db.getUint('block_intervals');
        if(this_block > (checkpoint + interval))
        {
            uint ppp = db.getUint('planet_price');
            db.setUint('donation_checkpoint', this_block);
            db.setUint('min_donation', (ppp * tokens.totalSupply()));
        }
    }
    
    function getPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(
        uint x,
        uint y,
        uint z,
        uint d,
        uint n,
        uint a,
        uint cost,
        address beneficiary
    ){
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return(
            db.GetUint(id, 'planet_x'),
            db.GetUint(id, 'planet_y'),
            db.GetUint(id, 'planet_z'),
            db.GetUint(id, 'planet_d'),
            db.GetUint(id, 'planet_n'),
            db.GetUint(id, 'planet_a'),
            db.GetUint(id, 'planet_cost'),
            tokens.ownerOf(id)
        );
    }
    
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (bool) 
    {
        return ownerOfPlanet(xCoordinate, yCoordinate, zCoordinate) != 0;
    }

    function ownerOfPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (address) 
    {
        return tokens.ownerOf(uid(xCoordinate, yCoordinate, zCoordinate));
    }
    
    function updatePlanetName(uint xCoordinate, uint yCoordinate, uint zCoordinate, string planetName) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        tokens.updateTokenMetadata(id, planetName);
    }

    function updatePlanetLiason(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonName) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == tokens.ownerOf(id));
        db.SetString(id, 'planet_liason', stringToBytes32(LiasonName));
    }

    function updatePlanetURL(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonURL) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == tokens.ownerOf(id));
        db.SetString(id, 'planet_url', stringToBytes32(LiasonURL));
    }
    
    function getLiasonName(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string)
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(db.GetString(id, 'planet_liason'));
    }

    function getPlanetName(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string) 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(tokens.metabytes(id));
    }
    
    function getPlanetUrl(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string) 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(db.GetString(id, 'planet_url'));
    }
    
    function transferPlanet(address beneficiary, uint xCoordinate, uint yCoordinate, uint zCoordinate) public
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        tokens.transferToken(beneficiary, id);
    }
    
    function planetsDiscovered() public view returns(uint)
    {
        return tokens.totalSupply();
    }
    
    function planetsUndiscovered() public view returns(uint)
    {
        uint limit = db.getUint('coordinate_limit');
        return ((limit * limit * limit) - tokens.totalSupply());
    }
}