pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0xAe3533756dD070CD4A3F53837359e7067a244384 = 0.84

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

contract BoolDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(bytes32 => mapping(bytes32 => bool))) BoolBytes32;
    mapping(address => mapping(bytes32 => mapping(uint256 => bool))) BoolUint256;
    mapping(address => mapping(bytes32 => mapping(bytes32 => bool[]))) BoolBytes32Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => bool[]))) BoolUint256Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bool)))) BoolKeys;
    
    // KEY COUNTS
    uint BoolBytes32Count;
    uint BoolUint256Count;
    uint BoolBytes32ArraysCount;
    uint BoolUint256ArraysCount;
    uint BoolKeysCount;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][version][key] == boolNull);
        BoolBytes32[msg.sender][version][key] = value;
        BoolBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(bytes32 version, bytes32 key, bool boolNull) public view returns(bool)
    {
        require(BoolBytes32[msg.sender][version][key] != boolNull);
        return BoolBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][version][key] != boolNull);
        BoolBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(bytes32 version, bytes32 key, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][version][key] != boolNull);
        delete BoolBytes32[msg.sender][version][key];
        BoolBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        require(BoolUint256[msg.sender][version][key] == boolNull);
        BoolUint256[msg.sender][version][key] = value;
        BoolUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(bytes32 version, uint256 key, bool boolNull) public view returns(bool)
    {
        require(BoolUint256[msg.sender][version][key] != boolNull);
        return BoolUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        require(BoolUint256[msg.sender][version][key] != boolNull);
        BoolUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(bytes32 version, uint256 key, bool boolNull) public
    {
        require(BoolUint256[msg.sender][version][key] != boolNull);
        delete BoolUint256[msg.sender][version][key];
        BoolUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolBytes32Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            BoolBytes32Arrays[msg.sender][version][key].push(boolNull);
        }
        BoolBytes32ArraysCount++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(bytes32 version, bytes32 key, uint index, bool boolNull) public view returns(bool)
    {
        require(BoolBytes32Arrays[msg.sender][version][key][index] != boolNull);
        return BoolBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(bytes32 version, bytes32 key, uint index, bool value, bool boolNull) public
    {
        require(BoolBytes32Arrays[msg.sender][version][key][index] != boolNull);
        BoolBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(bytes32 version, bytes32 key, uint index, bool boolNull) public
    {
        uint len = BoolBytes32Arrays[msg.sender][version][key].length;
        bool gotItems;
        if(len > 0)
        {
            gotItems = true;
        }
        if(gotItems > boolNull)
        {
            bool swapped = BoolBytes32Arrays[msg.sender][version][key][len - 1];
            BoolBytes32Arrays[msg.sender][version][key][index] = swapped;
            BoolBytes32Arrays[msg.sender][version][key].length--;
            BoolBytes32ArraysCount--;
        }
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolUint256Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            BoolUint256Arrays[msg.sender][version][key].push(boolNull);
        }
        BoolUint256ArraysCount++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(bytes32 version, uint256 key, uint index, bool boolNull) public view returns(bool)
    {
        require(BoolUint256Arrays[msg.sender][version][key][index] != boolNull);
        return BoolUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(bytes32 version, uint256 key, uint index, bool value, bool boolNull) public
    {
        require(BoolUint256Arrays[msg.sender][version][key][index] != boolNull);
        BoolUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(bytes32 version, uint256 key, uint index, bool boolNull) public
    {
        uint len = BoolUint256Arrays[msg.sender][version][key].length;
        bool gotItems;
        if(len > 0)
        {
            gotItems = true;
        }
        if(gotItems > boolNull)
        {
            bool swapped = BoolUint256Arrays[msg.sender][version][key][len - 1];
            BoolUint256Arrays[msg.sender][version][key][index] = swapped;
            BoolUint256Arrays[msg.sender][version][key].length--;
            BoolUint256ArraysCount--;
        }
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolBytes32[msg.sender][version][key] = value;
        }
        else
        {
            BoolBytes32[msg.sender][version][key] = boolNull;
        }
        BoolBytes32Count++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolUint256[msg.sender][version][key] = value;
        }
        else
        {
            BoolUint256[msg.sender][version][key] = boolNull;
        }
        BoolUint256Count++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(bytes32 version, uint256 key, bytes32 index, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolKeys[msg.sender][version][key][index] = value;
        }
        else
        {
            BoolKeys[msg.sender][version][key][index] = boolNull;
        }
        BoolKeysCount++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(bytes32 version, uint256 key, bytes32 index, bool boolNull) public view returns(bool)
    {
        require(BoolKeys[msg.sender][version][key][index] != boolNull);
        return BoolKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(bytes32 version, uint256 key, bytes32 index, bool boolNull) public
    {
        require(BoolKeys[msg.sender][version][key][index] != boolNull);
        delete BoolKeys[msg.sender][version][key][index];
        BoolKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function boolBytes32Count() public view returns(uint)
    {
        return BoolBytes32Count;
    }
    function boolUint256Count() public view returns(uint)
    {
        return BoolUint256Count;
    }
    function boolBytes32ArrayCount() public view returns(uint)
    {
        return BoolBytes32ArraysCount;
    }
    function boolUint256ArrayCount() public view returns(uint)
    {
        return BoolUint256ArraysCount;
    }
    function boolKeyCount() public view returns(uint)
    {
        return BoolKeysCount;
    }
}

contract BoolsDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => bool)))) BoolBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => bool)))) BoolUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => bool[])))) BoolBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => bool[])))) BoolUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bool))))) BoolKeys;
    
    // KEY COUNTS
    mapping(address => uint) BoolBytes32Counts;
    mapping(address => uint) BoolUint256Counts;
    mapping(address => uint) BoolBytes32ArraysCounts;
    mapping(address => uint) BoolUint256ArraysCounts;
    mapping(address => uint) BoolKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][addressIndex][version][key] == boolNull);
        BoolBytes32[msg.sender][addressIndex][version][key] = value;
        BoolBytes32Counts[addressIndex]++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, bool boolNull) public view returns(bool)
    {
        require(BoolBytes32[msg.sender][addressIndex][version][key] != boolNull);
        return BoolBytes32[msg.sender][addressIndex][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][addressIndex][version][key] != boolNull);
        BoolBytes32[msg.sender][addressIndex][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][addressIndex][version][key] != boolNull);
        delete BoolBytes32[msg.sender][addressIndex][version][key];
        BoolBytes32Counts[addressIndex]--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        require(BoolUint256[msg.sender][addressIndex][version][key] == boolNull);
        BoolUint256[msg.sender][addressIndex][version][key] = value;
        BoolUint256Counts[addressIndex]++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, bool boolNull) public view returns(bool)
    {
        require(BoolUint256[msg.sender][addressIndex][version][key] != boolNull);
        return BoolUint256[msg.sender][addressIndex][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        require(BoolUint256[msg.sender][addressIndex][version][key] != boolNull);
        BoolUint256[msg.sender][addressIndex][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, bool boolNull) public
    {
        require(BoolUint256[msg.sender][addressIndex][version][key] != boolNull);
        delete BoolUint256[msg.sender][addressIndex][version][key];
        BoolUint256Counts[addressIndex]--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolBytes32Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            BoolBytes32Arrays[msg.sender][addressIndex][version][key].push(boolNull);
        }
        BoolBytes32ArraysCounts[addressIndex]++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, bool boolNull) public view returns(bool)
    {
        require(BoolBytes32Arrays[msg.sender][addressIndex][version][key][index] != boolNull);
        return BoolBytes32Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, bool value, bool boolNull) public
    {
        require(BoolBytes32Arrays[msg.sender][addressIndex][version][key][index] != boolNull);
        BoolBytes32Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, bool boolNull) public
    {
        uint len = BoolBytes32Arrays[msg.sender][addressIndex][version][key].length;
        bool gotItems;
        if(len > 0)
        {
            gotItems = true;
        }
        if(gotItems > boolNull)
        {
            bool swapped = BoolBytes32Arrays[msg.sender][addressIndex][version][key][len - 1];
            BoolBytes32Arrays[msg.sender][addressIndex][version][key][index] = swapped;
            BoolBytes32Arrays[msg.sender][addressIndex][version][key].length--;
            BoolBytes32ArraysCounts[addressIndex]--;
        }
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolUint256Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            BoolUint256Arrays[msg.sender][addressIndex][version][key].push(boolNull);
        }
        BoolUint256ArraysCounts[addressIndex]++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, bool boolNull) public view returns(bool)
    {
        require(BoolUint256Arrays[msg.sender][addressIndex][version][key][index] != boolNull);
        return BoolUint256Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, bool value, bool boolNull) public
    {
        require(BoolUint256Arrays[msg.sender][addressIndex][version][key][index] != boolNull);
        BoolUint256Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, bool boolNull) public
    {
        uint len = BoolUint256Arrays[msg.sender][addressIndex][version][key].length;
        bool gotItems;
        if(len > 0)
        {
            gotItems = true;
        }
        if(gotItems > boolNull)
        {
            bool swapped = BoolUint256Arrays[msg.sender][addressIndex][version][key][len - 1];
            BoolUint256Arrays[msg.sender][addressIndex][version][key][index] = swapped;
            BoolUint256Arrays[msg.sender][addressIndex][version][key].length--;
            BoolUint256ArraysCounts[addressIndex]--;
        }
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolBytes32[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            BoolBytes32[msg.sender][addressIndex][version][key] = boolNull;
        }
        BoolBytes32Counts[addressIndex]++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolUint256[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            BoolUint256[msg.sender][addressIndex][version][key] = boolNull;
        }
        BoolUint256Counts[addressIndex]++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool value, bool boolNull) public
    {
        if(value != boolNull)
        {
            BoolKeys[msg.sender][addressIndex][version][key][index] = value;
        }
        else
        {
            BoolKeys[msg.sender][addressIndex][version][key][index] = boolNull;
        }
        BoolKeysCounts[addressIndex]++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool boolNull) public view returns(bool)
    {
        require(BoolKeys[msg.sender][addressIndex][version][key][index] != boolNull);
        return BoolKeys[msg.sender][addressIndex][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool boolNull) public
    {
        require(BoolKeys[msg.sender][addressIndex][version][key][index] != boolNull);
        delete BoolKeys[msg.sender][addressIndex][version][key][index];
        BoolKeysCounts[addressIndex]--;
    }
    
    /*
    
    COUNTS
    
    */
    function boolBytes32Counts(address addressIndex) public view returns(uint)
    {
        return BoolBytes32Counts[addressIndex];
    }
    function boolUint256Counts(address addressIndex) public view returns(uint)
    {
        return BoolUint256Counts[addressIndex];
    }
    function boolBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return BoolBytes32ArraysCounts[addressIndex];
    }
    function boolUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return BoolUint256ArraysCounts[addressIndex];
    }
    function boolKeyCounts(address addressIndex) public view returns(uint)
    {
        return BoolKeysCounts[addressIndex];
    }
}

