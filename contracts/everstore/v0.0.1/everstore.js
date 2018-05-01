pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x15D8897A29d223C82CF4e0729bF36aBd946E0D08 = 0.37
// v0.0.2 = XXX = XXX

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

contract AddressDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(bytes32 => mapping(bytes32 => address))) AddressBytes32;
    mapping(address => mapping(bytes32 => mapping(uint256 => address))) AddressUint256;
    mapping(address => mapping(bytes32 => mapping(bytes32 => address[]))) AddressBytes32Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => address[]))) AddressUint256Arrays;
    mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => address)))) AddressKeys;
    
    // KEY COUNTS
    uint AddressBytes32Count;
    uint AddressUint256Count;
    uint AddressBytes32ArraysCount;
    uint AddressUint256ArraysCount;
    uint AddressKeysCount;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(bytes32 version, bytes32 key, address value, address addressNull) public
    {
        require(AddressBytes32[msg.sender][version][key] == addressNull);
        AddressBytes32[msg.sender][version][key] = value;
        AddressBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(bytes32 version, bytes32 key, address addressNull) public view returns(address)
    {
        require(AddressBytes32[msg.sender][version][key] != addressNull);
        return AddressBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(bytes32 version, bytes32 key, address value, address addressNull) public
    {
        require(AddressBytes32[msg.sender][version][key] != addressNull);
        AddressBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(bytes32 version, bytes32 key, address addressNull) public
    {
        require(AddressBytes32[msg.sender][version][key] != addressNull);
        delete AddressBytes32[msg.sender][version][key];
        AddressBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(bytes32 version, uint256 key, address value, address addressNull) public
    {
        require(AddressUint256[msg.sender][version][key] == addressNull);
        AddressUint256[msg.sender][version][key] = value;
        AddressUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(bytes32 version, uint256 key, address addressNull) public view returns(address)
    {
        require(AddressUint256[msg.sender][version][key] != addressNull);
        return AddressUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(bytes32 version, uint256 key, address value, address addressNull) public
    {
        require(AddressUint256[msg.sender][version][key] != addressNull);
        AddressUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(bytes32 version, uint256 key, address addressNull) public
    {
        require(AddressUint256[msg.sender][version][key] != addressNull);
        delete AddressUint256[msg.sender][version][key];
        AddressUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(bytes32 version, bytes32 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressBytes32Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            AddressBytes32Arrays[msg.sender][version][key].push(addressNull);
        }
        AddressBytes32ArraysCount++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(bytes32 version, bytes32 key, uint index, address addressNull) public view returns(address)
    {
        require(AddressBytes32Arrays[msg.sender][version][key][index] != addressNull);
        return AddressBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(bytes32 version, bytes32 key, uint index, address value, address addressNull) public
    {
        require(AddressBytes32Arrays[msg.sender][version][key][index] != addressNull);
        AddressBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(bytes32 version, bytes32 key, uint index, address addressNull) public
    {
        require(AddressBytes32Arrays[msg.sender][version][key][index] != addressNull);
        uint len = AddressBytes32Arrays[msg.sender][version][key].length;
        address swapped = AddressBytes32Arrays[msg.sender][version][key][len - 1];
        AddressBytes32Arrays[msg.sender][version][key][index] = swapped;
        AddressBytes32Arrays[msg.sender][version][key].length--;
        AddressBytes32ArraysCount--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(bytes32 version, uint256 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressUint256Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            AddressUint256Arrays[msg.sender][version][key].push(addressNull);
        }
        AddressUint256ArraysCount++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(bytes32 version, uint256 key, uint index, address addressNull) public view returns(address)
    {
        require(AddressUint256Arrays[msg.sender][version][key][index] != addressNull);
        return AddressUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(bytes32 version, uint256 key, uint index, address value, address addressNull) public
    {
        require(AddressUint256Arrays[msg.sender][version][key][index] != addressNull);
        AddressUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(bytes32 version, uint256 key, uint index, address addressNull) public
    {
        require(AddressUint256Arrays[msg.sender][version][key][index] != addressNull);
        uint len = AddressUint256Arrays[msg.sender][version][key].length;
        address swapped = AddressUint256Arrays[msg.sender][version][key][len - 1];
        AddressUint256Arrays[msg.sender][version][key][index] = swapped;
        AddressUint256Arrays[msg.sender][version][key].length--;
        AddressUint256ArraysCount--;
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(bytes32 version, bytes32 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressBytes32[msg.sender][version][key] = value;
        }
        else
        {
            AddressBytes32[msg.sender][version][key] = addressNull;
        }
        AddressBytes32Count++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(bytes32 version, uint256 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressUint256[msg.sender][version][key] = value;
        }
        else
        {
            AddressUint256[msg.sender][version][key] = addressNull;
        }
        AddressUint256Count++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(bytes32 version, uint256 key, bytes32 index, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressKeys[msg.sender][version][key][index] = value;
        }
        else
        {
            AddressKeys[msg.sender][version][key][index] = addressNull;
        }
        AddressKeysCount++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(bytes32 version, uint256 key, bytes32 index, address addressNull) public view returns(address)
    {
        require(AddressKeys[msg.sender][version][key][index] != addressNull);
        return AddressKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(bytes32 version, uint256 key, bytes32 index, address addressNull) public
    {
        require(AddressKeys[msg.sender][version][key][index] != addressNull);
        delete AddressKeys[msg.sender][version][key][index];
        AddressKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function addressBytes32Count() public view returns(uint)
    {
        return AddressBytes32Count;
    }
    function addressUint256Count() public view returns(uint)
    {
        return AddressUint256Count;
    }
    function addressBytes32ArrayCount() public view returns(uint)
    {
        return AddressBytes32ArraysCount;
    }
    function addressUint256ArrayCount() public view returns(uint)
    {
        return AddressUint256ArraysCount;
    }
    function addressKeyCount() public view returns(uint)
    {
        return AddressKeysCount;
    }
}

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

contract AddressesDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => address)))) AddressBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => address)))) AddressUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => address[])))) AddressBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => address[])))) AddressUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => address))))) AddressKeys;
    
    // KEY COUNTS
    uint AddressBytes32Counts;
    uint AddressUint256Counts;
    uint AddressBytes32ArraysCounts;
    uint AddressUint256ArraysCounts;
    uint AddressKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        require(AddressBytes32[msg.sender][version][key] == addressNull);
        AddressBytes32[msg.sender][version][key] = value;
        AddressBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, address addressNull) public view returns(address)
    {
        require(AddressBytes32[msg.sender][version][key] != addressNull);
        return AddressBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        require(AddressBytes32[msg.sender][version][key] != addressNull);
        AddressBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, address addressNull) public
    {
        require(AddressBytes32[msg.sender][version][key] != addressNull);
        delete AddressBytes32[msg.sender][version][key];
        AddressBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        require(AddressUint256[msg.sender][version][key] == addressNull);
        AddressUint256[msg.sender][version][key] = value;
        AddressUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, address addressNull) public view returns(address)
    {
        require(AddressUint256[msg.sender][version][key] != addressNull);
        return AddressUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        require(AddressUint256[msg.sender][version][key] != addressNull);
        AddressUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, address addressNull) public
    {
        require(AddressUint256[msg.sender][version][key] != addressNull);
        delete AddressUint256[msg.sender][version][key];
        AddressUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressBytes32Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            AddressBytes32Arrays[msg.sender][version][key].push(addressNull);
        }
        AddressBytes32ArraysCount++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull) public view returns(address)
    {
        require(AddressBytes32Arrays[msg.sender][version][key][index] != addressNull);
        return AddressBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, address value, address addressNull) public
    {
        require(AddressBytes32Arrays[msg.sender][version][key][index] != addressNull);
        AddressBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull) public
    {
        require(AddressBytes32Arrays[msg.sender][version][key][index] != addressNull);
        uint len = AddressBytes32Arrays[msg.sender][version][key].length;
        address swapped = AddressBytes32Arrays[msg.sender][version][key][len - 1];
        AddressBytes32Arrays[msg.sender][version][key][index] = swapped;
        AddressBytes32Arrays[msg.sender][version][key].length--;
        AddressBytes32ArraysCount--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressUint256Arrays[msg.sender][version][key].push(value);
        }
        else
        {
            AddressUint256Arrays[msg.sender][version][key].push(addressNull);
        }
        AddressUint256ArraysCount++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, address addressNull) public view returns(address)
    {
        require(AddressUint256Arrays[msg.sender][version][key][index] != addressNull);
        return AddressUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, address value, address addressNull) public
    {
        require(AddressUint256Arrays[msg.sender][version][key][index] != addressNull);
        AddressUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, address addressNull) public
    {
        require(AddressUint256Arrays[msg.sender][version][key][index] != addressNull);
        uint len = AddressUint256Arrays[msg.sender][version][key].length;
        address swapped = AddressUint256Arrays[msg.sender][version][key][len - 1];
        AddressUint256Arrays[msg.sender][version][key][index] = swapped;
        AddressUint256Arrays[msg.sender][version][key].length--;
        AddressUint256ArraysCount--;
    }
    
    // "set" Bytes32 Keys & "Set" Uint256 Keys
    // If not exist then create else update ...
    // "Sets" Uses Uint256 & Bytes32 Keys ...
    // "Reads" Allows for Reading "Sets"
    // "Removes" Allows for Deleting "Sets"
    //function set(string key, address value, address addressNull) public;
    function _set(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressBytes32[msg.sender][version][key] = value;
        }
        else
        {
            AddressBytes32[msg.sender][version][key] = addressNull;
        }
        AddressBytes32Count++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressUint256[msg.sender][version][key] = value;
        }
        else
        {
            AddressUint256[msg.sender][version][key] = addressNull;
        }
        AddressUint256Count++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressKeys[msg.sender][version][key][index] = value;
        }
        else
        {
            AddressKeys[msg.sender][version][key][index] = addressNull;
        }
        AddressKeysCount++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, address addressNull) public view returns(address)
    {
        require(AddressKeys[msg.sender][version][key][index] != addressNull);
        return AddressKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, address addressNull) public
    {
        require(AddressKeys[msg.sender][version][key][index] != addressNull);
        delete AddressKeys[msg.sender][version][key][index];
        AddressKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function addressBytes32Counts(address addressIndex) public view returns(uint)
    {
        return AddressBytes32Counts;
    }
    function addressUint256Counts(address addressIndex) public view returns(uint)
    {
        return AddressUint256Counts;
    }
    function addressBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return AddressBytes32ArraysCounts;
    }
    function addressUint256ArrayCount(address addressIndex) public view returns(uint)
    {
        return AddressUint256ArraysCounts;
    }
    function addressKeyCounts(address addressIndex) public view returns(uint)
    {
        return AddressKeysCounts;
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
    uint BoolBytes32Counts;
    uint BoolUint256Counts;
    uint BoolBytes32ArraysCounts;
    uint BoolUint256ArraysCounts;
    uint BoolKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][version][key] == boolNull);
        BoolBytes32[msg.sender][version][key] = value;
        BoolBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, bool boolNull) public view returns(bool)
    {
        require(BoolBytes32[msg.sender][version][key] != boolNull);
        return BoolBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][version][key] != boolNull);
        BoolBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, bool boolNull) public
    {
        require(BoolBytes32[msg.sender][version][key] != boolNull);
        delete BoolBytes32[msg.sender][version][key];
        BoolBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        require(BoolUint256[msg.sender][version][key] == boolNull);
        BoolUint256[msg.sender][version][key] = value;
        BoolUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, bool boolNull) public view returns(bool)
    {
        require(BoolUint256[msg.sender][version][key] != boolNull);
        return BoolUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
    {
        require(BoolUint256[msg.sender][version][key] != boolNull);
        BoolUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, bool boolNull) public
    {
        require(BoolUint256[msg.sender][version][key] != boolNull);
        delete BoolUint256[msg.sender][version][key];
        BoolUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
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
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, bool boolNull) public view returns(bool)
    {
        require(BoolBytes32Arrays[msg.sender][version][key][index] != boolNull);
        return BoolBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, bool value, bool boolNull) public
    {
        require(BoolBytes32Arrays[msg.sender][version][key][index] != boolNull);
        BoolBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, bool boolNull) public
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
    function _Push(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
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
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, bool boolNull) public view returns(bool)
    {
        require(BoolUint256Arrays[msg.sender][version][key][index] != boolNull);
        return BoolUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, bool value, bool boolNull) public
    {
        require(BoolUint256Arrays[msg.sender][version][key][index] != boolNull);
        BoolUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, bool boolNull) public
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
    function _set(address addressIndex, bytes32 version, bytes32 key, bool value, bool boolNull) public
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
    function _Set(address addressIndex, bytes32 version, uint256 key, bool value, bool boolNull) public
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
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool value, bool boolNull) public
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
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool boolNull) public view returns(bool)
    {
        require(BoolKeys[msg.sender][version][key][index] != boolNull);
        return BoolKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, bool boolNull) public
    {
        require(BoolKeys[msg.sender][version][key][index] != boolNull);
        delete BoolKeys[msg.sender][version][key][index];
        BoolKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function boolBytes32Counts(address addressIndex) public view returns(uint)
    {
        return BoolBytes32Counts;
    }
    function boolUint256Counts(address addressIndex) public view returns(uint)
    {
        return BoolUint256Counts;
    }
    function boolBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return BoolBytes32ArraysCounts;
    }
    function boolUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return BoolUint256ArraysCounts;
    }
    function boolKeyCounts(address addressIndex) public view returns(uint)
    {
        return BoolKeysCounts;
    }
}

