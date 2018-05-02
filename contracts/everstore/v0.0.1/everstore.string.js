pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x0ed2E6F5E46E62939831F4013611e1f065c827ab = 0.96

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

// Basic Keys & Values

contract StringDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32))) StringBytes32;
    mapping(address => mapping(bytes32 => mapping(uint256 => bytes32))) StringUint256;
    mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32[]))) StringBytes32Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => bytes32[]))) StringUint256Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bytes32)))) StringKeys;
    
    // KEY COUNTS
    uint StringBytes32Count;
    uint StringUint256Count;
    uint StringBytes32ArraysCount;
    uint StringUint256ArraysCount;
    uint StringKeysCount;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        require(value == stringToBytes32(stringNull));
        StringBytes32[msg.sender][version][key] = value;
        StringBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(bytes32 version, bytes32 key, string stringNull) public view returns(bytes32)
    {
        require(StringBytes32[msg.sender][version][key] != stringToBytes32(stringNull));
        return StringBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        require(StringBytes32[msg.sender][version][key] != stringToBytes32(stringNull));
        StringBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(bytes32 version, bytes32 key, string stringNull) public
    {
        require(StringBytes32[msg.sender][version][key] != stringToBytes32(stringNull));
        delete StringBytes32[msg.sender][version][key];
        StringBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        require(StringUint256[msg.sender][version][key] == stringToBytes32(stringNull));
        StringUint256[msg.sender][version][key] = value;
        StringUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(bytes32 version, uint256 key, string stringNull) public view returns(bytes32)
    {
        require(StringUint256[msg.sender][version][key] != stringToBytes32(stringNull));
        return StringUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        require(StringUint256[msg.sender][version][key] != stringToBytes32(stringNull));
        StringUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(bytes32 version, uint256 key, string stringNull) public
    {
        require(StringUint256[msg.sender][version][key] != stringToBytes32(stringNull));
        delete StringUint256[msg.sender][version][key];
        StringUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringBytes32Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            StringBytes32Arrays[msg.sender][version][key].push(stringToBytes32(stringNull));
        }
        StringBytes32ArraysCount++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(bytes32 version, bytes32 key, uint index, string stringNull) public view returns(bytes32)
    {
        require(StringBytes32Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        return StringBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(bytes32 version, bytes32 key, uint index, bytes32 value, string stringNull) public
    {
        require(StringBytes32Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        StringBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(bytes32 version, bytes32 key, uint index, string stringNull) public
    {
        require(StringBytes32Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        uint len = StringBytes32Arrays[msg.sender][version][key].length;
        bytes32 swapped = StringBytes32Arrays[msg.sender][version][key][len - 1];
        StringBytes32Arrays[msg.sender][version][key][index] = swapped;
        StringBytes32Arrays[msg.sender][version][key].length--;
        StringBytes32ArraysCount--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringUint256Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            StringUint256Arrays[msg.sender][version][key].push(stringToBytes32(stringNull));
        }
        StringUint256ArraysCount++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(bytes32 version, uint256 key, uint index, string stringNull) public view returns(bytes32)
    {
        require(StringUint256Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        return StringUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(bytes32 version, uint256 key, uint index, bytes32 value, string stringNull) public
    {
        require(StringUint256Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        StringUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(bytes32 version, uint256 key, uint index, string stringNull) public
    {
        require(StringUint256Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        uint len = StringUint256Arrays[msg.sender][version][key].length;
        bytes32 swapped = StringUint256Arrays[msg.sender][version][key][len - 1];
        StringUint256Arrays[msg.sender][version][key][index] = swapped;
        StringUint256Arrays[msg.sender][version][key].length--;
        StringUint256ArraysCount--;
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringBytes32[msg.sender][version][key] = value;
        }
        else
        {
            StringBytes32[msg.sender][version][key] = stringToBytes32(stringNull);
        }
        StringBytes32Count++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringUint256[msg.sender][version][key] = value;
        }
        else
        {
            StringUint256[msg.sender][version][key] = stringToBytes32(stringNull);
        }
        StringUint256Count++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(bytes32 version, uint256 key, bytes32 index, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringKeys[msg.sender][version][key][index] = value;
        }
        else
        {
            StringKeys[msg.sender][version][key][index] = stringToBytes32(stringNull);
        }
        StringKeysCount++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(bytes32 version, uint256 key, bytes32 index, string stringNull) public view returns(bytes32)
    {
        require(StringKeys[msg.sender][version][key][index] != stringToBytes32(stringNull));
        return StringKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(bytes32 version, uint256 key, bytes32 index, string stringNull) public
    {
        require(StringKeys[msg.sender][version][key][index] != stringToBytes32(stringNull));
        delete StringKeys[msg.sender][version][key][index];
        StringKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function stringBytes32Count() public view returns(uint)
    {
        return StringBytes32Count;
    }
    function stringUint256Count() public view returns(uint)
    {
        return StringUint256Count;
    }
    function stringBytes32ArrayCount() public view returns(uint)
    {
        return StringBytes32ArraysCount;
    }
    function stringUint256ArrayCount() public view returns(uint)
    {
        return StringUint256ArraysCount;
    }
    function stringKeyCount() public view returns(uint)
    {
        return StringKeysCount;
    }
}

/*

ADDRESSED KEY VALUES

*/
contract StringsDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32)))) StringBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => bytes32)))) StringUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32[])))) StringBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => bytes32[])))) StringUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bytes32))))) StringKeys;
    
    // KEY COUNTS
    mapping(address => uint) StringBytes32Counts;
    mapping(address => uint) StringUint256Counts;
    mapping(address => uint) StringBytes32ArraysCounts;
    mapping(address => uint) StringUint256ArraysCounts;
    mapping(address => uint) StringKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        require(value == stringToBytes32(stringNull));
        StringBytes32[msg.sender][addressIndex][version][key] = value;
        StringBytes32Counts[addressIndex]++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, string stringNull) public view returns(bytes32)
    {
        require(StringBytes32[msg.sender][addressIndex][version][key] != stringToBytes32(stringNull));
        return StringBytes32[msg.sender][addressIndex][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        require(StringBytes32[msg.sender][addressIndex][version][key] != stringToBytes32(stringNull));
        StringBytes32[msg.sender][addressIndex][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, string stringNull) public
    {
        require(StringBytes32[msg.sender][addressIndex][version][key] != stringToBytes32(stringNull));
        delete StringBytes32[msg.sender][addressIndex][version][key];
        StringBytes32Counts[addressIndex]--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        require(StringUint256[msg.sender][addressIndex][version][key] == stringToBytes32(stringNull));
        StringUint256[msg.sender][addressIndex][version][key] = value;
        StringUint256Counts[addressIndex]++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, string stringNull) public view returns(bytes32)
    {
        require(StringUint256[msg.sender][addressIndex][version][key] != stringToBytes32(stringNull));
        return StringUint256[msg.sender][addressIndex][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        require(StringUint256[msg.sender][addressIndex][version][key] != stringToBytes32(stringNull));
        StringUint256[msg.sender][addressIndex][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, string stringNull) public
    {
        require(StringUint256[msg.sender][addressIndex][version][key] != stringToBytes32(stringNull));
        delete StringUint256[msg.sender][addressIndex][version][key];
        StringUint256Counts[addressIndex]--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringBytes32Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            StringBytes32Arrays[msg.sender][addressIndex][version][key].push(stringToBytes32(stringNull));
        }
        StringBytes32ArraysCounts[addressIndex]++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, string stringNull) public view returns(bytes32)
    {
        require(StringBytes32Arrays[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        return StringBytes32Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, bytes32 value, string stringNull) public
    {
        require(StringBytes32Arrays[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        StringBytes32Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, string stringNull) public
    {
        require(StringBytes32Arrays[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        uint len = StringBytes32Arrays[msg.sender][addressIndex][version][key].length;
        bytes32 swapped = StringBytes32Arrays[msg.sender][addressIndex][version][key][len - 1];
        StringBytes32Arrays[msg.sender][addressIndex][version][key][index] = swapped;
        StringBytes32Arrays[msg.sender][addressIndex][version][key].length--;
        StringBytes32ArraysCounts[addressIndex]--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringUint256Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            StringUint256Arrays[msg.sender][addressIndex][version][key].push(stringToBytes32(stringNull));
        }
        StringUint256ArraysCounts[addressIndex]++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, string stringNull) public view returns(bytes32)
    {
        require(StringUint256Arrays[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        return StringUint256Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, bytes32 value, string stringNull) public
    {
        require(StringUint256Arrays[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        StringUint256Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, string stringNull) public
    {
        require(StringUint256Arrays[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        uint len = StringUint256Arrays[msg.sender][addressIndex][version][key].length;
        bytes32 swapped = StringUint256Arrays[msg.sender][addressIndex][version][key][len - 1];
        StringUint256Arrays[msg.sender][addressIndex][version][key][index] = swapped;
        StringUint256Arrays[msg.sender][addressIndex][version][key].length--;
        StringUint256ArraysCounts[addressIndex]--;
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringBytes32[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            StringBytes32[msg.sender][addressIndex][version][key] = stringToBytes32(stringNull);
        }
        StringBytes32Counts[addressIndex]++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringUint256[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            StringUint256[msg.sender][addressIndex][version][key] = stringToBytes32(stringNull);
        }
        StringUint256Counts[addressIndex]++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, bytes32 value, string stringNull) public
    {
        if(value != stringToBytes32(stringNull))
        {
            StringKeys[msg.sender][addressIndex][version][key][index] = value;
        }
        else
        {
            StringKeys[msg.sender][addressIndex][version][key][index] = stringToBytes32(stringNull);
        }
        StringKeysCounts[addressIndex]++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, string stringNull) public view returns(bytes32)
    {
        require(StringKeys[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        return StringKeys[msg.sender][addressIndex][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, string stringNull) public
    {
        require(StringKeys[msg.sender][addressIndex][version][key][index] != stringToBytes32(stringNull));
        delete StringKeys[msg.sender][addressIndex][version][key][index];
        StringKeysCounts[addressIndex]--;
    }
    
    /*
    
    COUNTS
    
    */
    function stringBytes32Counts(address addressIndex) public view returns(uint)
    {
        return StringBytes32Counts[addressIndex];
    }
    function stringUint256Counts(address addressIndex) public view returns(uint)
    {
        return StringUint256Counts[addressIndex];
    }
    function stringBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return StringBytes32ArraysCounts[addressIndex];
    }
    function stringUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return StringUint256ArraysCounts[addressIndex];
    }
    function stringKeyCounts(address addressIndex) public view returns(uint)
    {
        return StringKeysCounts[addressIndex];
    }
}

contract EverstoreStrings is StringDB, StringsDB
{   
    /* 
    
    BASIC KEY VALUE COUNTS 
    
    */
    function stringCount() public view returns(uint)
    {
        return stringBytes32Count();
    }
    function StringCount() public view returns(uint)
    {
        return stringUint256Count();
    }
    function stringArrayCount() public view returns(uint)
    {
        return stringBytes32ArrayCount();
    }
    function StringArrayCount() public view returns(uint)
    {
        return stringUint256ArrayCount();
    }
    function StringKeyCount() public view returns(uint)
    {
        return stringKeyCount();
    }
    /* 
    
    ADDRESSED KEY VALUE COUNTS 
    
    */
    function stringCounts(address addressIndex) public view returns(uint)
    {
        return stringBytes32Counts(addressIndex);
    }
    function StringCounts(address addressIndex) public view returns(uint)
    {
        return stringUint256Counts(addressIndex);
    }
    function stringArrayCounts(address addressIndex) public view returns(uint)
    {
        return stringBytes32ArrayCounts(addressIndex);
    }
    function StringArrayCounts(address addressIndex) public view returns(uint)
    {
        return stringUint256ArrayCounts(addressIndex);
    }
    function StringKeyCounts(address addressIndex) public view returns(uint)
    {
        return stringKeyCounts(addressIndex);
    }
}