contract EverstoreBools is BoolDB, BoolsDB
{   
    /* 
    
    BASIC KEY VALUE COUNTS 
    
    */
    function boolCount() public view returns(uint)
    {
        return boolBytes32Count();
    }
    function BoolCount() public view returns(uint)
    {
        return boolUint256Count();
    }
    function boolArrayCount() public view returns(uint)
    {
        return boolBytes32ArrayCount();
    }
    function BoolArrayCount() public view returns(uint)
    {
        return boolUint256ArrayCount();
    }
    function BoolKeyCount() public view returns(uint)
    {
        return boolKeyCount();
    }
    /* 
    
    ADDRESSED KEY VALUE COUNTS 
    
    */
    function boolCounts(address addressIndex) public view returns(uint)
    {
        return boolBytes32Counts(addressIndex);
    }
    function BoolCounts(address addressIndex) public view returns(uint)
    {
        return boolUint256Counts(addressIndex);
    }
    function boolArrayCounts(address addressIndex) public view returns(uint)
    {
        return boolBytes32ArrayCounts(addressIndex);
    }
    function BoolArrayCounts(address addressIndex) public view returns(uint)
    {
        return boolUint256ArrayCounts(addressIndex);
    }
    function BoolKeyCounts(address addressIndex) public view returns(uint)
    {
        return boolKeyCounts(addressIndex);
    }
}