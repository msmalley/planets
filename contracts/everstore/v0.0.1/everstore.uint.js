pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x67754Ade773003A4B643a263095B94090236E558 = 0.75

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

contract UintDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(bytes32 => mapping(bytes32 => uint256))) UintBytes32;
    mapping(address => mapping(bytes32 => mapping(uint256 => uint256))) UintUint256;
    mapping(address => mapping(bytes32 => mapping(bytes32 => uint256[]))) UintBytes32Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => uint256[]))) UintUint256Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => uint256)))) UintKeys;
    
    // KEY COUNTS
    uint UintBytes32Count;
    uint UintUint256Count;
    uint UintBytes32ArraysCount;
    uint UintUint256ArraysCount;
    uint UintKeysCount;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        require(UintBytes32[msg.sender][version][key] == uintNull);
        UintBytes32[msg.sender][version][key] = value;
        UintBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(bytes32 version, bytes32 key, uint uintNull) public view returns(uint256)
    {
        require(UintBytes32[msg.sender][version][key] != uintNull);
        return UintBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        require(UintBytes32[msg.sender][version][key] != uintNull);
        UintBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(bytes32 version, bytes32 key, uint uintNull) public
    {
        require(UintBytes32[msg.sender][version][key] != uintNull);
        delete UintBytes32[msg.sender][version][key];
        UintBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        require(UintUint256[msg.sender][version][key] == uintNull);
        UintUint256[msg.sender][version][key] = value;
        UintUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(bytes32 version, uint256 key, uint uintNull) public view returns(uint256)
    {
        require(UintUint256[msg.sender][version][key] != uintNull);
        return UintUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        require(UintUint256[msg.sender][version][key] != uintNull);
        UintUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(bytes32 version, uint256 key, uint uintNull) public
    {
        require(UintUint256[msg.sender][version][key] != uintNull);
        delete UintUint256[msg.sender][version][key];
        UintUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintBytes32Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            UintBytes32Arrays[msg.sender][version][key].push(uintNull);
        }
        UintBytes32ArraysCount++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(bytes32 version, bytes32 key, uint index, uint uintNull) public view returns(uint256)
    {
        require(UintBytes32Arrays[msg.sender][version][key][index] != uintNull);
        return UintBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(bytes32 version, bytes32 key, uint index, uint256 value, uint uintNull) public
    {
        require(UintBytes32Arrays[msg.sender][version][key][index] != uintNull);
        UintBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(bytes32 version, bytes32 key, uint index, uint uintNull) public
    {
        require(UintBytes32Arrays[msg.sender][version][key][index] != uintNull);
        uint len = UintBytes32Arrays[msg.sender][version][key].length;
        uint256 swapped = UintBytes32Arrays[msg.sender][version][key][len - 1];
        UintBytes32Arrays[msg.sender][version][key][index] = swapped;
        UintBytes32Arrays[msg.sender][version][key].length--;
        UintBytes32ArraysCount--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintUint256Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            UintUint256Arrays[msg.sender][version][key].push(uintNull);
        }
        UintUint256ArraysCount++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(bytes32 version, uint256 key, uint index, uint uintNull) public view returns(uint256)
    {
        require(UintUint256Arrays[msg.sender][version][key][index] != uintNull);
        return UintUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(bytes32 version, uint256 key, uint index, uint256 value, uint uintNull) public
    {
        require(UintUint256Arrays[msg.sender][version][key][index] != uintNull);
        UintUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(bytes32 version, uint256 key, uint index, uint uintNull) public
    {
        require(UintUint256Arrays[msg.sender][version][key][index] != uintNull);
        uint len = UintUint256Arrays[msg.sender][version][key].length;
        uint256 swapped = UintUint256Arrays[msg.sender][version][key][len - 1];
        UintUint256Arrays[msg.sender][version][key][index] = swapped;
        UintUint256Arrays[msg.sender][version][key].length--;
        UintUint256ArraysCount--;
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintBytes32[msg.sender][version][key] = value;
        }
        else
        {
            UintBytes32[msg.sender][version][key] = uintNull;
        }
        UintBytes32Count++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintUint256[msg.sender][version][key] = value;
        }
        else
        {
            UintUint256[msg.sender][version][key] = uintNull;
        }
        UintUint256Count++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(bytes32 version, uint256 key, bytes32 index, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintKeys[msg.sender][version][key][index] = value;
        }
        else
        {
            UintKeys[msg.sender][version][key][index] = uintNull;
        }
        UintKeysCount++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(bytes32 version, uint256 key, bytes32 index, uint uintNull) public view returns(uint256)
    {
        require(UintKeys[msg.sender][version][key][index] != uintNull);
        return UintKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(bytes32 version, uint256 key, bytes32 index, uint uintNull) public
    {
        require(UintKeys[msg.sender][version][key][index] != uintNull);
        delete UintKeys[msg.sender][version][key][index];
        UintKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function uintBytes32Count() public view returns(uint)
    {
        return UintBytes32Count;
    }
    function uintUint256Count() public view returns(uint)
    {
        return UintUint256Count;
    }
    function uintBytes32ArrayCount() public view returns(uint)
    {
        return UintBytes32ArraysCount;
    }
    function uintUint256ArrayCount() public view returns(uint)
    {
        return UintUint256ArraysCount;
    }
    function uintKeyCount() public view returns(uint)
    {
        return UintKeysCount;
    }
}

/*

ADDRESSED KEY VALUES

*/
contract UintsDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => uint256)))) UintBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => uint256)))) UintUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => uint256[])))) UintBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => uint256[])))) UintUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => uint256))))) UintKeys;
    
    // KEY COUNTS
    mapping(address => uint) UintBytes32Counts;
    mapping(address => uint) UintUint256Counts;
    mapping(address => uint) UintBytes32ArraysCounts;
    mapping(address => uint) UintUint256ArraysCounts;
    mapping(address => uint) UintKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        require(UintBytes32[msg.sender][addressIndex][version][key] == uintNull);
        UintBytes32[msg.sender][addressIndex][version][key] = value;
        UintBytes32Counts[addressIndex]++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, uint uintNull) public view returns(uint256)
    {
        require(UintBytes32[msg.sender][addressIndex][version][key] != uintNull);
        return UintBytes32[msg.sender][addressIndex][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        require(UintBytes32[msg.sender][addressIndex][version][key] != uintNull);
        UintBytes32[msg.sender][addressIndex][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, uint uintNull) public
    {
        require(UintBytes32[msg.sender][addressIndex][version][key] != uintNull);
        delete UintBytes32[msg.sender][addressIndex][version][key];
        UintBytes32Counts[addressIndex]--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        require(UintUint256[msg.sender][addressIndex][version][key] == uintNull);
        UintUint256[msg.sender][addressIndex][version][key] = value;
        UintUint256Counts[addressIndex]++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, uint uintNull) public view returns(uint256)
    {
        require(UintUint256[msg.sender][addressIndex][version][key] != uintNull);
        return UintUint256[msg.sender][addressIndex][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        require(UintUint256[msg.sender][addressIndex][version][key] != uintNull);
        UintUint256[msg.sender][addressIndex][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, uint uintNull) public
    {
        require(UintUint256[msg.sender][addressIndex][version][key] != uintNull);
        delete UintUint256[msg.sender][addressIndex][version][key];
        UintUint256Counts[addressIndex]--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintBytes32Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            UintBytes32Arrays[msg.sender][addressIndex][version][key].push(uintNull);
        }
        UintBytes32ArraysCounts[addressIndex]++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, uint uintNull) public view returns(uint256)
    {
        require(UintBytes32Arrays[msg.sender][addressIndex][version][key][index] != uintNull);
        return UintBytes32Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, uint256 value, uint uintNull) public
    {
        require(UintBytes32Arrays[msg.sender][addressIndex][version][key][index] != uintNull);
        UintBytes32Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, uint uintNull) public
    {
        require(UintBytes32Arrays[msg.sender][addressIndex][version][key][index] != uintNull);
        uint len = UintBytes32Arrays[msg.sender][addressIndex][version][key].length;
        uint256 swapped = UintBytes32Arrays[msg.sender][addressIndex][version][key][len - 1];
        UintBytes32Arrays[msg.sender][addressIndex][version][key][index] = swapped;
        UintBytes32Arrays[msg.sender][addressIndex][version][key].length--;
        UintBytes32ArraysCounts[addressIndex]--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintUint256Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            UintUint256Arrays[msg.sender][addressIndex][version][key].push(uintNull);
        }
        UintUint256ArraysCounts[addressIndex]++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, uint uintNull) public view returns(uint256)
    {
        require(UintUint256Arrays[msg.sender][addressIndex][version][key][index] != uintNull);
        return UintUint256Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, uint256 value, uint uintNull) public
    {
        require(UintUint256Arrays[msg.sender][addressIndex][version][key][index] != uintNull);
        UintUint256Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, uint uintNull) public
    {
        require(UintUint256Arrays[msg.sender][addressIndex][version][key][index] != uintNull);
        uint len = UintUint256Arrays[msg.sender][addressIndex][version][key].length;
        uint256 swapped = UintUint256Arrays[msg.sender][addressIndex][version][key][len - 1];
        UintUint256Arrays[msg.sender][addressIndex][version][key][index] = swapped;
        UintUint256Arrays[msg.sender][addressIndex][version][key].length--;
        UintUint256ArraysCounts[addressIndex]--;
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintBytes32[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            UintBytes32[msg.sender][addressIndex][version][key] = uintNull;
        }
        UintBytes32Counts[addressIndex]++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintUint256[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            UintUint256[msg.sender][addressIndex][version][key] = uintNull;
        }
        UintUint256Counts[addressIndex]++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, uint256 value, uint uintNull) public
    {
        if(value != uintNull)
        {
            UintKeys[msg.sender][addressIndex][version][key][index] = value;
        }
        else
        {
            UintKeys[msg.sender][addressIndex][version][key][index] = uintNull;
        }
        UintKeysCounts[addressIndex]++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, uint uintNull) public view returns(uint256)
    {
        require(UintKeys[msg.sender][addressIndex][version][key][index] != uintNull);
        return UintKeys[msg.sender][addressIndex][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, uint uintNull) public
    {
        require(UintKeys[msg.sender][addressIndex][version][key][index] != uintNull);
        delete UintKeys[msg.sender][addressIndex][version][key][index];
        UintKeysCounts[addressIndex]--;
    }
    
    /*
    
    COUNTS
    
    */
    function uintBytes32Counts(address addressIndex) public view returns(uint)
    {
        return UintBytes32Counts[addressIndex];
    }
    function uintUint256Counts(address addressIndex) public view returns(uint)
    {
        return UintUint256Counts[addressIndex];
    }
    function uintBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return UintBytes32ArraysCounts[addressIndex];
    }
    function uintUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return UintUint256ArraysCounts[addressIndex];
    }
    function uintKeyCounts(address addressIndex) public view returns(uint)
    {
        return UintKeysCounts[addressIndex];
    }
}

