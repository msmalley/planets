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

contract ERC721WalletInterface is Upgradable
{
    function totalSupply() public constant returns (uint);
    function balanceOf(address) public constant returns (uint);
    function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint);
    function ownerOf(uint tokenId) public constant returns (address);
    function transfer(address to, uint tokenId) public;
    function takeOwnership(uint tokenId) public;
    function approve(address beneficiary, uint tokenId) public;
    function metadata(uint tokenId) public constant returns (string);
    event TokenCreated(uint tokenId, address owner, string metadata);
    event TokenDestroyed(uint tokenId, address owner);
    event TokenTransferred(uint tokenId, address from, address to);
    event TokenTransferAllowed(uint tokenId, address beneficiary);
    event TokenTransferDisallowed(uint tokenId, address beneficiary);
    event TokenMetadataUpdated(uint tokenId, address owner, string data);
}

/* 

Extensible Wallet Interface 

*/
contract Extensible is ERC721WalletInterface
{
    // Get data via string (bytes32 limit) keys ...
    function getAddress(string key) public view returns(address);
    function getBool(string key) public view returns(bool);
    function getString(string key) public view returns(bytes32);
    function getRealString(string key) public view returns(string);
    function getUint(string key) public view returns(uint);
    
    // Get data via uint256 keys ...
    function GetAddress(uint256 key) public view returns(address);
    function GetBool(uint256 key) public view returns(bool);
    function GetString(uint256 key) public view returns(bytes32);
    function GetRealString(uint256 key) public view returns(string);
    function GetUint(uint256 key) public view returns(uint);
    
    // Get data via uint256 and string (bytes32 limit) combined keys ...
    function GetKeyedAddress(uint256 id, string key) public view returns(address);
    function GetKeyedBool(uint256 id, string key) public view returns(bool);
    function GetKeyedString(uint256 id, string key) public view returns(bytes32);
    function GetKeyedRealString(uint256 id, string key) public view returns(string);
    function GetKeyedUint(uint256 id, string key) public view returns(uint);
    
    // Get addressed data via string (bytes32 limit) keys ...
    function getAddressedAddress(address addressIndex, string key) public view returns(address);
    function getAddressedBool(address addressIndex, string key) public view returns(bool);
    function getAddressedString(address addressIndex, string key) public view returns(bytes32);
    function getAddressedRealString(address addressIndex, string key) public view returns(string);
    function getAddressedUint(address addressIndex, string key) public view returns(uint);
    
    // Get addressed data via uint256 keys ...
    function GetAddressedAddress(address addressIndex, uint256 key) public view returns(address);
    function GetAddressedBool(address addressIndex, uint256 key) public view returns(bool);
    function GetAddressedString(address addressIndex, uint256 key) public view returns(bytes32);
    function GetAddressedRealString(address addressIndex, uint256 key) public view returns(string);
    function GetAddressedUint(address addressIndex, uint256 key) public view returns(uint);
    
    // Set data via string (bytes32 limit) keys ...
    function setAddress(string key, address value) public view returns(address);
    function setBool(string key, bool value) public view returns(bool);
    function setString(string key, string value) public view returns(bytes32);
    function setUint(string key, uint value) public view returns(uint);
    
    // Set data via uint256 keys ...
    function SetAddress(uint256 key, address value) public;
    function SetBool(uint256 key, bool value) public;
    function SetString(uint256 key, string value) public;
    function SetUint(uint256 key, uint value) public;
    
    // Set data via uint256 and string (bytes32 limit) combined keys ...
    function SetKeyedAddress(uint256 id, string key, address value) public;
    function SetKeyedBool(uint256 id, string key, bool value) public;
    function SetKeyedString(uint256 id, string key, string value) public;
    function SetKeyedUint(uint256 id, string key, uint value) public;
    
    // Set addressed data via string (bytes32 limit) keys ...
    function setAddressedAddress(address addressIndex, string key, address value) public view returns(address);
    function setAddressedBool(address addressIndex, string key, bool value) public view returns(bool);
    function setAddressedString(address addressIndex, string key, bytes32 value) public view returns(bytes32);
    function setAddressedRealString(address addressIndex, string key, string value) public view returns(string);
    function setAddressedUint(address addressIndex, string key, uint value) public view returns(uint);
    
    // Set addressed data via uint256 keys ...
    function SetAddressedAddress(address addressIndex, uint256 key, address value) public view returns(address);
    function SetAddressedBool(address addressIndex, uint256 key, bool value) public view returns(bool);
    function SetAddressedString(address addressIndex, uint256 key, bytes32 value) public view returns(bytes32);
    function SetAddressedRealString(address addressIndex, uint256 key, string value) public view returns(string);
    function SetAddressedUint(address addressIndex, uint256 key, uint value) public view returns(uint);
    
    // Delete data via string (bytes32 limit) keys ...
    function deleteAddress(string key) public;
    function deleteBool(string key) public;
    function deleteString(string key) public;
    function deleteUint(string key) public;
    
    // Delete data via uint256 keys ... ADD UNIQUE COUNT ?
    function DeleteAddress(uint256 key) public;
    function DeleteBool(uint256 key) public;
    function DeleteString(uint256 key) public;
    function DeleteUint(uint256 key) public;
    
    // Delete data via uint256 and string (bytes32 limit) combined keys ...
    function DeleteKeyedAddress(uint256 id, string key) public;
    function DeleteKeyedBool(uint256 id, string key) public;
    function DeleteKeyedString(uint256 id, string key) public;
    function DeleteKeyedUint(uint256 id, string key) public;
    
    // Delete addressed data via string (bytes32 limit) keys ...
    function deleteAddressedAddress(address addressIndex, string key) public;
    function deleteAddressedBool(address addressIndex, string key) public;
    function deleteAddressedString(address addressIndex, string key) public;
    function deleteAddressedUint(address addressIndex, string key) public;
    
    // Delete addressed data via uint256 keys ...
    function DeleteAddressedAddress(address addressIndex, uint256 key) public;
    function DeleteAddressedBool(address addressIndex, uint256 key) public;
    function DeleteAddressedString(address addressIndex, uint256 key) public;
    function DeleteAddressedUint(address addressIndex, uint256 key) public;
    
    /*
    
    ARRAYS
    
    */
    
    // Get an item from an array via string (bytes32 limit) key and uint index ...
    function readAddress(string key, uint index) public view returns(address);
    function readBool(string key, uint index) public view returns(bool);
    function readString(string key, uint index) public view returns(bytes32);
    function readRealString(string key, uint index) public view returns(string);
    function readUint(string key, uint index) public view returns(uint);
    
    // Push an item to an array via string (bytes32 limit) key ...
    function pushAddress(string key, address value) public;
    function pushBool(string key, bool value) public;
    function pushString(string key, string value) public;
    function pushUint(string key, uint value) public;
    
    // Get an item from an array via uint256 key and uint index ...
    function ReadAddress(uint256 key, uint index) public view returns(address);
    function ReadBool(uint256 key, uint index) public view returns(bool);
    function ReadString(uint256 key, uint index) public view returns(bytes32);
    function ReadRealString(uint256 key, uint index) public view returns(string);
    function ReadUint(uint256 key, uint index) public view returns(uint);
    
    // Push an item to an array via uint256 key ...
    function PushAddress(uint256 key, address value) public;
    function PushBool(uint256 key, bool value) public;
    function PushString(uint256 key, string value) public;
    function PushUint(uint256 key, uint value) public;
    
    // Get an item from an addressed array via string (bytes32 limit) key and uint index ...
    function readAddressedAddress(address addressIndex, string key, uint index) public view returns(address);
    function readAddressedBool(address addressIndex, string key, uint index) public view returns(bool);
    function readAddressedString(address addressIndex, string key, uint index) public view returns(bytes32);
    function readAddressedRealString(address addressIndex, string key, uint index) public view returns(string);
    function readAddressedUint(address addressIndex, string key, uint index) public view returns(uint);
    
    // Push an item to an addressed array via string (bytes32 limit) key ...
    function pushAddressedAddress(address addressIndex, string key, address value) public;
    function pushAddressedBool(address addressIndex, string key, bool value) public;
    function pushAddressedString(address addressIndex, string key, string value) public;
    function pushAddressedUint(address addressIndex, string key, uint value) public;
    
    // Get an item from an addressed array via uint256 key and uint index ...
    function ReadAddressedAddress(address addressIndex, uint256 key, uint index) public view returns(address);
    function ReadAddressedBool(address addressIndex, uint256 key, uint index) public view returns(bool);
    function ReadAddressedString(address addressIndex, uint256 key, uint index) public view returns(bytes32);
    function ReadAddressedRealString(address addressIndex, uint256 key, uint index) public view returns(string);
    function ReadAddressedUint(address addressIndex, uint256 key, uint index) public view returns(uint);
    
    // Push an item to an addressed array via uint256 key ...
    function PushAddressedAddress(address addressIndex, uint256 key, address value) public;
    function PushAddressedBool(address addressIndex, uint256 key, bool value) public;
    function PushAddressedString(address addressIndex, uint256 key, string value) public;
    function PushAddressedUint(address addressIndex, uint256 key, uint value) public;
    
    // Remove an item from an array via string (bytes32 limit) key and uint index ...
    function removeAddress(string key, uint index) public;
    function removeBool(string key, uint index) public;
    function removeString(string key, uint index) public;
    function removeRealString(string key, uint index) public;
    function removeUint(string key, uint index) public;
    
    // Remove an item from an addressed array via string (bytes32 limit) key and uint index ...
    function removeAddressedAddress(string key, uint index) public;
    function removeAddressedBool(string key, uint index) public;
    function removeAddressedString(string key, uint index) public;
    function removeAddressedUint(string key, uint index) public;
    
    // Remove an item from an array via uint256 key and uint index ...
    function RemoveAddress(string key, uint index) public;
    function RemoveBool(string key, uint index) public;
    function RemoveString(string key, uint index) public;
    function RemoveUint(string key, uint index) public;
    
    // Remove an item from an addressed array via uint256 key and uint index ...
    function RemoveAddressedAddress(string key, uint index) public;
    function RemoveAddressedBool(string key, uint index) public;
    function RemoveAddressedString(string key, uint index) public;
    function RemoveAddressedUint(string key, uint index) public;
    
    // Update an item from an array via string (bytes32 limit) key and uint index ...
    function pdateAddress(string key, uint index) public;
    function updateBool(string key, uint index) public;
    function updateString(string key, uint index) public;
    function updateRealString(string key, uint index) public;
    function updateUint(string key, uint index) public;
    
    // Update an item from an addressed array via string (bytes32 limit) key and uint index ...
    function updateAddressedAddress(string key, uint index) public;
    function updateAddressedBool(string key, uint index) public;
    function updateAddressedString(string key, uint index) public;
    function updateAddressedUint(string key, uint index) public;
    
    // Update an item from an array via uint256 key and uint index ...
    function UpdateAddress(string key, uint index) public;
    function UpdateBool(string key, uint index) public;
    function UpdateString(string key, uint index) public;
    function UpdateUint(string key, uint index) public;
    
    // Update an item from an addressed array via uint256 key and uint index ...
    function UpdateAddressedAddress(string key, uint index) public;
    function UpdateAddressedBool(string key, uint index) public;
    function UpdateAddressedString(string key, uint index) public;
    function UpdateAddressedUint(string key, uint index) public;
    
    /*
    
    TOP TEN COUNTS
    
    01 - addressCount
    02 - addressBytes32Count
    03 - addressUint256Count
    04 - addressUint256KeyedCount

    05 - addressedAddressBytes32Count
    06 - addressedAddressUint256Count
    
    07 - addressBytes32ArrayCount
    08 - addressUint256ArrayCount
    09 - addressedBytes32AddressArrayCount
    10 - addressedUint256AddressArrayCount
    
    ?? - What about addressed combos?
    ?? - What about array count combos?
    ?? - Proxy / master K/V need contract specific counts too?
    
    */
    
    // 01) Basic base data type counts combined ...
    function AddressCount() public view returns(uint);
    function BoolCount() public view returns(uint);
    function StringCount() public view returns(uint);
    function UintCount() public view returns(uint);
    
    // 02) Basic base data type counts via bytes32 indexes ...
    function getAddressCount(string index) public view returns(uint);
    function getBoolCount(string index) public view returns(uint);
    function getStringCount(string index) public view returns(uint);
    function getUintCount(string index) public view returns(uint);
    
    // 03) Basic base data type counts via uint256 indexes ...
    function GetAddressCount(uint256 index) public view returns(uint);
    function GetBoolCount(uint256 index) public view returns(uint);
    function GetStringCount(uint256 index) public view returns(uint);
    function GetUintCount(uint256 index) public view returns(uint);
    
    // 04) Basic base data type counts via keyed uint256 indexes ...
    function GetKeyedAddressCount(uint256 index, string key) public view returns(uint);
    function GetKeyedBoolCount(uint256 index, string key) public view returns(uint);
    function GetKeyedStringCount(uint256 index, string key) public view returns(uint);
    function GetKeyedUintCount(uint256 index, string key) public view returns(uint);
    
    // 05) Addressed data type counts via bytes32 indexes ...
    function getAddressedAddressCount(address addressIndex, string key) public view returns(uint);
    function getAddressedBoolCount(address addressIndex, string key) public view returns(uint);
    function getAddressedStringCount(address addressIndex, string key) public view returns(uint);
    function getAddressedUintCount(address addressIndex, string key) public view returns(uint);
    
    // 06) Addressed data type counts via uint256 indexes ...
    function GetAddressedAddressCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedBoolCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedStringCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedUintCount(address addressIndex, uint256 key) public view returns(uint);
    
    // 07) Bytes32 array counts ...
    function getArrayAddressCount(string index) public view returns(uint);
    function getArrayBoolCount(string index) public view returns(uint);
    function getArrayStringCount(string index) public view returns(uint);
    function getArrayUintCount(string index) public view returns(uint);
    
    // 08) Addressed bytes32 array counts ...
    function getAddressedArrayAddressCount(address addressIndex, string key) public view returns(uint);
    function getAddressedArrayBoolCount(address addressIndex, string key) public view returns(uint);
    function getAddressedArrayStringCount(address addressIndex, string key) public view returns(uint);
    function getAddressedArrayUintCount(address addressIndex, string key) public view returns(uint);
    
    // 09) Uint256 array counts ...
    function GetArrayAddressCount(uint256 index) public view returns(uint);
    function GetArrayBoolCount(uint256 index) public view returns(uint);
    function GetArrayStringCount(uint256 index) public view returns(uint);
    function GetArrayUintCount(uint256 index) public view returns(uint);
    
    // 10) Addressed uint256 array counts ...
    function GetAddressedArrayAddressCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedArrayBoolCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedArrayStringCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedArrayUintCount(address addressIndex, uint256 key) public view returns(uint);
}

