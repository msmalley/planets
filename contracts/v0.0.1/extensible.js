pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 

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

contract BloqVerse is AbleToUtilizeStrings
{
    // Get data via string (bytes32 limit) keys ...
    function getAddress(bytes32 key) public view returns(address);
    function getBool(bytes32 key) public view returns(bool);
    function getString(bytes32 key) public view returns(bytes32);
    function getRealString(bytes32 key) public view returns(string);
    function getUint(bytes32 key) public view returns(uint);
    
    // Get data via uint256 keys ...
    function GetAddress(uint256 key) public view returns(address);
    function GetBool(uint256 key) public view returns(bool);
    function GetString(uint256 key) public view returns(bytes32);
    function GetRealString(uint256 key) public view returns(string);
    function GetUint(uint256 key) public view returns(uint);
    
    // Get data via uint256 and string (bytes32 limit) combined keys ...
    function GetKeyedAddress(uint256 id, bytes32 key) public view returns(address);
    function GetKeyedBool(uint256 id, bytes32 key) public view returns(bool);
    function GetKeyedString(uint256 id, bytes32 key) public view returns(bytes32);
    function GetKeyedRealString(uint256 id, bytes32 key) public view returns(string);
    function GetKeyedUint(uint256 id, bytes32 key) public view returns(uint);
    
    // Get addressed data via string (bytes32 limit) keys ...
    function getAddressedAddress(address addressIndex, bytes32 key) public view returns(address);
    function getAddressedBool(address addressIndex, bytes32 key) public view returns(bool);
    function getAddressedString(address addressIndex, bytes32 key) public view returns(bytes32);
    function getAddressedRealString(address addressIndex, bytes32 key) public view returns(string);
    function getAddressedUint(address addressIndex, bytes32 key) public view returns(uint);
    
    // Get addressed data via uint256 keys ...
    function GetAddressedAddress(address addressIndex, uint256 key) public view returns(address);
    function GetAddressedBool(address addressIndex, uint256 key) public view returns(bool);
    function GetAddressedString(address addressIndex, uint256 key) public view returns(bytes32);
    function GetAddressedRealString(address addressIndex, uint256 key) public view returns(string);
    function GetAddressedUint(address addressIndex, uint256 key) public view returns(uint);
    
    // Set data via string (bytes32 limit) keys ...
    function setAddress(bytes32 key, address value) public view returns(address);
    function setBool(bytes32 key, bool value) public view returns(bool);
    function setString(bytes32 key, string value) public view returns(bytes32);
    function setUint(bytes32 key, uint value) public view returns(uint);
    
    // Set data via uint256 keys ...
    function SetAddress(uint256 key, address value) public;
    function SetBool(uint256 key, bool value) public;
    function SetString(uint256 key, string value) public;
    function SetUint(uint256 key, uint value) public;
    
    // Set data via uint256 and string (bytes32 limit) combined keys ...
    function SetKeyedAddress(uint256 id, bytes32 key, address value) public;
    function SetKeyedBool(uint256 id, bytes32 key, bool value) public;
    function SetKeyedString(uint256 id, bytes32 key, string value) public;
    function SetKeyedUint(uint256 id, bytes32 key, uint value) public;
    
    // Set addressed data via string (bytes32 limit) keys ...
    function setAddressedAddress(address addressIndex, bytes32 key, address value) public view returns(address);
    function setAddressedBool(address addressIndex, bytes32 key, bool value) public view returns(bool);
    function setAddressedString(address addressIndex, bytes32 key, bytes32 value) public view returns(bytes32);
    function setAddressedRealString(address addressIndex, bytes32 key, string value) public view returns(string);
    function setAddressedUint(address addressIndex, bytes32 key, uint value) public view returns(uint);
    
    // Set addressed data via uint256 keys ...
    function SetAddressedAddress(address addressIndex, uint256 key, address value) public view returns(address);
    function SetAddressedBool(address addressIndex, uint256 key, bool value) public view returns(bool);
    function SetAddressedString(address addressIndex, uint256 key, bytes32 value) public view returns(bytes32);
    function SetAddressedRealString(address addressIndex, uint256 key, string value) public view returns(string);
    function SetAddressedUint(address addressIndex, uint256 key, uint value) public view returns(uint);
    
    // Delete data via string (bytes32 limit) keys ...
    function deleteAddress(bytes32 key) public;
    function deleteBool(bytes32 key) public;
    function deleteString(bytes32 key) public;
    function deleteUint(bytes32 key) public;
    
    // Delete data via uint256 keys ... ADD UNIQUE COUNT ?
    function DeleteAddress(uint256 key) public;
    function DeleteBool(uint256 key) public;
    function DeleteString(uint256 key) public;
    function DeleteUint(uint256 key) public;
    
    // Delete data via uint256 and string (bytes32 limit) combined keys ...
    function DeleteKeyedAddress(uint256 id, bytes32 key) public;
    function DeleteKeyedBool(uint256 id, bytes32 key) public;
    function DeleteKeyedString(uint256 id, bytes32 key) public;
    function DeleteKeyedUint(uint256 id, bytes32 key) public;
    
    // Delete addressed data via string (bytes32 limit) keys ...
    function deleteAddressedAddress(address addressIndex, bytes32 key) public;
    function deleteAddressedBool(address addressIndex, bytes32 key) public;
    function deleteAddressedString(address addressIndex, bytes32 key) public;
    function deleteAddressedUint(address addressIndex, bytes32 key) public;
    
    // Delete addressed data via uint256 keys ...
    function DeleteAddressedAddress(address addressIndex, uint256 key) public;
    function DeleteAddressedBool(address addressIndex, uint256 key) public;
    function DeleteAddressedString(address addressIndex, uint256 key) public;
    function DeleteAddressedUint(address addressIndex, uint256 key) public;
    
    /*
    
    ARRAYS
    
    */
    
    // Get an item from an array via string (bytes32 limit) key and uint index ...
    function readAddress(bytes32 key, uint index) public view returns(address);
    function readBool(bytes32 key, uint index) public view returns(bool);
    function readString(bytes32 key, uint index) public view returns(bytes32);
    function readRealString(bytes32 key, uint index) public view returns(string);
    function readUint(bytes32 key, uint index) public view returns(uint);
    
    // Push an item to an array via string (bytes32 limit) key ...
    function pushAddress(bytes32 key, address value) public;
    function pushBool(bytes32 key, bool value) public;
    function pushString(bytes32 key, string value) public;
    function pushUint(bytes32 key, uint value) public;
    
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
    function readAddressedAddress(address addressIndex, bytes32 key, uint index) public view returns(address);
    function readAddressedBool(address addressIndex, bytes32 key, uint index) public view returns(bool);
    function readAddressedString(address addressIndex, bytes32 key, uint index) public view returns(bytes32);
    function readAddressedRealString(address addressIndex, bytes32 key, uint index) public view returns(string);
    function readAddressedUint(address addressIndex, bytes32 key, uint index) public view returns(uint);
    
    // Push an item to an addressed array via string (bytes32 limit) key ...
    function pushAddressedAddress(address addressIndex, bytes32 key, address value) public;
    function pushAddressedBool(address addressIndex, bytes32 key, bool value) public;
    function pushAddressedString(address addressIndex, bytes32 key, string value) public;
    function pushAddressedUint(address addressIndex, bytes32 key, uint value) public;
    
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
    function removeAddress(bytes32 key, uint index) public;
    function removeBool(bytes32 key, uint index) public;
    function removeString(bytes32 key, uint index) public;
    function removeRealString(bytes32 key, uint index) public;
    function removeUint(bytes32 key, uint index) public;
    
    // Remove an item from an addressed array via string (bytes32 limit) key and uint index ...
    function removeAddressedAddress(bytes32 key, uint index) public;
    function removeAddressedBool(bytes32 key, uint index) public;
    function removeAddressedString(bytes32 key, uint index) public;
    function removeAddressedUint(bytes32 key, uint index) public;
    
    // Remove an item from an array via uint256 key and uint index ...
    function RemoveAddress(bytes32 key, uint index) public;
    function RemoveBool(bytes32 key, uint index) public;
    function RemoveString(bytes32 key, uint index) public;
    function RemoveUint(bytes32 key, uint index) public;
    
    // Remove an item from an addressed array via uint256 key and uint index ...
    function RemoveAddressedAddress(bytes32 key, uint index) public;
    function RemoveAddressedBool(bytes32 key, uint index) public;
    function RemoveAddressedString(bytes32 key, uint index) public;
    function RemoveAddressedUint(bytes32 key, uint index) public;
    
    // Update an item from an array via string (bytes32 limit) key and uint index ...
    function pdateAddress(bytes32 key, uint index) public;
    function updateBool(bytes32 key, uint index) public;
    function updateString(bytes32 key, uint index) public;
    function updateRealString(bytes32 key, uint index) public;
    function updateUint(bytes32 key, uint index) public;
    
    // Update an item from an addressed array via string (bytes32 limit) key and uint index ...
    function updateAddressedAddress(bytes32 key, uint index) public;
    function updateAddressedBool(bytes32 key, uint index) public;
    function updateAddressedString(bytes32 key, uint index) public;
    function updateAddressedUint(bytes32 key, uint index) public;
    
    // Update an item from an array via uint256 key and uint index ...
    function UpdateAddress(bytes32 key, uint index) public;
    function UpdateBool(bytes32 key, uint index) public;
    function UpdateString(bytes32 key, uint index) public;
    function UpdateUint(bytes32 key, uint index) public;
    
    // Update an item from an addressed array via uint256 key and uint index ...
    function UpdateAddressedAddress(bytes32 key, uint index) public;
    function UpdateAddressedBool(bytes32 key, uint index) public;
    function UpdateAddressedString(bytes32 key, uint index) public;
    function UpdateAddressedUint(bytes32 key, uint index) public;
    
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
    function getAddressCount(bytes32 index) public view returns(uint);
    function getBoolCount(bytes32 index) public view returns(uint);
    function getStringCount(bytes32 index) public view returns(uint);
    function getUintCount(bytes32 index) public view returns(uint);
    
    // 03) Basic base data type counts via uint256 indexes ...
    function GetAddressCount(uint256 index) public view returns(uint);
    function GetBoolCount(uint256 index) public view returns(uint);
    function GetStringCount(uint256 index) public view returns(uint);
    function GetUintCount(uint256 index) public view returns(uint);
    
    // 04) Basic base data type counts via keyed uint256 indexes ...
    function GetKeyedAddressCount(uint256 index, bytes32 key) public view returns(uint);
    function GetKeyedBoolCount(uint256 index, bytes32 key) public view returns(uint);
    function GetKeyedStringCount(uint256 index, bytes32 key) public view returns(uint);
    function GetKeyedUintCount(uint256 index, bytes32 key) public view returns(uint);
    
    // 05) Addressed data type counts via bytes32 indexes ...
    function getAddressedAddressCount(address addressIndex, bytes32 key) public view returns(uint);
    function getAddressedBoolCount(address addressIndex, bytes32 key) public view returns(uint);
    function getAddressedStringCount(address addressIndex, bytes32 key) public view returns(uint);
    function getAddressedUintCount(address addressIndex, bytes32 key) public view returns(uint);
    
    // 06) Addressed data type counts via uint256 indexes ...
    function GetAddressedAddressCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedBoolCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedStringCount(address addressIndex, uint256 key) public view returns(uint);
    function GetAddressedUintCount(address addressIndex, uint256 key) public view returns(uint);
    
    // 07) Bytes32 array counts ...
    function getArrayAddressCount(bytes32 index) public view returns(uint);
    function getArrayBoolCount(bytes32 index) public view returns(uint);
    function getArrayStringCount(bytes32 index) public view returns(uint);
    function getArrayUintCount(bytes32 index) public view returns(uint);
    
    // 08) Addressed bytes32 array counts ...
    function getAddressedArrayAddressCount(address addressIndex, bytes32 key) public view returns(uint);
    function getAddressedArrayBoolCount(address addressIndex, bytes32 key) public view returns(uint);
    function getAddressedArrayStringCount(address addressIndex, bytes32 key) public view returns(uint);
    function getAddressedArrayUintCount(address addressIndex, bytes32 key) public view returns(uint);
    
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

contract Extensible is Upgradable
{

    BloqVerse db;
    string public nameSpace;
    
    function Proxy(address databaseAddress, string databaseName) public
    {
        db = BloqVerse(databaseAddress);
        nameSpace = databaseName;
    }
    
    function updateProxy(address databaseAddress) public onlyOwner
    {
        db = BloqVerse(databaseAddress);
    }
    
    function updateVersion(string databaseName) public onlyOwner
    {
        nameSpace = databaseName;
    }
    
    /*
    
    NOW TO TO CONNECT PARENT CONTRACT TO CHILD CONTRACT
    
    This needs to include:
    
    -- Adding contract address and namespace
    -- Converting string keys to bytes ???
    -- Managing contract specific counts ???
    -- And then ???
    
    -- Can it be as simple as CREATE, READ, UPDATE and DESTROY ...?
    
    */
    
    function createAddress(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        address indexValue, 
        address arrayValue,
        bool gotStringKey,
        bool gotUintKey,
        bool isArray
    ) public {
        if(addressIndex == 0)
        {
            if(gotStringKey && gotUintKey)
            {
                // Set data via uint256 and string (bytes32 limit) combined keys ...
                db.SetKeyedAddress(uintKey, stringToBytes32(stringKey), indexValue);
            }
            else if(isArray && gotStringKey)
            {
                // Push an item to an array via string (bytes32 limit) key ...
                db.pushAddress(stringToBytes32(stringKey), arrayValue);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an array via uint256 key ...
                db.PushAddress(uintKey, arrayValue);
            }
            else if(gotStringKey)
            {
                // Set data via string (bytes32 limit) keys ...
                db.setAddress(stringToBytes32(stringKey), indexValue);
            }
            else if(gotUintKey)
            {
                // Set data via uint256 keys ...
                db.SetAddress(uintKey, indexValue);
            }
        }
        else
        {
            if(isArray && gotStringKey)
            {
                // Push an item to an addressed array via string (bytes32 limit) key ...
                db.pushAddressedAddress(addressIndex, stringToBytes32(stringKey), arrayValue);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an addressed array via uint256 key ...
                db.PushAddressedAddress(addressIndex, uintKey, arrayValue);
            }
            else if(gotStringKey)
            {
                // Set addressed data via string (bytes32 limit) keys ...
                db.setAddressedAddress(addressIndex, stringToBytes32(stringKey), indexValue);
            }
            else if(gotUintKey)
            {
                // Set addressed data via uint256 keys ...
                db.SetAddressedAddress(addressIndex, uintKey, indexValue);
            }
        }
    }
}