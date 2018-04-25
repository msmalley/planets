pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = 

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

contract BloqVerse is AbleToUtilizeStrings
{
    /* 
    
    CONTRACT BYTES32 INDEXES 
    
    -- THESE ARE USED FOR GENERIC KEY / VALUE STORAGE
    
    */
    mapping(address => mapping(bytes32 => address)) addressBytes32Records;
    mapping(address => mapping(bytes32 => bool)) boolBytes32Records;
    mapping(address => mapping(bytes32 => bytes32)) stringBytes32Records;
    mapping(address => mapping(bytes32 => uint256)) uintBytes32Records;
    
    /* COMBO COUNTS */
    uint addressCount;
    uint boolCount;
    uint stringCount;
    uint uintCount;
    
    /* BYTES32 TYPE COUNTS */
    uint addressBytes32Count;
    uint boolBytes32Count;
    uint stringBytes32Count;
    uint uintBytes32Count;
    
    /* CONTRACT SPECIFIC BYTES32 TYPE COUNTS */
    mapping(address => uint) addressBytes32Counts;
    mapping(address => uint) boolBytes32Counts;
    mapping(address => uint) stringBytes32Counts;
    mapping(address => uint) uintBytes32Counts;
    
    /* ADDRESSED BYTES32 INDEXES */
    mapping(address => mapping(address => mapping(bytes32 => address))) addressedAddressBytes32Records;
    mapping(address => mapping(address => mapping(bytes32 => bool))) addressedBoolBytes32Records;
    mapping(address => mapping(address => mapping(bytes32 => bytes32))) addressedStringBytes32Records;
    mapping(address => mapping(address => mapping(bytes32 => uint256))) addressedUintBytes32Records;
    
    /* ADDRESSED BYTES32 TYPE COUNTS */
    uint addressedAddressBytes32Count;
    uint addressedBoolBytes32Count;
    uint addressedStringBytes32Count;
    uint addressedUintBytes32Count;
    
    /* CONTRACT SPECIFIC ADDRESSED BYTES32 TYPE COUNTS */
    mapping(address => mapping(address => uint)) addressedAddressBytes32Counts;
    mapping(address => mapping(address => uint)) addressedBoolBytes32Counts;
    mapping(address => mapping(address => uint)) addressedStringBytes32Counts;
    mapping(address => mapping(address => uint)) addressedUintBytes32Counts;
    
    /* 
    
    CONTRACT UINT256 INDEXES 
    
    -- THESE ARE USED FOR ERC721 TOKEN IDs
    
    */
    mapping(address => mapping(uint256 => address)) addressUint256Records;
    mapping(address => mapping(uint256 => bool)) boolUint256Records;
    mapping(address => mapping(uint256 => bytes32)) stringUint256Records;
    mapping(address => mapping(uint256 => uint256)) uintUint256Records;
    
    // KEYED
    mapping(address => mapping(uint256 => mapping(bytes32 => address))) addressUint256KeyedRecords;
    mapping(address => mapping(uint256 => mapping(bytes32 => bool))) boolUint256KeyedRecords;
    mapping(address => mapping(uint256 => mapping(bytes32 => bytes32))) stringUint256KeyedRecords;
    mapping(address => mapping(uint256 => mapping(bytes32 => uint256))) uintUint256KeyedRecords;
    
    /* UINT256 TYPE COUNTS */
    uint addressUint256Count;
    uint boolUint256Count;
    uint stringUint256Count;
    uint uintUint256Count;
    
    uint addressUint256KeyedCount;
    uint boolUint256KeyedCount;
    uint stringUint256KeyedCount;
    uint uintUint256KeyedCount;
    
    /* CONTRACT SPECIFIC UINT256 TYPE COUNTS */
    mapping(address => uint) addressUint256Counts;
    mapping(address => uint) boolUint256Counts;
    mapping(address => uint) stringUint256Counts;
    mapping(address => uint) uintUint256Counts;
    
    mapping(address => uint) addressUint256KeyedCounts;
    mapping(address => uint) boolUint256KeyedCounts;
    mapping(address => uint) stringUint256KeyedCounts;
    mapping(address => uint) uintUint256KeyedCounts;
    
    /* ADDRESSED UINT256 INDEXES */
    mapping(address => mapping(address => mapping(uint256 => address))) addressedAddressUint256Records;
    mapping(address => mapping(address => mapping(uint256 => bool))) addressedBoolUint256Records;
    mapping(address => mapping(address => mapping(uint256 => bytes32))) addressedStringUint256Records;
    mapping(address => mapping(address => mapping(uint256 => uint256))) addressedUintUint256Records;
    
    /* ADDRESSED UINT256 TYPE COUNTS */
    uint addressedAddressUint256Count;
    uint addressedBoolUint256Count;
    uint addressedStringUint256Count;
    uint addressedUintUint256Count;
    
    /* CONTRACT SPECIFIC ADDRESSED UINT256 TYPE COUNTS */
    mapping(address => mapping(address => uint)) addressedAddressUint256Counts;
    mapping(address => mapping(address => uint)) addressedBoolUint256Counts;
    mapping(address => mapping(address => uint)) addressedStringUint256Counts;
    mapping(address => mapping(address => uint)) addressedUintUint256Counts;
    
    /* 
    
    CONTRACT ARRAYS 
    
    */
    mapping(address => mapping(bytes32 => address[])) addressBytes32Arrays;
    mapping(address => mapping(bytes32 => bool[])) boolBytes32Arrays;
    mapping(address => mapping(bytes32 => bytes32[])) stringBytes32Arrays;
    mapping(address => mapping(bytes32 => uint256[])) uintBytes32Arrays;
    
    mapping(address => mapping(uint256 => address[])) addressUint256Arrays;
    mapping(address => mapping(uint256 => bool[])) boolUint256Arrays;
    mapping(address => mapping(uint256 => bytes32[])) stringUint256Arrays;
    mapping(address => mapping(uint256 => uint256[])) uintUint256Arrays;
    
    /* ARRAY COUNTS */
    uint addressBytes32ArrayCount;
    uint boolBytes32ArrayCount;
    uint stringBytes32ArrayCount;
    uint uintBytes32ArrayCount;
    
    uint addressUint256ArrayCount;
    uint boolUint256ArrayCount;
    uint stringUint256ArrayCount;
    uint uintUint256ArrayCount;
    
    /* CONTRACT SPECIFIC ARRAY COUNTS */
    mapping(address => mapping(bytes32 => uint)) addressBytes32ArrayCounts;
    mapping(address => mapping(bytes32 => uint)) boolBytes32ArrayCounts;
    mapping(address => mapping(bytes32 => uint)) stringBytes32ArrayCounts;
    mapping(address => mapping(bytes32 => uint)) uintBytes32ArrayCounts;
    
    mapping(address => mapping(uint256 => uint)) addressUint256ArrayCounts;
    mapping(address => mapping(uint256 => uint)) boolUint256ArrayCounts;
    mapping(address => mapping(uint256 => uint)) stringUint256ArrayCounts;
    mapping(address => mapping(uint256 => uint)) uintUint256ArrayCounts;
    
    /* 
    
    ADDRESSED ARRAYS 
    
    */
    mapping(address => mapping(address => mapping(bytes32 => address[]))) addressedBytes32AddressArrays;
    mapping(address => mapping(address => mapping(bytes32 => bool[]))) addressedBytes32BoolArrays;
    mapping(address => mapping(address => mapping(bytes32 => bytes32[]))) addressedBytes32StringArrays;
    mapping(address => mapping(address => mapping(bytes32 => uint256[]))) addressedBytes32UintArrays;
    
    mapping(address => mapping(address => mapping(bytes32 => address[]))) addressedUint256AddressArrays;
    mapping(address => mapping(address => mapping(bytes32 => bool[]))) addressedUint256BoolArrays;
    mapping(address => mapping(address => mapping(bytes32 => bytes32[]))) addressedUint256StringArrays;
    mapping(address => mapping(address => mapping(bytes32 => uint256[]))) addressedUint256UintArrays;
    
    /* ADDRESSED ARRAY COUNTS */
    uint addressedBytes32AddressArrayCount;
    uint addressedBytes32BoolArrayCount;
    uint addressedBytes32StringArrayCount;
    uint addressedBytes32UintArrayCount;
    
    uint addressedUint256AddressArrayCount;
    uint addressedUint256BoolArrayCount;
    uint addressedUint256StringArrayCount;
    uint addressedUint256UintArrayCount;
    
    /* CONTRACT SPECIFIC ADDRESSED ARRAY COUNTS */
    mapping(address => mapping(address => mapping(bytes32 => uint))) addressedBytes32AddressArrayCounts;
    mapping(address => mapping(address => mapping(bytes32 => uint))) addressedBytes32BoolArrayCounts;
    mapping(address => mapping(address => mapping(bytes32 => uint))) addressedBytes32StringArrayCounts;
    mapping(address => mapping(address => mapping(bytes32 => uint))) addressedBytes32UintArrayCounts;
    
    mapping(address => mapping(address => mapping(uint256 => uint))) addressedUint256AddressArrayCounts;
    mapping(address => mapping(address => mapping(uint256 => uint))) addressedUint256BoolArrayCounts;
    mapping(address => mapping(address => mapping(uint256 => uint))) addressedUint256StringArrayCounts;
    mapping(address => mapping(address => mapping(uint256 => uint))) addressedUint256UintArrayCounts;
    
    /*
    
    GET - FROM BYTES32 FUNCTIONALITY
    
    -- USES A SMALL "g"
    
    */
    function getAddress(bytes32 key) public view returns (address) 
    {
        return addressBytes32Records[msg.sender][key];
    }
    
    function getBool(bytes32 key) public view returns (bool) 
    {
        return boolBytes32Records[msg.sender][key];
    }
    
    function getString(bytes32 key) public view returns (bytes32) 
    {
        return stringBytes32Records[msg.sender][key];
    }
    
    function getRealString(bytes32 key) public view returns (string) 
    {
        return bytes32ToString(stringBytes32Records[msg.sender][key]);
    }

    function getUint(bytes32 key) public view returns (uint) 
    {
        return uintBytes32Records[msg.sender][key];
    }
    
    // Counts
    function getAddressCount() public view returns (uint)
    {
        return addressBytes32Count;
    }
    
    function getBoolCount() public view returns (uint)
    {
        return boolBytes32Count;
    }
    
    function getStringCount() public view returns (uint)
    {
        return stringBytes32Count;
    }
    
    function getUintCount() public view returns (uint)
    {
        return uintBytes32Count;
    }
    
    /*
    
    GET - FROM UINT256 FUNCTIONALITY
    
    -- USES A BIG "G"
    
    */
    function GetAddress(uint256 key) public view returns (address) 
    {
        return addressUint256Records[msg.sender][key];
    }
    
    function GetBool(uint256 key) public view returns (bool) 
    {
        return boolUint256Records[msg.sender][key];
    }
    
    function GetString(uint256 key) public view returns (bytes32) 
    {
        return stringUint256Records[msg.sender][key];
    }
    
    function GetRealString(uint256 key) public view returns (string) 
    {
        return bytes32ToString(stringUint256Records[msg.sender][key]);
    }

    function GetUint(uint256 key) public view returns (uint) 
    {
        return uintUint256Records[msg.sender][key];
    }
    
    function GetAddress(uint256 key) public view returns (address) 
    {
        return addressUint256Records[msg.sender][key];
    }
    
    // Keyed Uint Indexes - for TokenID meta ...
    
    function GetKeyedAddress(uint256 id, bytes32 key) public view returns (address) 
    {
        return addressUint256KeyedRecords[msg.sender][id][key];
    }
    
    function GetKeyedBool(uint256 id, bytes32 key) public view returns (bool) 
    {
        return boolUint256KeyedRecords[msg.sender][id][key];
    }
    
    function GetKeyedString(uint256 id, bytes32 key) public view returns (bytes32) 
    {
        return stringUint256KeyedRecords[msg.sender][id][key];
    }
    
    function GetKeyedRealString(uint256 id, bytes32 key) public view returns (string) 
    {
        return bytes32ToString(stringUint256KeyedRecords[msg.sender][id][key]);
    }

    function GetKeyedUint(uint256 id, bytes32 key) public view returns (uint) 
    {
        return uintUint256KeyedRecords[msg.sender][id][key];
    }
    
    // Counts
    function GetAddressCount() public view returns (uint)
    {
        return addressUint256Count;
    }
    
    function GetBoolCount() public view returns (uint)
    {
        return boolUint256Count;
    }
    
    function GetStringCount() public view returns (uint)
    {
        return stringUint256Count;
    }
    
    function GetUintCount() public view returns (uint)
    {
        return uintUint256Count;
    }
    
    function GetAddressKeyedCount() public view returns (uint)
    {
        return addressUint256KeyedCount;
    }
    
    function GetBoolKeyedCount() public view returns (uint)
    {
        return boolUint256KeyedCount;
    }
    
    function GetStringKeyedCount() public view returns (uint)
    {
        return stringUint256KeyedCount;
    }
    
    function GetUintKeyedCount() public view returns (uint)
    {
        return uintUint256KeyedCount;
    }
    
    /*
    
    SET - TO BYTES32 FUNCTIONALITY
    
    -- USES A SMALL "s"
    
    */
    
    function setAddress(bytes32 key, address value) public 
    {
        addressBytes32Records[msg.sender][key] = value;
        addressBytes32Counts[msg.sender]++;
        addressBytes32Count++;
    }
    
    function setBool(bytes32 key, bool value) public 
    {
        boolBytes32Records[msg.sender][key] = value;
        boolBytes32Counts[msg.sender]++;
        boolBytes32Count++;
    }
    
    function setString(bytes32 key, bytes32 value) public 
    {
        stringBytes32Records[msg.sender][key] = value;
        stringBytes32Counts[msg.sender]++;
        stringBytes32Count++;
    }

    function setUint(bytes32 key, uint value) public 
    {
        uintBytes32Records[msg.sender][key] = value;
        uintBytes32Counts[msg.sender]++;
        uintBytes32Count++;
    }
    
    /*
    
    SET - TO UINT256 FUNCTIONALITY
    
    -- USES A BIG "S"
    
    */
    
    function SetAddress(uint256 key, address value) public 
    {
        addressUint256Records[msg.sender][key] = value;
        addressUint256Counts[msg.sender]++;
        addressUint256Count++;
    }
    
    function SetBool(uint256 key, bool value) public 
    {
        boolUint256Records[msg.sender][key] = value;
        boolUint256Counts[msg.sender]++;
        boolUint256Count++;
    }
    
    function SetString(uint256 key, bytes32 value) public 
    {
        stringUint256Records[msg.sender][key] = value;
        stringUint256Counts[msg.sender]++;
        stringUint256Count++;
    }

    function SetUint(uint256 key, uint value) public 
    {
        uintUint256Records[msg.sender][key] = value;
        uintUint256Counts[msg.sender]++;
        uintUint256Count++;
    }    
    
    function SetKeyedAddress(uint256 id, bytes32 key, address value) public 
    {
        addressUint256KeyedRecords[msg.sender][id][key] = value;
        addressUint256KeyedCounts[msg.sender]++;
        addressUint256KeyedCount++;
    }
    
    function SetKeyedBool(uint256 id, bytes32 key, bool value) public 
    {
        boolUint256KeyedRecords[msg.sender][id][key] = value;
        boolUint256KeyedCounts[msg.sender]++;
        boolUint256KeyedCount++;
    }
    
    function SetKeyedString(uint256 id, bytes32 key, bytes32 value) public 
    {
        stringUint256KeyedRecords[msg.sender][id][key] = value;
        stringUint256KeyedCounts[msg.sender]++;
        stringUint256KeyedCount++;
    }

    function SetKeyedUint(uint256 id, bytes32 key, uint value) public 
    {
        uintUint256KeyedRecords[msg.sender][id][key] = value;
        uintUint256KeyedCounts[msg.sender]++;
        uintUint256KeyedCount++;
    }
    
    /*
    
    DELETE - FROM BYTES32 INDEXES
    
    -- USES A SMALL "d"
    
    */
    
    function deleteAddress(bytes32 key) public 
    {
        delete addressBytes32Records[msg.sender][key];
        addressBytes32Counts[msg.sender]--;
        addressBytes32Count--;
    }
    
    function deleteBool(bytes32 key) public 
    {
        delete boolBytes32Records[msg.sender][key];
        boolBytes32Counts[msg.sender]--;
        boolBytes32Count--;
    }
    
    function deleteString(bytes32 key) public 
    {
        delete stringBytes32Records[msg.sender][key];
        stringBytes32Counts[msg.sender]--;
        stringBytes32Count--;
    }

    function deleteUint(bytes32 key) public 
    {
        delete uintBytes32Records[msg.sender][key];
        uintBytes32Counts[msg.sender]--;
        uintBytes32Count--;
    }
    
    /*
    
    DELETE - FROM UINT256 INDEXES
    
    -- USES A BIG "D"
    
    */
    
    function DeleteAddress(uint256 key) public 
    {
        delete addressUint256Records[msg.sender][key];
        addressUint256Counts[msg.sender]--;
        addressUint256Count--;
    }
    
    function DeleteBool(uint256 key) public 
    {
        delete boolUint256Records[msg.sender][key];
        boolUint256Counts[msg.sender]--;
        boolUint256Count--;
    }
    
    function DeleteString(uint256 key) public 
    {
        delete stringUint256Records[msg.sender][key];
        stringUint256Counts[msg.sender]--;
        stringUint256Count--;
    }

    function DeleteUint(uint256 key) public 
    {
        delete uintUint256Records[msg.sender][key];
        uintUint256Counts[msg.sender]--;
        uintUint256Count--;
    }    
    
    function DeleteKeyedAddress(uint256 id, bytes32 key) public 
    {
        delete addressUint256KeyedRecords[msg.sender][id][key];
        addressUint256KeyedCounts[msg.sender]--;
        addressUint256KeyedCount--;
    }
    
    function DeleteKeyedBool(uint256 id, bytes32 key) public 
    {
        delete boolUint256KeyedRecords[msg.sender][id][key];
        boolUint256KeyedCounts[msg.sender]--;
        boolUint256KeyedCount--;
    }
    
    function DeleteKeyedString(uint256 id, bytes32 key) public 
    {
        delete stringUint256KeyedRecords[msg.sender][id][key];
        stringUint256KeyedCounts[msg.sender]--;
        stringUint256KeyedCount--;
    }

    function DeleteKeyedUint(uint256 id, bytes32 key) public 
    {
        delete uintUint256KeyedRecords[msg.sender][id][key];
        uintUint256KeyedCounts[msg.sender]--;
        uintUint256KeyedCount--;
    }
    
    /*
    
    PUSH - TO ARRAY
    
    -- USES A SMALL "p" FOR BYTES32 INDEXES
    -- USES A BIGG "P" for UINT256 INDEXES
    
    */
    
    function pushAddress(bytes32 key, address value) public
    {
        addressBytes32Arrays[msg.sender][key].push(value);
        addressBytes32ArrayCount++;
        addressBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function pushBool(bytes32 key, bool value) public
    {
        boolBytes32Arrays[msg.sender][key].push(value);
        boolBytes32ArrayCount++;
        boolBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function pushString(bytes32 key, bytes32 value) public
    {
        stringBytes32Arrays[msg.sender][key].push(value);
        stringBytes32ArrayCount++;
        stringBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function pushUint(bytes32 key, uint value) publc
    {
        uintBytes32Arrays[msg.sender][key].push(value);
        uintBytes32ArrayCount++;
        uintBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function PushAddress(uint256 key, address value) public
    {
        addressUint256Arrays[msg.sender][key].push(value);
        addressUint256ArrayCount++;
        addressUint256ArrayCounts[msg.sender][key]++;
    }
    
    function PushBool(uint256 key, bool value) public
    {
        boolUint256Arrays[msg.sender][key].push(value);
        boolUint256ArrayCount++;
        boolUint256ArrayCounts[msg.sender][key]++;
    }
    
    function PushString(uint256 key, bytes32 value) public
    {
        stringUint256Arrays[msg.sender][key].push(value);
        stringUint256ArrayCount++;
        stringUint256ArrayCounts[msg.sender][key]++;
    }
    
    function PushUint(uint256 key, uint value) public
    {
        uintUint256Arrays[msg.sender][key].push(value);
        uintUint256ArrayCount++;
        uintUint256ArrayCounts[msg.sender][key]++;
    }
    
    /*
    
    UPDATE - ITEM IN ARRAY BY INDEX
    
    -- USES A SMALL "u" FOR BYTES32 INDEXES
    -- USES A BIGG "U" for UINT256 INDEXES
    
    */
    
    function updateAddress(bytes32 key, uint index, address value) public
    {
        addressBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function updateBool(bytes32 key, uint index, bool value) public
    {
        boolBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function updateString(bytes32 key, uint index, bytes32 value) public
    {
        stringBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function updateUint(bytes32 key, uint index, uint value) public
    {
        uintBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateAddress(uint256 key, uint index, address value) public
    {
        addressUint256Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateBool(uint256 key, uint index, bool value) public
    {
        boolUint256Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateString(uint256 key, uint index, bytes32 value) public
    {
        stringUint256Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateUint(uint256 key, uint index, uint value) public
    {
        uintUint256Arrays[msg.sender][key][index] = value;
    }
    
    /*
    
    READ - ITEM FROM ARRAY BY INDEX
    
    -- USES A SMALL "r" FOR BYTES32 INDEXES
    -- USES A BIGG "R" for UINT256 INDEXES
    
    */
    
    function readAddress(bytes32 key, uint index) public returns(address value)
    {
        return addressBytes32Arrays[msg.sender][key][index];
    }
    
    function readBool(bytes32 key, uint index) public returns(bool value)
    {
        return boolBytes32Arrays[msg.sender][key][index];
    }
    
    function readString(bytes32 key, uint index) public returns(bytes32 value)
    {
        return stringBytes32Arrays[msg.sender][key][index];
    }
    
    function readUint(bytes32 key, uint index) public returns(uint value)
    {
        return uintBytes32Arrays[msg.sender][key][index];
    }
    
    function ReadAddress(uint256 key, uint index) public returns(address value)
    {
        return addressUint256Arrays[msg.sender][key][index];
    }
    
    function ReadBool(uint256 key, uint index) public returns(bool value)
    {
        return boolUint256Arrays[msg.sender][key][index];
    }
    
    function ReadString(uint256 key, uint index) public returns(bytes32 value)
    {
        return stringUint256Arrays[msg.sender][key][index];
    }
    
    function ReadUint(uint256 key, uint index) public returns(uint value)
    {
        return uintUint256Arrays[msg.sender][key][index];
    }
    
    /*
    
    REMOVE - ITEM FROM ARRAY BY INDEX
    
    -- USES A SMALL "r" FOR BYTES32 INDEXES
    -- USES A BIGG "R" for UINT256 INDEXES
    
    */
    
    function removeAddress(bytes32 key, uint index) public
    {
        uint lastIndex = addressBytes32ArrayCounts[msg.sender][key] - 1;
        address poppedItem = addressBytes32Arrays[msg.sender][key][lastIndex];
        addressBytes32Arrays[msg.sender][key][index] = poppedItem;
        addressBytes32Arrays[msg.sender][key].length--;
        addressBytes32ArrayCount--;
        addressBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function removeBool(bytes32 key, uint index) public
    {
        uint lastIndex = boolBytes32ArrayCounts[msg.sender][key] - 1;
        bool poppedItem = boolBytes32Arrays[msg.sender][key][lastIndex];
        boolBytes32Arrays[msg.sender][key][index] = poppedItem;
        boolBytes32Arrays[msg.sender][key].length--;
        boolBytes32ArrayCount--;
        boolBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function removeString(bytes32 key, uint index) public
    {
        uint lastIndex = stringBytes32ArrayCounts[msg.sender][key] - 1;
        bytes32 poppedItem = stringBytes32Arrays[msg.sender][key][lastIndex];
        stringBytes32Arrays[msg.sender][key][index] = poppedItem;
        stringBytes32Arrays[msg.sender][key].length--;
        stringBytes32ArrayCount--;
        stringBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function removeUint(bytes32 key, uint index) public
    {
        uint lastIndex = uintBytes32ArrayCounts[msg.sender][key] - 1;
        uint poppedItem = uintBytes32Arrays[msg.sender][key][lastIndex];
        uintBytes32Arrays[msg.sender][key][index] = poppedItem;
        uintBytes32Arrays[msg.sender][key].length--;
        uintBytes32ArrayCount--;
        uintBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveAddress(uint256 key, uint index) public
    {
        uint lastIndex = addressUint256ArrayCounts[msg.sender][key] - 1;
        address poppedItem = addressUint256Arrays[msg.sender][key][lastIndex];
        addressUint256Arrays[msg.sender][key][index] = poppedItem;
        addressUint256Arrays[msg.sender][key].length--;
        addressUint256ArrayCount--;
        addressUint256ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveBool(uint256 key, uint index) public
    {
        uint lastIndex = boolUint256ArrayCounts[msg.sender][key] - 1;
        bool poppedItem = boolUint256Arrays[msg.sender][key][lastIndex];
        boolUint256Arrays[msg.sender][key][index] = poppedItem;
        boolUint256Arrays[msg.sender][key].length--;
        boolUint256ArrayCount--;
        boolUint256ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveString(uint256 key, uint index) public
    {
        uint lastIndex = stringUint256ArrayCounts[msg.sender][key] - 1;
        bytes32 poppedItem = stringUint256Arrays[msg.sender][key][lastIndex];
        stringUint256Arrays[msg.sender][key][index] = poppedItem;
        stringUint256Arrays[msg.sender][key].length--;
        stringUint256ArrayCount--;
        stringUint256ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveUint(uint256 key, uint index) public
    {
        uint lastIndex = uintUint256ArrayCounts[msg.sender][key] - 1;
        uint poppedItem = uintUint256Arrays[msg.sender][key][lastIndex];
        uintUint256Arrays[msg.sender][key][index] = poppedItem;
        uintUint256Arrays[msg.sender][key].length--;
        uintUint256ArrayCount--;
        uintUint256ArrayCounts[msg.sender][key]--;
    }
    
    
    /*
    
    STILL TO-DO:
    
    -- Addressed SETs and GETs
    -- Addressed Arrays - eg - "GetAddressedUintArrayItem(owner, key, index)"
    
    */
    
    /*
    
    ADDRESSED GET - FROM BYTES32 FUNCTIONALITY
    
    -- USES A SMALL "g"
    
    addressedAddressBytes32Records
    addressedAddressBytes32Count;
    addressedAddressBytes32Counts;
    
    */
    function getAddressedAddress(bytes32 key) public view returns (address) 
    {
        return addressedAddressBytes32Records[msg.sender][key];
    }
    
    function getAddressedBool(bytes32 key) public view returns (bool) 
    {
        return addressedBoolBytes32Records[msg.sender][key];
    }
    
    function getAddressedString(bytes32 key) public view returns (bytes32) 
    {
        return addressedStringBytes32Records[msg.sender][key];
    }
    
    function getAddressedRealString(bytes32 key) public view returns (string) 
    {
        return bytes32ToString(addressedStringBytes32Records[msg.sender][key]);
    }

    function getAddressedUint(bytes32 key) public view returns (uint) 
    {
        return addressedUintBytes32Records[msg.sender][key];
    }
    
    // Counts
    function getAddressedAddressCount() public view returns (uint)
    {
        return addressedAddressBytes32Count;
    }
    
    function getAddressedBoolCount() public view returns (uint)
    {
        return addressedBoolBytes32Count;
    }
    
    function getAddressedStringCount() public view returns (uint)
    {
        return addressedStringBytes32Count;
    }
    
    function getAddressedUintCount() public view returns (uint)
    {
        return addressedUintBytes32Count;
    }
    
    /*
    
    ADDRESSED GET - FROM UINT256 FUNCTIONALITY
    
    -- USES A BIG "G"
    
    */
    function GetAddressedAddress(uint256 key) public view returns (address) 
    {
        return addressedAddressUint256Records[msg.sender][key];
    }
    
    function GetAddressedBool(uint256 key) public view returns (bool) 
    {
        return addressedBoolUint256Records[msg.sender][key];
    }
    
    function GetAddressedString(uint256 key) public view returns (bytes32) 
    {
        return addressedStringUint256Records[msg.sender][key];
    }
    
    function GetAddressedRealString(uint256 key) public view returns (string) 
    {
        return bytes32ToString(addressedStringUint256Records[msg.sender][key]);
    }

    function GetAddressedUint(uint256 key) public view returns (uint) 
    {
        return addressedUintUint256Records[msg.sender][key];
    }
    
    // ADDRESSED Counts
    function GetAddressedAddressCount() public view returns (uint)
    {
        return addressedAddressUint256Count;
    }
    
    function GetAddressedBoolCount() public view returns (uint)
    {
        return addressedBoolUint256Count;
    }
    
    function GetAddressedStringCount() public view returns (uint)
    {
        return addressedStringUint256Count;
    }
    
    function GetAddressedUintCount() public view returns (uint)
    {
        return addressedUintUint256Count;
    }
    
    /*
    
    ADDRESSED SET - TO BYTES32 FUNCTIONALITY
    
    -- USES A SMALL "s"
    
    */
    
    function setAddressedAddress(bytes32 key, address value) public 
    {
        addressedAddressBytes32Records[msg.sender][key] = value;
        addressedAddressBytes32Counts[msg.sender]++;
        addressedAddressBytes32Count++;
    }
    
    function setAddressedBool(bytes32 key, bool value) public 
    {
        addressedBoolBytes32Records[msg.sender][key] = value;
        addressedBoolBytes32Counts[msg.sender]++;
        addressedBoolBytes32Count++;
    }
    
    function setAddressedString(bytes32 key, bytes32 value) public 
    {
        addressedStringBytes32Records[msg.sender][key] = value;
        addressedStringBytes32Counts[msg.sender]++;
        addressedStringBytes32Count++;
    }

    function setAddressedUint(bytes32 key, uint value) public 
    {
        addressedUintBytes32Records[msg.sender][key] = value;
        addressedUintBytes32Counts[msg.sender]++;
        addressedUintBytes32Count++;
    }
    
    /*
    
    ADDRESSED SET - TO UINT256 FUNCTIONALITY
    
    -- USES A BIG "S"
    
    */
    
    function SetAddressedAddress(uint256 key, address value) public 
    {
        addressedAddressBytes32Records[msg.sender][key] = value;
        addressedAddressBytes32Counts[msg.sender]++;
        addressedAddressBytes32Count++;
    }
    
    function SetAddressedBool(uint256 key, bool value) public 
    {
        addressedBoolBytes32Records[msg.sender][key] = value;
        addressedBoolBytes32Counts[msg.sender]++;
        addressedBoolBytes32Count++;
    }
    
    function SetAddressedString(uint256 key, bytes32 value) public 
    {
        addressedStringBytes32Records[msg.sender][key] = value;
        addressedStringBytes32Counts[msg.sender]++;
        addressedStringBytes32Count++;
    }

    function SetAddressedUint(uint256 key, uint value) public 
    {
        addressedUintBytes32Records[msg.sender][key] = value;
        addressedUintBytes32Counts[msg.sender]++;
        addressedUintBytes32Count++;
    }
    
    /*
    
    ADDRESSED DELETE - FROM BYTES32 INDEXES
    
    -- USES A SMALL "d"
    
    */
    
    function deleteAddressedAddress(bytes32 key) public 
    {
        delete addressedAddressBytes32Records[msg.sender][key];
        addressedAddressBytes32Counts[msg.sender]--;
        addressedAddressBytes32Count--;
    }
    
    function deleteAddressedBool(bytes32 key) public 
    {
        delete addressedBoolBytes32Records[msg.sender][key];
        addressedBoolBytes32Counts[msg.sender]--;
        addressedBoolBytes32Count--;
    }
    
    function deleteAddressedString(bytes32 key) public 
    {
        delete addressedStringBytes32Records[msg.sender][key];
        addressedStringBytes32Counts[msg.sender]--;
        addressedStringBytes32Count--;
    }

    function deleteAddressedUint(bytes32 key) public 
    {
        delete addressedUintBytes32Records[msg.sender][key];
        addressedUintBytes32Counts[msg.sender]--;
        addressedUintBytes32Count--;
    }
    
    /*
    
    ADDRESSED DELETE - FROM UINT256 INDEXES
    
    -- USES A BIG "D"
    
    */
    
    function DeleteAddressedAddress(uint256 key) public 
    {
        delete addressedAddressUint256Records[msg.sender][key];
        addressedAddressUint256Counts[msg.sender]--;
        addressedAddressUint256Count--;
    }
    
    function DeleteAddressedBool(uint256 key) public 
    {
        delete addressedBoolUint256Records[msg.sender][key];
        addressedBoolUint256Counts[msg.sender]--;
        addressedBoolUint256Count--;
    }
    
    function DeleteAddressedString(uint256 key) public 
    {
        delete addressedStringUint256Records[msg.sender][key];
        addressedStringUint256Counts[msg.sender]--;
        addressedStringUint256Count--;
    }

    function DeleteAddressedUint(uint256 key) public 
    {
        delete addressedUintUint256Records[msg.sender][key];
        addressedUintUint256Counts[msg.sender]--;
        addressedUintUint256Count--;
    }
    
    /*
    
    ADDRESSED PUSH - TO ARRAY
    
    -- USES A SMALL "p" FOR BYTES32 INDEXES
    -- USES A BIG "P" for UINT256 INDEXES
    
    */
    
    function pushAddressedAddress(bytes32 key, address value) public
    {
        addressedAddressBytes32Arrays[msg.sender][key].push(value);
        addressedAddressBytes32ArrayCount++;
        addressedAddressBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function pushAddressedBool(bytes32 key, bool value) public
    {
        addressedBoolBytes32Arrays[msg.sender][key].push(value);
        addressedBoolBytes32ArrayCount++;
        addressedBoolBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function pushAddressedString(bytes32 key, bytes32 value) public
    {
        addressedStringBytes32Arrays[msg.sender][key].push(value);
        addressedStringBytes32ArrayCount++;
        addressedStringBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function pushAddressedUint(bytes32 key, uint value) publc
    {
        addressedUintBytes32Arrays[msg.sender][key].push(value);
        addressedUintBytes32ArrayCount++;
        addressedUintBytes32ArrayCounts[msg.sender][key]++;
    }
    
    function PushAddressedAddress(uint256 key, address value) public
    {
        addressedAddressUint256Arrays[msg.sender][key].push(value);
        addressedAddressUint256ArrayCount++;
        addressedAddressUint256ArrayCounts[msg.sender][key]++;
    }
    
    function PushAddressedBool(uint256 key, bool value) public
    {
        addressedBoolUint256Arrays[msg.sender][key].push(value);
        addressedBoolUint256ArrayCount++;
        addressedBoolUint256ArrayCounts[msg.sender][key]++;
    }
    
    function PushAddressedString(uint256 key, bytes32 value) public
    {
        addressedStringUint256Arrays[msg.sender][key].push(value);
        addressedStringUint256ArrayCount++;
        addressedStringUint256ArrayCounts[msg.sender][key]++;
    }
    
    function PushAddressedUint(uint256 key, uint value) public
    {
        addressedUintUint256Arrays[msg.sender][key].push(value);
        addressedUintUint256ArrayCount++;
        addressedUintUint256ArrayCounts[msg.sender][key]++;
    }
    
    /*
    
    ADDRESSED UPDATE - ITEM IN ARRAY BY INDEX
    
    -- USES A SMALL "u" FOR BYTES32 INDEXES
    -- USES A BIGG "U" for UINT256 INDEXES
    
    */
    
    function updateAddressedAddress(bytes32 key, uint index, address value) public
    {
        addressedAddressBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function updateAddressedBool(bytes32 key, uint index, bool value) public
    {
        addressedBoolBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function updateAddressedString(bytes32 key, uint index, bytes32 value) public
    {
        addressedStringBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function updateAddressedUint(bytes32 key, uint index, uint value) public
    {
        addressedUintBytes32Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateAddressedAddress(uint256 key, uint index, address value) public
    {
        addressedAddressUint256Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateAddressedBool(uint256 key, uint index, bool value) public
    {
        addressedBoolUint256Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateAddressedString(uint256 key, uint index, bytes32 value) public
    {
        addressedStringUint256Arrays[msg.sender][key][index] = value;
    }
    
    function UpdateAddressedUint(uint256 key, uint index, uint value) public
    {
        addressedUintUint256Arrays[msg.sender][key][index] = value;
    }
    
    /*
    
    ADDRESSED READ - ITEM FROM ARRAY BY INDEX
    
    -- USES A SMALL "r" FOR BYTES32 INDEXES
    -- USES A BIGG "R" for UINT256 INDEXES
    
    */
    
    function readAddressedAddress(address _address, bytes32 key, uint index) public returns(address value)
    {
        return addressedAddressBytes32Arrays[msg.sender][_address][key][index];
    }
    
    function readAddressedBool(address _address, bytes32 key, uint index) public returns(bool value)
    {
        return addressedBoolBytes32Arrays[msg.sender][_address][key][index];
    }
    
    function readAddressedString(address _address, bytes32 key, uint index) public returns(bytes32 value)
    {
        return addressedStringBytes32Arrays[msg.sender][_address][key][index];
    }
    
    function readAddressedUint(address _address, bytes32 key, uint index) public returns(uint value)
    {
        return addressedUintBytes32Arrays[msg.sender][_address][key][index];
    }
    
    function ReadAddressedAddress(address _address, uint256 key, uint index) public returns(address value)
    {
        return addressedAddressUint256Arrays[msg.sender][_address][key][index];
    }
    
    function ReadAddressedBool(address _address, uint256 key, uint index) public returns(bool value)
    {
        return addressedBoolUint256Arrays[msg.sender][_address][key][index];
    }
    
    function ReadAddressedString(address _address, uint256 key, uint index) public returns(bytes32 value)
    {
        return addressedStringUint256Arrays[msg.sender][_address][key][index];
    }
    
    function ReadAddressedUint(address _address, uint256 key, uint index) public returns(uint value)
    {
        return addressedUintUint256Arrays[msg.sender][_address][key][index];
    }
    
    /*
    
    ADDRESSED REMOVE - ITEM FROM ARRAY BY INDEX
    
    -- USES A SMALL "r" FOR BYTES32 INDEXES
    -- USES A BIGG "R" for UINT256 INDEXES
    
    */
    
    function removeAddressedAddress(bytes32 key, uint index) public
    {
        uint lastIndex = addressedAddressBytes32ArrayCounts[msg.sender][key] - 1;
        address poppedItem = addressedAddressBytes32Arrays[msg.sender][key][lastIndex];
        addressedAddressBytes32Arrays[msg.sender][key][index] = poppedItem;
        addressedAddressBytes32Arrays[msg.sender][key].length--;
        addressedAddressBytes32ArrayCount--;
        addressedAddressBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function removeAddressedBool(bytes32 key, uint index) public
    {
        uint lastIndex = addressedBoolBytes32ArrayCounts[msg.sender][key] - 1;
        bool poppedItem = addressedBoolBytes32Arrays[msg.sender][key][lastIndex];
        addressedBoolBytes32Arrays[msg.sender][key][index] = poppedItem;
        addressedBoolBytes32Arrays[msg.sender][key].length--;
        addressedBoolBytes32ArrayCount--;
        addressedBoolBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function removeAddressedString(bytes32 key, uint index) public
    {
        uint lastIndex = addressedStringBytes32ArrayCounts[msg.sender][key] - 1;
        bytes32 poppedItem = addressedStringBytes32Arrays[msg.sender][key][lastIndex];
        addressedStringBytes32Arrays[msg.sender][key][index] = poppedItem;
        addressedStringBytes32Arrays[msg.sender][key].length--;
        addressedStringBytes32ArrayCount--;
        addressedStringBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function removeAddressedUint(bytes32 key, uint index) public
    {
        uint lastIndex = addressedUintBytes32ArrayCounts[msg.sender][key] - 1;
        uint poppedItem = addressedUintBytes32Arrays[msg.sender][key][lastIndex];
        addressedUintBytes32Arrays[msg.sender][key][index] = poppedItem;
        addressedUintBytes32Arrays[msg.sender][key].length--;
        addressedUintBytes32ArrayCount--;
        addressedUintBytes32ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveAddressedAddress(uint256 key, uint index) public
    {
        uint lastIndex = addressedAddressUint256ArrayCounts[msg.sender][key] - 1;
        address poppedItem = addressedAddressUint256Arrays[msg.sender][key][lastIndex];
        addressedAddressUint256Arrays[msg.sender][key][index] = poppedItem;
        addressedAddressUint256Arrays[msg.sender][key].length--;
        addressedAddressUint256ArrayCount--;
        addressedAddressUint256ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveAddressedBool(uint256 key, uint index) public
    {
        uint lastIndex = addressedBoolUint256ArrayCounts[msg.sender][key] - 1;
        bool poppedItem = addressedBoolUint256Arrays[msg.sender][key][lastIndex];
        addressedBoolUint256Arrays[msg.sender][key][index] = poppedItem;
        addressedBoolUint256Arrays[msg.sender][key].length--;
        addressedBoolUint256ArrayCount--;
        addressedBoolUint256ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveAddressedString(uint256 key, uint index) public
    {
        uint lastIndex = addressedStringUint256ArrayCounts[msg.sender][key] - 1;
        bytes32 poppedItem = addressedStringUint256Arrays[msg.sender][key][lastIndex];
        addressedStringUint256Arrays[msg.sender][key][index] = poppedItem;
        addressedStringUint256Arrays[msg.sender][key].length--;
        addressedStringUint256ArrayCount--;
        addressedStringUint256ArrayCounts[msg.sender][key]--;
    }
    
    function RemoveAddressedUint(uint256 key, uint index) public
    {
        uint lastIndex = addressedUintUint256ArrayCounts[msg.sender][key] - 1;
        uint poppedItem = addressedUintUint256Arrays[msg.sender][key][lastIndex];
        addressedUintUint256Arrays[msg.sender][key][index] = poppedItem;
        addressedUintUint256Arrays[msg.sender][key].length--;
        addressedUintUint256ArrayCount--;
        addressedUintUint256ArrayCounts[msg.sender][key]--;
    }
}