contract StringsDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32)))) StringBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => bytes32)))) StringUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => bytes32[])))) StringBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => bytes32[])))) StringUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => bytes32))))) StringKeys;
    
    // KEY COUNTS
    uint StringBytes32Counts;
    uint StringUint256Counts;
    uint StringBytes32ArraysCounts;
    uint StringUint256ArraysCounts;
    uint StringKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        require(value == stringToBytes32(stringNull));
        StringBytes32[msg.sender][version][key] = value;
        StringBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, string stringNull) public view returns(bytes32)
    {
        require(StringBytes32[msg.sender][version][key] != stringToBytes32(stringNull));
        return StringBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
    {
        require(StringBytes32[msg.sender][version][key] != stringToBytes32(stringNull));
        StringBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, string stringNull) public
    {
        require(StringBytes32[msg.sender][version][key] != stringToBytes32(stringNull));
        delete StringBytes32[msg.sender][version][key];
        StringBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        require(StringUint256[msg.sender][version][key] == stringToBytes32(stringNull));
        StringUint256[msg.sender][version][key] = value;
        StringUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, string stringNull) public view returns(bytes32)
    {
        require(StringUint256[msg.sender][version][key] != stringToBytes32(stringNull));
        return StringUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
    {
        require(StringUint256[msg.sender][version][key] != stringToBytes32(stringNull));
        StringUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, string stringNull) public
    {
        require(StringUint256[msg.sender][version][key] != stringToBytes32(stringNull));
        delete StringUint256[msg.sender][version][key];
        StringUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
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
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, string stringNull) public view returns(bytes32)
    {
        require(StringBytes32Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        return StringBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, bytes32 value, string stringNull) public
    {
        require(StringBytes32Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        StringBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, string stringNull) public
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
    function _Push(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
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
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, string stringNull) public view returns(bytes32)
    {
        require(StringUint256Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        return StringUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, bytes32 value, string stringNull) public
    {
        require(StringUint256Arrays[msg.sender][version][key][index] != stringToBytes32(stringNull));
        StringUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, string stringNull) public
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
    function _set(address addressIndex, bytes32 version, bytes32 key, bytes32 value, string stringNull) public
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
    function _Set(address addressIndex, bytes32 version, uint256 key, bytes32 value, string stringNull) public
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
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, bytes32 value, string stringNull) public
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
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, string stringNull) public view returns(bytes32)
    {
        require(StringKeys[msg.sender][version][key][index] != stringToBytes32(stringNull));
        return StringKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, string stringNull) public
    {
        require(StringKeys[msg.sender][version][key][index] != stringToBytes32(stringNull));
        delete StringKeys[msg.sender][version][key][index];
        StringKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function stringBytes32Counts(address addressIndex) public view returns(uint)
    {
        return StringBytes32Counts;
    }
    function stringUint256Counts(address addressIndex) public view returns(uint)
    {
        return StringUint256Counts;
    }
    function stringBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return StringBytes32ArraysCounts;
    }
    function stringUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return StringUint256ArraysCounts;
    }
    function stringKeyCounts(address addressIndex) public view returns(uint)
    {
        return StringKeysCounts;
    }
}

contract UintsDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => uint256)))) UintBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => uint256)))) UintUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => uint256[])))) UintBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => uint256[])))) UintUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => uint256))))) UintKeys;
    
    // KEY COUNTS
    uint UintBytes32Counts;
    uint UintUint256Counts;
    uint UintBytes32ArraysCounts;
    uint UintUint256ArraysCounts;
    uint UintKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        require(UintBytes32[msg.sender][version][key] == uintNull);
        UintBytes32[msg.sender][version][key] = value;
        UintBytes32Count++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, uint uintNull) public view returns(uint256)
    {
        require(UintBytes32[msg.sender][version][key] != uintNull);
        return UintBytes32[msg.sender][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
    {
        require(UintBytes32[msg.sender][version][key] != uintNull);
        UintBytes32[msg.sender][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, uint uintNull) public
    {
        require(UintBytes32[msg.sender][version][key] != uintNull);
        delete UintBytes32[msg.sender][version][key];
        UintBytes32Count--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        require(UintUint256[msg.sender][version][key] == uintNull);
        UintUint256[msg.sender][version][key] = value;
        UintUint256Count++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, uint uintNull) public view returns(uint256)
    {
        require(UintUint256[msg.sender][version][key] != uintNull);
        return UintUint256[msg.sender][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
    {
        require(UintUint256[msg.sender][version][key] != uintNull);
        UintUint256[msg.sender][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, uint uintNull) public
    {
        require(UintUint256[msg.sender][version][key] != uintNull);
        delete UintUint256[msg.sender][version][key];
        UintUint256Count--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
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
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, uint uintNull) public view returns(uint256)
    {
        require(UintBytes32Arrays[msg.sender][version][key][index] != uintNull);
        return UintBytes32Arrays[msg.sender][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, uint256 value, uint uintNull) public
    {
        require(UintBytes32Arrays[msg.sender][version][key][index] != uintNull);
        UintBytes32Arrays[msg.sender][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, uint uintNull) public
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
    function _Push(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
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
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, uint uintNull) public view returns(uint256)
    {
        require(UintUint256Arrays[msg.sender][version][key][index] != uintNull);
        return UintUint256Arrays[msg.sender][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, uint256 value, uint uintNull) public
    {
        require(UintUint256Arrays[msg.sender][version][key][index] != uintNull);
        UintUint256Arrays[msg.sender][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, uint uintNull) public
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
    function _set(address addressIndex, bytes32 version, bytes32 key, uint256 value, uint uintNull) public
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
    function _Set(address addressIndex, bytes32 version, uint256 key, uint256 value, uint uintNull) public
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
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, uint256 value, uint uintNull) public
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
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, uint uintNull) public view returns(uint256)
    {
        require(UintKeys[msg.sender][version][key][index] != uintNull);
        return UintKeys[msg.sender][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, uint uintNull) public
    {
        require(UintKeys[msg.sender][version][key][index] != uintNull);
        delete UintKeys[msg.sender][version][key][index];
        UintKeysCount--;
    }
    
    /*
    
    COUNTS
    
    */
    function uintBytes32Counts(address addressIndex) public view returns(uint)
    {
        return UintBytes32Counts;
    }
    function uintUint256Counts(address addressIndex) public view returns(uint)
    {
        return UintUint256Counts;
    }
    function uintBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return UintBytes32ArraysCounts;
    }
    function uintUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return UintUint256ArraysCounts;
    }
    function uintKeyCounts(address addressIndex) public view returns(uint)
    {
        return UintKeysCounts;
    }
}

contract Everstore is AddressDB, BoolDB, StringDB, UintDB, AddressesDB, BoolsDB, StringsDB, UintsDB
{   
    /* 
    
    BASIC KEY VALUE COUNTS 
    
    */
    function addressCount() public view returns(uint)
    {
        return addressBytes32Count();
    }
    function AddressCount() public view returns(uint)
    {
        return addressUint256Count();
    }
    function addressArrayCount() public view returns(uint)
    {
        return addressBytes32ArrayCount();
    }
    function AddressArrayCount() public view returns(uint)
    {
        return addressUint256ArrayCount();
    }
    function AddressKeyCount() public view returns(uint)
    {
        return addressKeyCount();
    }
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
    function addressCounts() public view returns(uint)
    {
        return addressBytes32Counts();
    }
    function AddressCounts() public view returns(uint)
    {
        return addressUint256Counts();
    }
    function addressArrayCounts() public view returns(uint)
    {
        return addressBytes32ArrayCounts();
    }
    function AddressArrayCounts() public view returns(uint)
    {
        return addressUint256ArrayCounts();
    }
    function AddressKeyCounts() public view returns(uint)
    {
        return addressKeyCounts();
    }
    function boolCounts() public view returns(uint)
    {
        return boolBytes32Counts();
    }
    function BoolCounts() public view returns(uint)
    {
        return boolUint256Counts();
    }
    function boolArrayCounts() public view returns(uint)
    {
        return boolBytes32ArrayCounts();
    }
    function BoolArrayCounts() public view returns(uint)
    {
        return boolUint256ArrayCounts();
    }
    function BoolKeyCounts() public view returns(uint)
    {
        return boolKeyCounts();
    }
    function stringCounts() public view returns(uint)
    {
        return stringBytes32Counts();
    }
    function StringCounts() public view returns(uint)
    {
        return stringUint256Counts();
    }
    function stringArrayCounts() public view returns(uint)
    {
        return stringBytes32ArrayCounts();
    }
    function StringArrayCounts() public view returns(uint)
    {
        return stringUint256ArrayCounts();
    }
    function StringKeyCounts() public view returns(uint)
    {
        return stringKeyCounts();
    }
    function uintCounts() public view returns(uint)
    {
        return uintBytes32Counts();
    }
    function UintCounts() public view returns(uint)
    {
        return uintUint256Counts();
    }
    function uintArrayCounts() public view returns(uint)
    {
        return uintBytes32ArrayCounts();
    }
    function UintArrayCounts() public view returns(uint)
    {
        return uintUint256ArrayCounts();
    }
    function UintKeyCounts() public view returns(uint)
    {
        return uintKeyCounts();
    }
}