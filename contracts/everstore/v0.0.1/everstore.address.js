pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 0x8AD72C1FE21472df02f767Bf7445703b87EDA656 = 0.86

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

contract AddressesDB is Upgradable
{
    // KEY STORE
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => address)))) AddressBytes32;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => address)))) AddressUint256;
    mapping(address => mapping(address => mapping(bytes32 => mapping(bytes32 => address[])))) AddressBytes32Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => address[])))) AddressUint256Arrays;
    mapping(address => mapping(address => mapping(bytes32 => mapping(uint256 => mapping(bytes32 => address))))) AddressKeys;
    
    // KEY COUNTS
    mapping(address => uint) AddressBytes32Counts;
    mapping(address => uint) AddressUint256Counts;
    mapping(address => uint) AddressBytes32ArraysCounts;
    mapping(address => uint) AddressUint256ArraysCounts;
    mapping(address => uint) AddressKeysCounts;
    
    // Bytes32 Keys
    //function create(string key, address value, address addressNull) public;
    function _create(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        require(AddressBytes32[msg.sender][addressIndex][version][key] == addressNull);
        AddressBytes32[msg.sender][addressIndex][version][key] = value;
        AddressBytes32Counts[addressIndex]++;
    }
    
    //function read(string key, address addressNull) public returns(address);
    function _read(address addressIndex, bytes32 version, bytes32 key, address addressNull) public view returns(address)
    {
        require(AddressBytes32[msg.sender][addressIndex][version][key] != addressNull);
        return AddressBytes32[msg.sender][addressIndex][version][key];
    }
    
    //function update(string key, address value, address addressNull) public;
    function _update(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        require(AddressBytes32[msg.sender][addressIndex][version][key] != addressNull);
        AddressBytes32[msg.sender][addressIndex][version][key] = value;
    }
    
    //function destroy(string key, address addressNull) public;
    function _destroy(address addressIndex, bytes32 version, bytes32 key, address addressNull) public
    {
        require(AddressBytes32[msg.sender][addressIndex][version][key] != addressNull);
        delete AddressBytes32[msg.sender][addressIndex][version][key];
        AddressBytes32Counts[addressIndex]--;
    }
    
    // Uint256 Keys
    //function Create(uint256 key, address value, address addressNull) public;
    function _Create(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        require(AddressUint256[msg.sender][addressIndex][version][key] == addressNull);
        AddressUint256[msg.sender][addressIndex][version][key] = value;
        AddressUint256Counts[addressIndex]++;
    }
    
    //function Read(uint256 key, address addressNull) public returns(address);
    function _Read(address addressIndex, bytes32 version, uint256 key, address addressNull) public view returns(address)
    {
        require(AddressUint256[msg.sender][addressIndex][version][key] != addressNull);
        return AddressUint256[msg.sender][addressIndex][version][key];
    }
    
    //function Update(uint256 key, address value, address addressNull) public;
    function _Update(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        require(AddressUint256[msg.sender][addressIndex][version][key] != addressNull);
        AddressUint256[msg.sender][addressIndex][version][key] = value;
    }
    
    //function Destroy(uint256 key, address addressNull) public;
    function _Destroy(address addressIndex, bytes32 version, uint256 key, address addressNull) public
    {
        require(AddressUint256[msg.sender][addressIndex][version][key] != addressNull);
        delete AddressUint256[msg.sender][addressIndex][version][key];
        AddressUint256Counts[addressIndex]--;
    }
    
    // Bytes32 Arrays
    //function push(string key, address value, address addressNull) public;
    function _push(address addressIndex, bytes32 version, bytes32 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressBytes32Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            AddressBytes32Arrays[msg.sender][addressIndex][version][key].push(addressNull);
        }
        AddressBytes32ArraysCounts[addressIndex]++;
    }
    
    //function pull(string key, uint index, address addressNull) public returns(address);
    function _pull(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull) public view returns(address)
    {
        require(AddressBytes32Arrays[msg.sender][addressIndex][version][key][index] != addressNull);
        return AddressBytes32Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function edit(string key, uint index, address value, address addressNull) public;
    function _edit(address addressIndex, bytes32 version, bytes32 key, uint index, address value, address addressNull) public
    {
        require(AddressBytes32Arrays[msg.sender][addressIndex][version][key][index] != addressNull);
        AddressBytes32Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function remove(string key, uint index, address addressNull) public;
    function _remove(address addressIndex, bytes32 version, bytes32 key, uint index, address addressNull) public
    {
        require(AddressBytes32Arrays[msg.sender][addressIndex][version][key][index] != addressNull);
        uint len = AddressBytes32Arrays[msg.sender][addressIndex][version][key].length;
        address swapped = AddressBytes32Arrays[msg.sender][addressIndex][version][key][len - 1];
        AddressBytes32Arrays[msg.sender][addressIndex][version][key][index] = swapped;
        AddressBytes32Arrays[msg.sender][addressIndex][version][key].length--;
        AddressBytes32ArraysCounts[addressIndex]--;
    }
    
    // Uint256 Arrays
    //function Push(uint256 key, address value, address addressNull) public;
    function _Push(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressUint256Arrays[msg.sender][addressIndex][version][key].push(value);
        }
        else
        {
            AddressUint256Arrays[msg.sender][addressIndex][version][key].push(addressNull);
        }
        AddressUint256ArraysCounts[addressIndex]++;
    }
    
    //function Pull(uint256 key, uint index, address addressNull) public returns(address);
    function _Pull(address addressIndex, bytes32 version, uint256 key, uint index, address addressNull) public view returns(address)
    {
        require(AddressUint256Arrays[msg.sender][addressIndex][version][key][index] != addressNull);
        return AddressUint256Arrays[msg.sender][addressIndex][version][key][index];
    }
    
    //function Edit(uint256 key, uint index, address value, address addressNull) public;
    function _Edit(address addressIndex, bytes32 version, uint256 key, uint index, address value, address addressNull) public
    {
        require(AddressUint256Arrays[msg.sender][addressIndex][version][key][index] != addressNull);
        AddressUint256Arrays[msg.sender][addressIndex][version][key][index] = value;
    }
    
    //function Remove(uint256 key, uint index, address addressNull) public;
    function _Remove(address addressIndex, bytes32 version, uint256 key, uint index, address addressNull) public
    {
        require(AddressUint256Arrays[msg.sender][addressIndex][version][key][index] != addressNull);
        uint len = AddressUint256Arrays[msg.sender][addressIndex][version][key].length;
        address swapped = AddressUint256Arrays[msg.sender][addressIndex][version][key][len - 1];
        AddressUint256Arrays[msg.sender][addressIndex][version][key][index] = swapped;
        AddressUint256Arrays[msg.sender][addressIndex][version][key].length--;
        AddressUint256ArraysCounts[addressIndex]--;
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
            AddressBytes32[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            AddressBytes32[msg.sender][addressIndex][version][key] = addressNull;
        }
        AddressBytes32Counts[addressIndex]++;
    }
    
    //function Set(uint256 key, address value, address addressNull) public;
    function _Set(address addressIndex, bytes32 version, uint256 key, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressUint256[msg.sender][addressIndex][version][key] = value;
        }
        else
        {
            AddressUint256[msg.sender][addressIndex][version][key] = addressNull;
        }
        AddressUint256Counts[addressIndex]++;
    }
    
    //function Sets(uint256 key, string index, address value, address addressNull) public;
    function _Sets(address addressIndex, bytes32 version, uint256 key, bytes32 index, address value, address addressNull) public
    {
        if(value != addressNull)
        {
            AddressKeys[msg.sender][addressIndex][version][key][index] = value;
        }
        else
        {
            AddressKeys[msg.sender][addressIndex][version][key][index] = addressNull;
        }
        AddressKeysCounts[addressIndex]++;
    }
    
    //function Reads(uint256 key, string index, address addressNull) public returns(address);
    function _Reads(address addressIndex, bytes32 version, uint256 key, bytes32 index, address addressNull) public view returns(address)
    {
        require(AddressKeys[msg.sender][addressIndex][version][key][index] != addressNull);
        return AddressKeys[msg.sender][addressIndex][version][key][index];
    }
    
    //function Removes(uint256 key, string index, address addressNull) public;
    function _Removes(address addressIndex, bytes32 version, uint256 key, bytes32 index, address addressNull) public
    {
        require(AddressKeys[msg.sender][addressIndex][version][key][index] != addressNull);
        delete AddressKeys[msg.sender][addressIndex][version][key][index];
        AddressKeysCounts[addressIndex]--;
    }
    
    /*
    
    COUNTS
    
    */
    function addressBytes32Counts(address addressIndex) public view returns(uint)
    {
        return AddressBytes32Counts[addressIndex];
    }
    function addressUint256Counts(address addressIndex) public view returns(uint)
    {
        return AddressUint256Counts[addressIndex];
    }
    function addressBytes32ArrayCounts(address addressIndex) public view returns(uint)
    {
        return AddressBytes32ArraysCounts[addressIndex];
    }
    function addressUint256ArrayCounts(address addressIndex) public view returns(uint)
    {
        return AddressUint256ArraysCounts[addressIndex];
    }
    function addressKeyCounts(address addressIndex) public view returns(uint)
    {
        return AddressKeysCounts[addressIndex];
    }
}

contract EverstoreAddresses is AddressDB, AddressesDB
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
    /* 
    
    ADDRESSED KEY VALUE COUNTS 
    
    */
    function addressCounts(address addressIndex) public view returns(uint)
    {
        return addressBytes32Counts(addressIndex);
    }
    function AddressCounts(address addressIndex) public view returns(uint)
    {
        return addressUint256Counts(addressIndex);
    }
    function addressArrayCounts(address addressIndex) public view returns(uint)
    {
        return addressBytes32ArrayCounts(addressIndex);
    }
    function AddressArrayCounts(address addressIndex) public view returns(uint)
    {
        return addressUint256ArrayCounts(addressIndex);
    }
    function AddressKeyCounts(address addressIndex) public view returns(uint)
    {
        return addressKeyCounts(addressIndex);
    }
}