contract EverstoreUints is UintDB, UintsDB
{   
    /* 
    
    BASIC KEY VALUE COUNTS 
    
    */
    function uintCount() public view returns(uint)
    {
        return uintBytes32Count();
    }
    function UintCount() public view returns(uint)
    {
        return uintUint256Count();
    }
    function uintArrayCount() public view returns(uint)
    {
        return uintBytes32ArrayCount();
    }
    function UintArrayCount() public view returns(uint)
    {
        return uintUint256ArrayCount();
    }
    function UintKeyCount() public view returns(uint)
    {
        return uintKeyCount();
    }
    /* 
    
    ADDRESSED KEY VALUE COUNTS 
    
    */
    function uintCounts(address addressIndex) public view returns(uint)
    {
        return uintBytes32Counts(addressIndex);
    }
    function UintCounts(address addressIndex) public view returns(uint)
    {
        return uintUint256Counts(addressIndex);
    }
    function uintArrayCounts(address addressIndex) public view returns(uint)
    {
        return uintBytes32ArrayCounts(addressIndex);
    }
    function UintArrayCounts(address addressIndex) public view returns(uint)
    {
        return uintUint256ArrayCounts(addressIndex);
    }
    function UintKeyCounts(address addressIndex) public view returns(uint)
    {
        return uintKeyCounts(addressIndex);
    }
}