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
    function setString(bytes32 key, bytes32 value) public view returns(bytes32);
    function setUint(bytes32 key, uint value) public view returns(uint);
    
    // Set data via uint256 keys ...
    function SetAddress(uint256 key, address value) public;
    function SetBool(uint256 key, bool value) public;
    function SetString(uint256 key, bytes32 value) public;
    function SetUint(uint256 key, uint value) public;
    
    // Set data via uint256 and string (bytes32 limit) combined keys ...
    function SetKeyedAddress(uint256 id, bytes32 key, address value) public;
    function SetKeyedBool(uint256 id, bytes32 key, bool value) public;
    function SetKeyedString(uint256 id, bytes32 key, bytes32 value) public;
    function SetKeyedUint(uint256 id, bytes32 key, uint value) public;
    
    // Set addressed data via string (bytes32 limit) keys ...
    function setAddressedAddress(address addressIndex, bytes32 key, address value) public view returns(address);
    function setAddressedBool(address addressIndex, bytes32 key, bool value) public view returns(bool);
    function setAddressedString(address addressIndex, bytes32 key, bytes32 value) public view returns(bytes32);
    function setAddressedRealString(address addressIndex, bytes32 key, bytes32 value) public view returns(string);
    function setAddressedUint(address addressIndex, bytes32 key, uint value) public view returns(uint);
    
    // Set addressed data via uint256 keys ...
    function SetAddressedAddress(address addressIndex, uint256 key, address value) public view returns(address);
    function SetAddressedBool(address addressIndex, uint256 key, bool value) public view returns(bool);
    function SetAddressedString(address addressIndex, uint256 key, bytes32 value) public view returns(bytes32);
    function SetAddressedRealString(address addressIndex, uint256 key, bytes32 value) public view returns(string);
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
    function pushString(bytes32 key, bytes32 value) public;
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
    function PushString(uint256 key, bytes32 value) public;
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
    function pushAddressedString(address addressIndex, bytes32 key, bytes32 value) public;
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
    function PushAddressedString(address addressIndex, uint256 key, bytes32 value) public;
    function PushAddressedUint(address addressIndex, uint256 key, uint value) public;
    
    // Remove an item from an array via string (bytes32 limit) key and uint index ...
    function removeAddress(bytes32 key, uint index) public;
    function removeBool(bytes32 key, uint index) public;
    function removeString(bytes32 key, uint index) public;
    function removeRealString(bytes32 key, uint index) public;
    function removeUint(bytes32 key, uint index) public;
    
    // Remove an item from an addressed array via string (bytes32 limit) key and uint index ...
    function removeAddressedAddress(address addressIndex, bytes32 key, uint index) public;
    function removeAddressedBool(address addressIndex, bytes32 key, uint index) public;
    function removeAddressedString(address addressIndex, bytes32 key, uint index) public;
    function removeAddressedUint(address addressIndex, bytes32 key, uint index) public;
    
    // Remove an item from an array via uint256 key and uint index ...
    function RemoveAddress(uint256 key, uint index) public;
    function RemoveBool(uint256 key, uint index) public;
    function RemoveString(uint256 key, uint index) public;
    function RemoveUint(uint256 key, uint index) public;
    
    // Remove an item from an addressed array via uint256 key and uint index ...
    function RemoveAddressedAddress(address addressIndex, uint256 key, uint index) public;
    function RemoveAddressedBool(address addressIndex, uint256 key, uint index) public;
    function RemoveAddressedString(address addressIndex, uint256 key, uint index) public;
    function RemoveAddressedUint(address addressIndex, uint256 key, uint index) public;
    
    // Update an item from an array via string (bytes32 limit) key and uint index ...
    function updateAddress(bytes32 key, uint index, address value) public;
    function updateBool(bytes32 key, uint index, bool value) public;
    function updateString(bytes32 key, uint index, bytes32 value) public;
    function updateUint(bytes32 key, uint index, uint value) public;
    
    // Update an item from an addressed array via string (bytes32 limit) key and uint index ...
    function updateAddressedAddress(address addressIndex, bytes32 key, uint index, address value) public;
    function updateAddressedBool(address addressIndex, bytes32 key, uint index, bool value) public;
    function updateAddressedString(address addressIndex, bytes32 key, uint index, bytes32 value) public;
    function updateAddressedUint(address addressIndex, bytes32 key, uint index, uint value) public;
    
    // Update an item from an array via uint256 key and uint index ...
    function UpdateAddress(uint256 key, uint index, address value) public;
    function UpdateBool(uint256 key, uint index, bool value) public;
    function UpdateString(uint256 key, uint index, bytes32 value) public;
    function UpdateUint(uint256 key, uint index, uint value) public;
    
    // Update an item from an addressed array via uint256 key and uint index ...
    function UpdateAddressedAddress(address addressIndex, uint256 key, uint index, address value) public;
    function UpdateAddressedBool(address addressIndex, uint256 key, uint index, bool value) public;
    function UpdateAddressedString(address addressIndex, uint256 key, uint index, bytes32 vaue) public;
    function UpdateAddressedUint(address addressIndex, uint256 key, uint index, uint value) public;
    
    /*
    
    TOP TEN COUNTS
    
    ORIGINALLY INSIDE PLANETS.js
    
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
    
    function create(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        address addressValue,
        bool boolValue,
        string stringValue,
        uint uintValue,
        string dataType,
        bool gotStringKey,
        bool gotUintKey,
        bool isArray
    ) 
    public 
    {
        if(stringToBytes32(dataType) == stringToBytes32('address'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedAddress(uintKey, stringToBytes32(stringKey), addressValue);
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.pushAddress(stringToBytes32(stringKey), addressValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.PushAddress(uintKey, addressValue);
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setAddress(stringToBytes32(stringKey), addressValue);
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetAddress(uintKey, addressValue);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.pushAddressedAddress(addressIndex, stringToBytes32(stringKey), addressValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.PushAddressedAddress(addressIndex, uintKey, addressValue);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedAddress(addressIndex, stringToBytes32(stringKey), addressValue);
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedAddress(addressIndex, uintKey, addressValue);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('bool'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedBool(uintKey, stringToBytes32(stringKey), boolValue);
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.pushBool(stringToBytes32(stringKey), boolValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.PushBool(uintKey, boolValue);
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setBool(stringToBytes32(stringKey), boolValue);
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetBool(uintKey, boolValue);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.pushAddressedBool(addressIndex, stringToBytes32(stringKey), boolValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.PushAddressedBool(addressIndex, uintKey, boolValue);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedBool(addressIndex, stringToBytes32(stringKey), boolValue);
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedBool(addressIndex, uintKey, boolValue);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('string'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedString(uintKey, stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.pushString(stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.PushString(uintKey, stringToBytes32(stringValue));
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setString(stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetString(uintKey, stringToBytes32(stringValue));
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.pushAddressedString(addressIndex, stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.PushAddressedString(addressIndex, uintKey, stringToBytes32(stringValue));
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedString(addressIndex, stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedString(addressIndex, uintKey, stringToBytes32(stringValue));
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('uint'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedUint(uintKey, stringToBytes32(stringKey), uintValue);
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.pushUint(stringToBytes32(stringKey), uintValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.PushUint(uintKey, uintValue);
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setUint(stringToBytes32(stringKey), uintValue);
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetUint(uintKey, uintValue);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.pushAddressedUint(addressIndex, stringToBytes32(stringKey), uintValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.PushAddressedUint(addressIndex, uintKey, uintValue);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedUint(addressIndex, stringToBytes32(stringKey), uintValue);
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedUint(addressIndex, uintKey, uintValue);
                }
            }
        }
    }
    
    function readAddress(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public view returns(address)
    {   
        if(addressIndex == 0)
        {
            if(gotStringKey && gotUintKey)
            {
                // Set data via uint256 and string (bytes32 limit) combined keys ...
                return db.GetKeyedAddress(uintKey, stringToBytes32(stringKey));
            }
            else if(isArray && gotStringKey)
            {
                // Push an item to an array via string (bytes32 limit) key ...
                return db.readAddress(stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an array via uint256 key ...
                return db.ReadAddress(uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set data via string (bytes32 limit) keys ...
                return db.getAddress(stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set data via uint256 keys ...
                return db.GetAddress(uintKey);
            }
        }
        else
        {
            if(isArray && gotStringKey)
            {
                // Push an item to an addressed array via string (bytes32 limit) key ...
                return db.readAddressedAddress(addressIndex, stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an addressed array via uint256 key ...
                return db.ReadAddressedAddress(addressIndex, uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set addressed data via string (bytes32 limit) keys ...
                return db.getAddressedAddress(addressIndex, stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set addressed data via uint256 keys ...
                return db.GetAddressedAddress(addressIndex, uintKey);
            }
        }
    }
    
    function readBool(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public view returns(bool)
    {   
        if(addressIndex == 0)
        {
            if(gotStringKey && gotUintKey)
            {
                // Set data via uint256 and string (bytes32 limit) combined keys ...
                return db.GetKeyedBool(uintKey, stringToBytes32(stringKey));
            }
            else if(isArray && gotStringKey)
            {
                // Push an item to an array via string (bytes32 limit) key ...
                return db.readBool(stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an array via uint256 key ...
                return db.ReadBool(uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set data via string (bytes32 limit) keys ...
                return db.getBool(stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set data via uint256 keys ...
                return db.GetBool(uintKey);
            }
        }
        else
        {
            if(isArray && gotStringKey)
            {
                // Push an item to an addressed array via string (bytes32 limit) key ...
                return db.readAddressedBool(addressIndex, stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an addressed array via uint256 key ...
                return db.ReadAddressedBool(addressIndex, uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set addressed data via string (bytes32 limit) keys ...
                return db.getAddressedBool(addressIndex, stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set addressed data via uint256 keys ...
                return db.GetAddressedBool(addressIndex, uintKey);
            }
        }
    }
    
    function readString(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public view returns(bytes32)
    {   
        if(addressIndex == 0)
        {
            if(gotStringKey && gotUintKey)
            {
                // Set data via uint256 and string (bytes32 limit) combined keys ...
                return db.GetKeyedString(uintKey, stringToBytes32(stringKey));
            }
            else if(isArray && gotStringKey)
            {
                // Push an item to an array via string (bytes32 limit) key ...
                return db.readString(stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an array via uint256 key ...
                return db.ReadString(uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set data via string (bytes32 limit) keys ...
                return db.getString(stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set data via uint256 keys ...
                return db.GetString(uintKey);
            }
        }
        else
        {
            if(isArray && gotStringKey)
            {
                // Push an item to an addressed array via string (bytes32 limit) key ...
                return db.readAddressedString(addressIndex, stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an addressed array via uint256 key ...
                return db.ReadAddressedString(addressIndex, uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set addressed data via string (bytes32 limit) keys ...
                return db.getAddressedString(addressIndex, stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set addressed data via uint256 keys ...
                return db.GetAddressedString(addressIndex, uintKey);
            }
        }
    }
    
    function readUint(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public view returns(uint)
    {   
        if(addressIndex == 0)
        {
            if(gotStringKey && gotUintKey)
            {
                // Set data via uint256 and string (bytes32 limit) combined keys ...
                return db.GetKeyedUint(uintKey, stringToBytes32(stringKey));
            }
            else if(isArray && gotStringKey)
            {
                // Push an item to an array via string (bytes32 limit) key ...
                return db.readUint(stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an array via uint256 key ...
                return db.ReadUint(uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set data via string (bytes32 limit) keys ...
                return db.getUint(stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set data via uint256 keys ...
                return db.GetUint(uintKey);
            }
        }
        else
        {
            if(isArray && gotStringKey)
            {
                // Push an item to an addressed array via string (bytes32 limit) key ...
                return db.readAddressedUint(addressIndex, stringToBytes32(stringKey), arrayIndex);
            }
            else if(isArray && gotUintKey)
            {
                // Push an item to an addressed array via uint256 key ...
                return db.ReadAddressedUint(addressIndex, uintKey, arrayIndex);
            }
            else if(gotStringKey)
            {
                // Set addressed data via string (bytes32 limit) keys ...
                return db.getAddressedUint(addressIndex, stringToBytes32(stringKey));
            }
            else if(gotUintKey)
            {
                // Set addressed data via uint256 keys ...
                return db.GetAddressedUint(addressIndex, uintKey);
            }
        }
    }
    
    function read(
        address addressIndex, 
        string dataType,
        string stringKey, 
        uint256 uintKey, 
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public view returns(
        address addressValue,
        bool boolValue,
        bytes32 stringValue,
        uint uintValue
    ){   
        if(stringToBytes32(dataType) == stringToBytes32('address'))
        {
            addressValue = readAddress(
                addressIndex, 
                stringKey, 
                uintKey, 
                gotStringKey,
                gotUintKey,
                isArray,
                arrayIndex
            );
        }
        else if(stringToBytes32(dataType) == stringToBytes32('bool'))
        {
            boolValue = readBool(
                addressIndex, 
                stringKey, 
                uintKey, 
                gotStringKey,
                gotUintKey,
                isArray,
                arrayIndex
            );
        }
        else if(stringToBytes32(dataType) == stringToBytes32('string'))
        {
            stringValue = readString(
                addressIndex, 
                stringKey, 
                uintKey, 
                gotStringKey,
                gotUintKey,
                isArray,
                arrayIndex
            );
        }
        else if(stringToBytes32(dataType) == stringToBytes32('uint'))
        {
            uintValue = readUint(
                addressIndex, 
                stringKey, 
                uintKey, 
                gotStringKey,
                gotUintKey,
                isArray,
                arrayIndex
            );
        }
        return(
            addressValue,
            boolValue,
            stringValue,
            uintValue
        );
    }
    
    function update(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        address addressValue,
        bool boolValue,
        string stringValue,
        uint uintValue,
        string dataType,
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public 
    {
        
        // NEED TO EDIT
        
        if(stringToBytes32(dataType) == stringToBytes32('address'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedAddress(uintKey, stringToBytes32(stringKey), addressValue);
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.updateAddress(stringToBytes32(stringKey), arrayIndex, addressValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.UpdateAddress(uintKey, arrayIndex, addressValue);
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setAddress(stringToBytes32(stringKey), addressValue);
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetAddress(uintKey, addressValue);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.updateAddressedAddress(addressIndex, stringToBytes32(stringKey), arrayIndex, addressValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.UpdateAddressedAddress(addressIndex, uintKey, arrayIndex, addressValue);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedAddress(addressIndex, stringToBytes32(stringKey), addressValue);
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedAddress(addressIndex, uintKey, addressValue);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('bool'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedBool(uintKey, stringToBytes32(stringKey), boolValue);
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.updateBool(stringToBytes32(stringKey), arrayIndex, boolValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.UpdateBool(uintKey, arrayIndex, boolValue);
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setBool(stringToBytes32(stringKey), boolValue);
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetBool(uintKey, boolValue);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.updateAddressedBool(addressIndex, stringToBytes32(stringKey), arrayIndex, boolValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.UpdateAddressedBool(addressIndex, uintKey, arrayIndex, boolValue);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedBool(addressIndex, stringToBytes32(stringKey), boolValue);
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedBool(addressIndex, uintKey, boolValue);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('string'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedString(uintKey, stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.updateString(stringToBytes32(stringKey), arrayIndex, stringToBytes32(stringValue));
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.UpdateString(uintKey, arrayIndex, stringToBytes32(stringValue));
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setString(stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetString(uintKey, stringToBytes32(stringValue));
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.updateAddressedString(addressIndex, stringToBytes32(stringKey), arrayIndex, stringToBytes32(stringValue));
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.UpdateAddressedString(addressIndex, uintKey, arrayIndex, stringToBytes32(stringValue));
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedString(addressIndex, stringToBytes32(stringKey), stringToBytes32(stringValue));
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedString(addressIndex, uintKey, stringToBytes32(stringValue));
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('uint'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Set data via uint256 and string (bytes32 limit) combined keys ...
                    db.SetKeyedUint(uintKey, stringToBytes32(stringKey), uintValue);
                }
                else if(isArray && gotStringKey)
                {
                    // Push an item to an array via string (bytes32 limit) key ...
                    db.updateUint(stringToBytes32(stringKey), arrayIndex, uintValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an array via uint256 key ...
                    db.UpdateUint(uintKey, arrayIndex, uintValue);
                }
                else if(gotStringKey)
                {
                    // Set data via string (bytes32 limit) keys ...
                    db.setUint(stringToBytes32(stringKey), uintValue);
                }
                else if(gotUintKey)
                {
                    // Set data via uint256 keys ...
                    db.SetUint(uintKey, uintValue);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Push an item to an addressed array via string (bytes32 limit) key ...
                    db.updateAddressedUint(addressIndex, stringToBytes32(stringKey), arrayIndex, uintValue);
                }
                else if(isArray && gotUintKey)
                {
                    // Push an item to an addressed array via uint256 key ...
                    db.UpdateAddressedUint(addressIndex, uintKey, arrayIndex, uintValue);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.setAddressedUint(addressIndex, stringToBytes32(stringKey), uintValue);
                }
                else if(gotUintKey)
                {
                    // Set addressed data via uint256 keys ...
                    db.SetAddressedUint(addressIndex, uintKey, uintValue);
                }
            }
        }
    }
    
    function destroy(
        address addressIndex, 
        string stringKey, 
        uint256 uintKey, 
        string dataType,
        bool gotStringKey,
        bool gotUintKey,
        bool isArray,
        uint arrayIndex
    ) 
    public 
    {
        
        // NEED TO EDIT
        
        if(stringToBytes32(dataType) == stringToBytes32('address'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Remove data via uint256 and string (bytes32 limit) combined keys ...
                    db.DeleteKeyedAddress(uintKey, stringToBytes32(stringKey));
                }
                else if(isArray && gotStringKey)
                {
                    // Remove an item to an array via string (bytes32 limit) key ...
                    db.removeAddress(stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an array via uint256 key ...
                    db.RemoveAddress(uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove data via string (bytes32 limit) keys ...
                    db.deleteAddress(stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove data via uint256 keys ...
                    db.DeleteAddress(uintKey);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Remove an item to an addressed array via string (bytes32 limit) key ...
                    db.removeAddressedAddress(addressIndex, stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an addressed array via uint256 key ...
                    db.RemoveAddressedAddress(addressIndex, uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Set addressed data via string (bytes32 limit) keys ...
                    db.deleteAddressedAddress(addressIndex, stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove addressed data via uint256 keys ...
                    db.DeleteAddressedAddress(addressIndex, uintKey);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('bool'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Remove data via uint256 and string (bytes32 limit) combined keys ...
                    db.DeleteKeyedBool(uintKey, stringToBytes32(stringKey));
                }
                else if(isArray && gotStringKey)
                {
                    // Remove an item to an array via string (bytes32 limit) key ...
                    db.removeBool(stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an array via uint256 key ...
                    db.RemoveBool(uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove data via string (bytes32 limit) keys ...
                    db.deleteBool(stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove data via uint256 keys ...
                    db.DeleteBool(uintKey);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Remove an item to an addressed array via string (bytes32 limit) key ...
                    db.removeAddressedBool(addressIndex, stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an addressed array via uint256 key ...
                    db.RemoveAddressedBool(addressIndex, uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove addressed data via string (bytes32 limit) keys ...
                    db.deleteAddressedBool(addressIndex, stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove addressed data via uint256 keys ...
                    db.DeleteAddressedBool(addressIndex, uintKey);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('string'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Remove data via uint256 and string (bytes32 limit) combined keys ...
                    db.DeleteKeyedString(uintKey, stringToBytes32(stringKey));
                }
                else if(isArray && gotStringKey)
                {
                    // Remove an item to an array via string (bytes32 limit) key ...
                    db.removeString(stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an array via uint256 key ...
                    db.RemoveString(uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove data via string (bytes32 limit) keys ...
                    db.deleteString(stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove data via uint256 keys ...
                    db.DeleteString(uintKey);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Remove an item to an addressed array via string (bytes32 limit) key ...
                    db.removeAddressedString(addressIndex, stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an addressed array via uint256 key ...
                    db.RemoveAddressedString(addressIndex, uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove addressed data via string (bytes32 limit) keys ...
                    db.deleteAddressedString(addressIndex, stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove addressed data via uint256 keys ...
                    db.DeleteAddressedString(addressIndex, uintKey);
                }
            }
        }
        else if(stringToBytes32(dataType) == stringToBytes32('uint'))
        {
            if(addressIndex == 0)
            {
                if(gotStringKey && gotUintKey)
                {
                    // Remove data via uint256 and string (bytes32 limit) combined keys ...
                    db.DeleteKeyedUint(uintKey, stringToBytes32(stringKey));
                }
                else if(isArray && gotStringKey)
                {
                    // Remove an item to an array via string (bytes32 limit) key ...
                    db.removeUint(stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an array via uint256 key ...
                    db.RemoveUint(uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove data via string (bytes32 limit) keys ...
                    db.deleteUint(stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove data via uint256 keys ...
                    db.DeleteUint(uintKey);
                }
            }
            else
            {
                if(isArray && gotStringKey)
                {
                    // Remove an item to an addressed array via string (bytes32 limit) key ...
                    db.removeAddressedUint(addressIndex, stringToBytes32(stringKey), arrayIndex);
                }
                else if(isArray && gotUintKey)
                {
                    // Remove an item to an addressed array via uint256 key ...
                    db.RemoveAddressedUint(addressIndex, uintKey, arrayIndex);
                }
                else if(gotStringKey)
                {
                    // Remove addressed data via string (bytes32 limit) keys ...
                    db.deleteAddressedUint(addressIndex, stringToBytes32(stringKey));
                }
                else if(gotUintKey)
                {
                    // Remove addressed data via uint256 keys ...
                    db.DeleteAddressedUint(addressIndex, uintKey);
                }
            }
        }
    }
}