contract InterplanetaryEmbassy is Extensible
{
    using UsingSafeMaths for uint;
    
    Extensible db;
    
    struct planet
    {
        uint x;
        uint y;
        uint z;
        string name;
        address owner;
        string liason;
        string url;
        uint cost;
        uint index;
    }

    struct donation
    {
        uint start;
        uint genesis;
        uint interval;
        uint ppp;
        uint amount;
        uint checkpoint;
    }

    mapping(uint => planet) planets;
    mapping(address => donation) donations;

    string private universe;
    uint private min_donation;
    address private donation_address;
    uint private coordinate_limit;

    event TokenPing(uint tokenId);
    
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
        db = Extensible(proxyAddress);
        universe = UniverseName;
        min_donation = StartingWeiDonation;
        coordinate_limit = CoordinateLimit;
        donation_address = DonationAddress;
        donations[donation_address].start = min_donation;
        donations[donation_address].genesis = block.number;
        donations[donation_address].checkpoint = block.number;
        donations[donation_address].interval = BlockIntervals;
        donations[donation_address].ppp = WeiPerPlanet;
        donations[donation_address].amount = min_donation;
    }
    
    function updateDatabase(address proxyAddress) public onlyOwner 
    {
        db = Extensible(proxyAddress);
    }
    
    /* 
    
    Basic ERC721 Functionality
    
    */
    function totalSupply() public constant returns (uint) 
    {
        return db.getUint('total');
    }

    function balanceOf(address beneficiary) public constant returns (uint) 
    {
        return db.getAddressedUint(beneficiary, 'balance');
    }

    function tokenOfOwnerByIndex(address beneficiary, uint index) public constant returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(beneficiary));        
        return db.readAddressedUint(beneficiary, 'owned', index);
    }

    function getAllTokens(address beneficiary) public constant returns (uint[]) 
    {
        uint size = db.getAddressedUint(beneficiary, 'balance');
        uint[] memory result = new uint[](size);
        for (uint index = 0; index < size; index++) 
        {
            result[index] = db.readAddressedUint(beneficiary, 'owned', index);
        }
        return result;
    }

    function ownerOf(uint tokenId) public constant returns (address) 
    {
        return db.GetKeyedAddress(tokenId, 'owner');
    }

    function transfer(address to, uint tokenId) public
    {
        require(
            db.GetKeyedAddress(tokenId, 'owner') == msg.sender 
            || db.GetKeyedAddress(tokenId, 'allowed') == msg.sender
        );
        _transfer(db.GetKeyedAddress(tokenId, 'owner'), to, tokenId);
    }

    function takeOwnership(uint tokenId) public 
    {
        require(db.GetKeyedAddress(tokenId, 'allowed') == msg.sender);
        _transfer(db.GetKeyedAddress(tokenId, 'owner'), msg.sender, tokenId);
    }

    function approve(address beneficiary, uint tokenId) public 
    {
        require(db.GetKeyedAddress(tokenId, 'owner') == msg.sender);
        if(db.GetKeyedAddress(tokenId, 'allowed') != 0)
        {
            db.SetKeyedUint(tokenId, 'allowed', 0);
            emit TokenTransferDisallowed(tokenId, db.GetKeyedAddress(tokenId, 'allowed'));
        }
        db.SetKeyedAddress(tokenId, 'allowed', beneficiary);
        emit TokenTransferAllowed(tokenId, beneficiary);
    }

    function metadata(uint256 tokenId) constant public returns(string) 
    {
        db.GetKeyedRealString(tokenId, 'meta');
    }

    function updateTokenMetadata(uint tokenId, string metaData) internal returns(bool)
    {
        require(db.GetKeyedAddress(tokenId, 'owner') == msg.sender);
        db.SetKeyedString(tokenId, 'meta', metaData);
        emit TokenMetadataUpdated(tokenId, msg.sender, metaData);
        return true;
    }

    function _transfer(address from, address to, uint tokenId) internal returns(bool)
    {
        db.SetKeyedAddress(tokenId, 'allowed', 0);
        _removeTokenFrom(from, tokenId);
        _addTokenTo(to, tokenId);
        emit TokenTransferred(tokenId, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint tokenId) internal 
    {
        require(db.getAddressedUint(from, 'balance') > 0);
        uint length = db.getAddressedUint(from, 'balance');
        uint index = db.GetKeyedUint(tokenId, 'index');
        uint swapToken = db.readAddressedUint(from, 'owned', length - 1);
        // What about counts???
        db.setAddressedUint(from, 'owner', swapToken);
        db.SetKeyedUint(swapToken, 'index', index);
        db.setAddressedUint(from, 'balance', db.getAddressedUint(from, 'balance') - 1);
    }

    function _addTokenTo(address beneficiary, uint tokenId) internal 
    {
        uint length = db.getAddressedUint(beneficiary, 'balance');
        db.pushAddressedUint(beneficiary, 'owned', tokenId);
        db.setAddressedUint(beneficiary, 'owner', tokenId);
        db.SetKeyedUint(tokenId, 'index', length);
        db.setAddressedUint(beneficiary, 'balance', length + 1);
        // What about counts???
    }
    
    /*
    
    PLANET SPECIFIC FUNCTIONS
    
    */
    function uid(uint xCoordinate, uint yCoordinate, uint zCoordinate) public view returns (uint256)
    {
        return uint256(keccak256(xCoordinate, '|', yCoordinate, '|', zCoordinate, '|', universe));
    }
    
    function genesis
    (
        address beneficiary, 
        uint x, uint y, uint z, 
        string name, 
        string liason, 
        string url
    ) 
    public payable 
    {
        
        // Check current fee
        uint MinimumDonation = donations[donation_address].amount;

        // Check required paramters
        uint256 id = uid(x, y, z);
        require(db.GetKeyedAddress(id, 'owner') == 0);
        require(msg.value >= MinimumDonation);
        require(x <= coordinate_limit);
        require(y <= coordinate_limit);
        require(z <= coordinate_limit);

        // Update token records
        _addTokenTo(beneficiary, id);
        db.setUint('total', db.getUint('total') + 1);
        db.SetKeyedString(id, 'meta', name);

        // Save Planet
        planets[id].x = x;
        planets[id].x = y;
        planets[id].x = z;
        planets[id].name = name;
        planets[id].owner = beneficiary;
        planets[id].liason = liason;
        planets[id].url = url;
        planets[id].index = db.getUint('total') - 1; // Effected by array removals?
        planets[id].cost = msg.value;

        // Finalize process
        emit TokenCreated(id, beneficiary, name);  
        donation_address.transfer(msg.value);

        // Update donation info
        uint this_block = block.number;
        uint new_checkpoint = donations[donation_address].checkpoint + donations[donation_address].interval; 
        if(this_block > new_checkpoint)
        {
            donations[donation_address].checkpoint = this_block;
            donations[donation_address].amount = donations[donation_address].ppp * db.getUint('total');
        }
    }
    
    function MinimumDonation() public view returns(uint)
    {
        return donations[donation_address].amount;
    }

    function BlocksToGo() public view returns(uint)
    {
        uint this_block = block.number;
        uint next_block = donations[donation_address].checkpoint + donations[donation_address].interval;
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
        string name,
        address owner,
        string liason,
        string url,
        uint cost,
        uint index
    ){
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        return(
            planets[id].x,
            planets[id].y,
            planets[id].z,
            planets[id].name,
            planets[id].owner,
            planets[id].liason,
            planets[id].url,
            planets[id].cost,
            planets[id].index
        );
    }
    
    function UpdateDonationAddress(address NewAddress) onlyOwner public
    {
        address OldAddress = donation_address;
        donation_address = NewAddress;
        donations[donation_address].start = donations[OldAddress].start;
        donations[donation_address].genesis = donations[OldAddress].genesis;
        donations[donation_address].checkpoint = donations[OldAddress].checkpoint;
        donations[donation_address].interval = donations[OldAddress].interval;
        donations[donation_address].ppp = donations[OldAddress].ppp;
        donations[donation_address].amount = donations[OldAddress].amount;
    }
    
    function exists(uint xCoordinate, uint yCoordinate, uint zCoordinate) public constant returns (bool) 
    {
        return ownerOfPlanet(xCoordinate, yCoordinate, zCoordinate) != 0;
    }

    function ownerOfPlanet(uint xCoordinate, uint yCoordinate, uint zCoordinate) public constant returns (address) 
    {
        return db.GetKeyedAddress(uid(xCoordinate, yCoordinate, zCoordinate), 'owner');
    }
    
    function updatePlanetName(uint xCoordinate, uint yCoordinate, uint zCoordinate, string name) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        if(updateTokenMetadata(id, name))
        {
            planets[id].name = name;
        }
    }

    function updatePlanetLiason(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonName) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == db.GetKeyedAddress(id, 'owner'));
        planets[id].liason = LiasonName;
    }

    function updatePlanetURL(uint xCoordinate, uint yCoordinate, uint zCoordinate, string LiasonURL) public 
    {
        uint id = uid(xCoordinate, yCoordinate, zCoordinate);
        require(msg.sender == db.GetKeyedAddress(id, 'owner'));
        planets[id].url = LiasonURL;
    }
}