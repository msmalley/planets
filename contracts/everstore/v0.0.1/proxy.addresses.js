pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0xfbe9101909E4EA4eae93eFE7EA2286B198c5755b = 0.62

/*

BloqVerse: Intergalactic Construct Framework
Developer: The Blockchain Embassy
URI: http://bce.asia

----------------------------------------------------

BLOQVERSE INTERFACE REQUIRED FOR WALLET INTEGRATION 

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

contract AddressesDB is Upgradable
{
    function _create(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public;
    function _read(address addressIndex, bytes32 version, bytes32 key, address addressNull) public view returns(address);
    function _update(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public;
    function _Read(address addressIndex, bytes32 version, uint256 key, address addressNull) public view returns(address);
    function _Update(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public;
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull) public view returns(address);
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull, address value) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public;
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, address addressNull) public view returns(address);
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, address value, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, address addressNull) public;
    function _set(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, address value, address addressNull) public;
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, address addressNull) public view returns(address);
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, address addressNull) public;
    function addressBytes32Count(address addressIndex) public view returns(uint);
    function addressUint256Count(address addressIndex) public view returns(uint);
    function addressBytes32ArrayCount(address addressIndex) public view returns(uint);
    function addressUint256ArrayCount(address addressIndex) public view returns(uint);
    function addressKeyCount(address addressIndex) public view returns(uint);
}

contract AddressesProxy is Upgradable
{
    // SETUP
    string AddressesVersion;
    address AddressesAddress;
    
    function updateAddressesProxy(address databaseAddress) public onlyOwner
    {
        AddressesAddress = databaseAddress;
    }
    
    function updateAddressesVersion(string databaseName) public onlyOwner
    {
        AddressesVersion = databaseName;
    }
    
    // Bytes32 Keys
    function create(address addressIndex, string key, address value, address addressNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._create(addressIndex, uid, _key, value, addressNull);
    }
    
    function read(address addressIndex, string key, address addressNull) public view returns(address)
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressesVersion);
        return AddressesDB(AddressesAddress)._read(addressIndex, uid, _key, addressNull);
    }
    
    function update(address addressIndex, string key, address value, address addressNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._update(addressIndex, uid, _key, value, addressNull);
    }
    
    function destroy(address addressIndex, string key, address addressNull) public
    {
        bytes32 _key = stringToBytes32(key);
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._destroy(addressIndex, uid, _key, addressNull);
    }
    
    // Uint256 Keys
    function Create(address addressIndex, uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Create(addressIndex, uid, key, value, addressNull);
    }
    
    function Read(address addressIndex, uint256 key, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        return AddressesDB(AddressesAddress)._Read(addressIndex, uid, key, addressNull);
    }
    
    function Update(address addressIndex, uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Update(addressIndex, uid, key, value, addressNull);
    }
    
    function Destroy(address addressIndex, uint256 key, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Destroy(addressIndex, uid, key, addressNull);
    }
    
    // Bytes32 Arrays
    function push(address addressIndex, string key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _key = stringToBytes32(key);
        AddressesDB(AddressesAddress)._push(addressIndex, uid, _key, value, addressNull);
    }
    
    function pull(address addressIndex, string key, uint index, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _key = stringToBytes32(key);
        return AddressesDB(AddressesAddress)._pull(addressIndex, uid, _key, index, addressNull);
    }
    
    function edit(address addressIndex, string key, uint index, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _key = stringToBytes32(key);
        AddressesDB(AddressesAddress)._edit(addressIndex, uid, _key, index, value, addressNull);
    }
    
    function remove(address addressIndex, string key, uint index, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _key = stringToBytes32(key);
        AddressesDB(AddressesAddress)._remove(addressIndex, uid, _key, index, addressNull);
    }
    
    // Uint256 Arrays
    function Push(address addressIndex, uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Push(addressIndex, uid, key, value, addressNull);
    }
    
    function Pull(address addressIndex, uint256 key, uint index, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        return AddressesDB(AddressesAddress)._Pull(addressIndex, uid, key, index, addressNull);
    }
    
    function Edit(address addressIndex, uint256 key, uint index, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Edit(addressIndex, uid, key, index, value, addressNull);
    }
    
    function Remove(address addressIndex, uint256 key, uint index, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Remove(addressIndex, uid, key, index, addressNull);
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    function set(address addressIndex, string key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _key = stringToBytes32(key);
        AddressesDB(AddressesAddress)._set(addressIndex, uid, _key, value, addressNull);
    }
    
    function Set(address addressIndex, uint256 key, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        AddressesDB(AddressesAddress)._Set(addressIndex, uid, key, value, addressNull);
    }
    
    function Sets(address addressIndex, uint256 key, string index, address value, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _index = stringToBytes32(index);
        AddressesDB(AddressesAddress)._Sets(addressIndex, uid, key, _index, value, addressNull);
    }
    
    function Reads(address addressIndex, uint256 key, string index, address addressNull) public view returns(address)
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _index = stringToBytes32(index);
        return AddressesDB(AddressesAddress)._Reads(addressIndex, uid, key, _index, addressNull);
    }
    
    function Removes(address addressIndex, uint256 key, string index, address addressNull) public
    {
        bytes32 uid = stringToBytes32(AddressesVersion);
        bytes32 _index = stringToBytes32(index);
        AddressesDB(AddressesAddress)._Removes(addressIndex, uid, key, _index, addressNull);
    }
}

contract DeployAddresses is AddressesProxy
{   
    function DeployAddresses(address databaseAddress, string databaseName) public 
    {
        AddressesAddress = databaseAddress;
        AddressesVersion = databaseName;
    }
    
    function updateDatabaseAddress(address databaseAddress) public onlyOwner
    {
        AddressesAddress = databaseAddress;
    }
    
    function updateDatabaseName(string databaseName) public onlyOwner
    {
        AddressesVersion = databaseName;
    }
}