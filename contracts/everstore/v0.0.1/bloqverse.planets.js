pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x6caa5A9a3482A11Cf02d7dCe055F38F9A181AF22 = 0.31

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

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

contract Planets is ERC721
{
    Proxy db;
    
    function Planets
    (
        address proxyAddress,
        string UniverseName, 
        uint StartingWeiDonation, 
        uint CoordinateLimit, 
        uint BlockIntervals, 
        uint WeiPerPlanet, 
        address DonationAddress
    ) 
    public
    {
        updateProxy(proxyAddress);
        setup_donations();
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
    
    function updateProxy(address proxyAddress) public
    {
        db = Proxy(proxyAddress);
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
    internal onlyOwner
    {
        db.setString('universe', stringToBytes32(UniverseName));
        db.setUint('coordinate_limit', CoordinateLimit);
        db.setUint('block_intervals', BlockIntervals);
        db.setUint('planet_price', WeiPerPlanet);
        db.setUint('min_donation', StartingWeiDonation);
        db.setAddress('donation_address', DonationAddress);
    }
    
    function setup_donations() internal onlyOwner
    {
        address donation_address = db.getAddress('donation_address');
        require(db.getsUint(donation_address, 'donation_start') != 0);
        db.setsUint(donation_address, 'donation_start', db.getUint('min_donation'));
        db.setsUint(donation_address, 'donation_genesis', block.number);
        db.setsUint(donation_address, 'donation_checkpoint', block.number);
        db.setsUint(donation_address, 'donation_interval', db.getUint('block_intervals'));
        db.setsUint(donation_address, 'donation_ppp', db.getUint('planet_price'));
        db.setsUint(donation_address, 'donation_amount', db.getUint('min_donation'));
    }
    
    /*
    
    ERC721 FUNCTIONS
    
    */
    function totalSupply() public returns (uint) 
    {
        return db.getUint('total');
    }

    function balanceOf(address beneficiary) public returns (uint) 
    {
        return db.getsUint(beneficiary, 'balance');
    }

    function tokenOfOwnerByIndex(address beneficiary, uint index) public returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(beneficiary));
        string memory uid = combine('owned', '_', uintToString(index), '', '');
        return db.getsUint(beneficiary, uid);
    }

    function getAllTokens(address beneficiary) public view returns (uint[]) 
    {
        uint size = db.getsUint(beneficiary, 'balance');
        uint[] memory result = new uint[](size);
        for (uint index = 0; index < size; index++) 
        {
            string memory uid = combine('owned', '_', uintToString(index), '', '');
            result[index] = db.getsUint(beneficiary, uid);
        }
        return result;
    }

    function ownerOf(uint id) public returns (address) 
    {
        return db.GetAddress(id, 'owner');
    }

    function transfer(address to, uint id) public
    {
        require(
            db.GetAddress(id, 'owner') == msg.sender 
            || db.GetAddress(id, 'allowed') == msg.sender
        );
        _transfer(db.GetAddress(id, 'owner'), to, id);
    }

    function takeOwnership(uint id) public 
    {
        require(db.GetAddress(id, 'allowed') == msg.sender);
        _transfer(db.GetAddress(id, 'owner'), msg.sender, id);
    }

    function approve(address beneficiary, uint id) public 
    {
        require(db.GetAddress(id, 'owner') == msg.sender);
        if(db.GetAddress(id, 'allowed') != 0)
        {
            db.SetAddress(id, 'allowed', 0);
            emit TokenTransferDisallowed(id, db.GetAddress(id, 'allowed'));
        }
        db.SetAddress(id, 'allowed', beneficiary);
        emit TokenTransferAllowed(id, beneficiary);
    }

    function metadata(uint256 id) public returns(string) 
    {
        return bytes32ToString(db.GetString(id, 'meta'));
    }

    function updateTokenMetadata(uint id, string meta) internal returns(bool)
    {
        require(db.GetAddress(id, 'owner') == msg.sender);
        db.SetString(id, 'meta', stringToBytes32(meta));
        emit TokenMetadataUpdated(id, msg.sender, meta);
        return true;
    }

    function _transfer(address from, address to, uint id) internal returns(bool)
    {
        db.SetAddress(id, 'allowed', 0);
        _removeTokenFrom(from, id);
        _addTokenTo(to, id);
        emit TokenTransferred(id, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint id) internal 
    {
        require(db.getsAddress(from, 'balance') > 0);
        uint length = db.getsUint(from, 'balance');
        uint index = db.GetUint(id, 'index');
        string memory uid = combine('owned', '_', uintToString(length - 1), '', '');
        uint swapToken = db.getsUint(from, uid);
        db.setsUint(from, uid, 0);
        db.SetUint(swapToken, 'index', index);
        db.setsUint(from, 'balance', db.getsUint(from, 'balance') - 1);
    }

    function _addTokenTo(address beneficiary, uint id) internal 
    {
        uint length = db.getsUint(beneficiary, 'balance');
        string memory uid = combine('owned', '_', uintToString(length), '', '');
        db.setsUint(beneficiary, uid, id);
        db.SetAddress(id, 'owner', beneficiary);
        db.SetUint(id, 'index', length);
        db.setsUint(beneficiary, 'balance', length + 1);
    }
    
    /*
    
    PLANET SPECIFIC FUNCTIONALITY
    
    */
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256)
    {
        string memory universe = bytes32ToString(db.getString('universe'));
        return uint256(keccak256(xCoordinate, '|', yCoordinate, '|', zCoordinate, '|', universe));
    }
    
    function generate_token(address beneficiary, uint256 id, string name) internal
    {
        _addTokenTo(beneficiary, id);
        db.setUint('total', db.getUint('total') + 1);
        db.SetString(id, 'meta', stringToBytes32(name));
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
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        db.SetUint(id, 'planet_x', xCoordinate);
        db.SetUint(id, 'planet_y', yCoordinate);
        db.SetUint(id, 'planet_z', zCoordinate);
        db.SetUint(id, 'planet_cost', value);
        db.SetString(id, 'planet_name', stringToBytes32(name));
        db.SetString(id, 'planet_liason', stringToBytes32(liason));
        db.SetString(id, 'planet_url', stringToBytes32(url));
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
        uint256 id = uid(xCoordinate, yCoordinate, zCoordinate);
        address donation_address = db.getAddress('donation_address');
        uint minimum_donation = db.getsUint(donation_address, 'donation_amount');
        uint coordinate_limit = db.getUint('coordinate_limit');

        // Check required paramters
        require(db.GetAddress(id, 'owner') == 0);
        require(msg.value >= minimum_donation);
        require(xCoordinate <= coordinate_limit);
        require(yCoordinate <= coordinate_limit);
        require(zCoordinate <= coordinate_limit);
        
        address(donation_address).transfer(msg.value);
        
        generate_token(beneficiary, id, name);
        generate_planet(xCoordinate, yCoordinate, zCoordinate, msg.value, name, liason, url);
        db.SetAddress(id, 'planet_owner', beneficiary);
        
        bumpDonations();
    }
    
    function bumpDonations() public
    {
        uint this_block = block.number;
        address donation_address = db.getAddress('donation_address');
        uint checkpoint = db.getsUint(donation_address, 'donation_checkpoint');
        uint interval = db.getsUint(donation_address, 'donation_interval');
        if(this_block > (checkpoint + interval))
        {
            uint ppp = db.getsUint(donation_address, 'donation_ppp');
            db.setsUint(donation_address, 'donation_checkpoint', this_block);
            db.setsUint(donation_address, 'donation_amount', (ppp * db.getUint('total')));
        }
    }
    
    function MinimumDonation() public view returns(uint)
    {
        address donation_address = db.getAddress('donation_address');
        return db.getsUint(donation_address, 'donation_amount');
    }

    function BlocksToGo() public view returns(uint)
    {
        uint this_block = block.number;
        address donation_address = db.getAddress('donation_address');
        uint checkpoint = db.getsUint(donation_address, 'donation_checkpoint');
        uint interval = db.getsUint(donation_address, 'donation_interval');
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
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return(
            db.GetUint(id, 'planet_x'),
            db.GetUint(id, 'planet_y'),
            db.GetUint(id, 'planet_z'),
            db.GetUint(id, 'planet_cost'),
            db.GetAddress(id, 'planet_owner')
        );
    }
    
    function UpdateDonationAddress(address NewAddress) onlyOwner public
    {
        address old_address = db.getAddress('donation_address');
        db.setAddress('donation_address', NewAddress);
        db.setsUint(NewAddress, 'donation_start', db.getsUint(old_address, 'donation_start'));
        db.setsUint(NewAddress, 'donation_genesis', db.getsUint(old_address, 'donation_genesis'));
        db.setsUint(NewAddress, 'donation_checkpoint', db.getsUint(old_address, 'donation_checkpoint'));
        db.setsUint(NewAddress, 'donation_interval', db.getsUint(old_address, 'donation_interval'));
        db.setsUint(NewAddress, 'donation_ppp', db.getsUint(old_address, 'donation_ppp'));
        db.setsUint(NewAddress, 'donation_amount', db.getsUint(old_address, 'donation_amount'));
    }
    
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (bool) 
    {
        return ownerOfPlanet(xCoordinate, yCoordinate, zCoordinate) != 0;
    }

    function ownerOfPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (address) 
    {
        return db.GetAddress(uid(xCoordinate, yCoordinate, zCoordinate), 'owner');
    }
    
    function updatePlanetName(uint xCoordinate, uint yCoordinate, uint zCoordinate, string name) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        if(updateTokenMetadata(id, name))
        {
            db.SetString(id, 'planet_name', stringToBytes32(name));
        }
    }

    function updatePlanetLiason(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonName) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == db.GetAddress(id, 'owner'));
        db.SetString(id, 'planet_liason', stringToBytes32(LiasonName));
    }

    function updatePlanetURL(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonURL) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == db.GetAddress(id, 'owner'));
        db.SetString(id, 'planet_url', stringToBytes32(LiasonURL));
    }
    
    function getLiasonName(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string)
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(db.GetString(id, 'planet_liason'));
    }

    function getPlanetUrl(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns(string) 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return bytes32ToString(db.GetString(id, 'planet_url'));
    }
}