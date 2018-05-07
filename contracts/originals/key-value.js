pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// V0.2.5 - Private = 0x72b8b19DcF79f9a0e205eF84E01Bc09E03f1b2ac = sc025

contract Ownable 
{
  address public owner;
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  function Ownable() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner public {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}

contract utils
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
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
    
    function uintToString(uint i) internal pure returns (string) {
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0){
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (i != 0){
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
    
    function char(byte b) internal pure returns (byte c) {
        if (b < 10) return byte(uint8(b) + 0x30);
        else return byte(uint8(b) + 0x57);
    }
    
    function toString(address x) public pure returns (string) 
    {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
            byte hi = byte(uint8(b) / 16);
            byte lo = byte(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }
    
    function ts() internal view returns(string)
    {
        return bytes32ToString(stringToBytes32(uintToString(now)));
    }
}

contract KeyValueStorage is Ownable, utils 
{
    /* INDEXES */
    mapping(address => mapping(bytes32 => address)) addressRecords;
    mapping(address => mapping(bytes32 => bool)) boolRecords;
    mapping(address => mapping(bytes32 => bytes32)) stringRecords;
    mapping(address => mapping(bytes32 => uint256)) uintRecords;
    
    /* COUNTS */
    uint addressCount;
    uint boolCount;
    uint stringCount;
    uint uintCount;
    mapping(address => uint) addressCounts;
    mapping(address => uint) boolCounts;
    mapping(address => uint) stringCounts;
    mapping(address => uint) uintCounts;

    /**** Get Methods ***********/

    function getAddress(bytes32 key) public view returns (address) 
    {
        return addressRecords[msg.sender][key];
    }
    
    function getBool(bytes32 key) public view returns (bool) 
    {
        return boolRecords[msg.sender][key];
    }
    
    function getString(bytes32 key) public view returns (bytes32) 
    {
        return stringRecords[msg.sender][key];
    }
    
    function getRealString(bytes32 key) public view returns (string) 
    {
        return bytes32ToString(stringRecords[msg.sender][key]);
    }

    function getUint(bytes32 key) public view returns (uint) 
    {
        return uintRecords[msg.sender][key];
    }
    
    // Counts
    function getAddressCount() public view returns (uint)
    {
        return addressCount;
    }
    
    function getBoolCount() public view returns (uint)
    {
        return boolCount;
    }
    
    function getStringCount() public view returns (uint)
    {
        return stringCount;
    }
    
    function getUintCount() public view returns (uint)
    {
        return uintCount;
    }
    
    // Administrator Functions ...
    function addressCountOfCollection(address collectionAddress) public view returns (uint)
    {
        return addressCounts[collectionAddress];
    }
    
    function boolCountOfCollection(address collectionAddress) public view returns (uint)
    {
        return boolCounts[collectionAddress];
    }
    
    function stringCountOfCollection(address collectionAddress) public view returns (uint)
    {
        return stringCounts[collectionAddress];
    }
    
    function uintCountOfCollection(address collectionAddress) public view returns (uint)
    {
        return uintCounts[collectionAddress];
    }
    
    function getAddressOfCollection(address collectionAddress, bytes32 key) public view returns (address) 
    {
        return addressRecords[collectionAddress][key];
    }
    
    function getBoolOfCollection(address collectionAddress, bytes32 key) public view returns (bool) 
    {
        return boolRecords[collectionAddress][key];
    }
    
    function getStringOfCollection(address collectionAddress, bytes32 key) public view returns (bytes32) 
    {
        return stringRecords[collectionAddress][key];
    }
    
    function getRealStringOfCollection(address collectionAddress, bytes32 key) public view returns (string) 
    {
        return bytes32ToString(stringRecords[collectionAddress][key]);
    }

    function getUintOfCollection(address collectionAddress, bytes32 key) public view returns (uint) 
    {
        return uintRecords[collectionAddress][key];
    }
    
    function getAddressOfCollectionByString(address collectionAddress, string key) public view returns (address) 
    {
        bytes32 _key = stringToBytes32(key);
        return addressRecords[collectionAddress][_key];
    }
    
    function getBoolOfCollectionByString(address collectionAddress, string key) public view returns (bool) 
    {
        bytes32 _key = stringToBytes32(key);
        return boolRecords[collectionAddress][_key];
    }
    
    function getStringOfCollectionByString(address collectionAddress, string key) public view returns (bytes32) 
    {
        bytes32 _key = stringToBytes32(key);
        return stringRecords[collectionAddress][_key];
    }
    
    function getRealStringOfCollectionByString(address collectionAddress, string key) public view returns (string) 
    {
        bytes32 _key = stringToBytes32(key);
        return bytes32ToString(stringRecords[collectionAddress][_key]);
    }

    function getUintOfCollectionByString(address collectionAddress, string key) public view returns (uint) 
    {
        bytes32 _key = stringToBytes32(key);
        return uintRecords[collectionAddress][_key];
    }

    /**** Set Methods ***********/

    function setAddress(bytes32 key, address value) public 
    {
        addressRecords[msg.sender][key] = value;
        addressCounts[msg.sender]++;
        addressCount++;
    }
    
    function setBool(bytes32 key, bool value) public 
    {
        boolRecords[msg.sender][key] = value;
        boolCounts[msg.sender]++;
        boolCount++;
    }
    
    function setString(bytes32 key, bytes32 value) public 
    {
        stringRecords[msg.sender][key] = value;
        stringCounts[msg.sender]++;
        stringCount++;
    }

    function setUint(bytes32 key, uint value) public 
    {
        uintRecords[msg.sender][key] = value;
        uintCounts[msg.sender]++;
        uintCount++;
    }
    
    // Administrator Functions ...
    function setAddressOfCollection(address collectionAddress, bytes32 key, address value) public onlyOwner
    {
        addressRecords[collectionAddress][key] = value;
        addressCounts[collectionAddress]++;
        addressCount++;
    }
    
    function setBoolOfCollection(address collectionAddress, bytes32 key, bool value) public onlyOwner
    {
        boolRecords[collectionAddress][key] = value;
        boolCounts[collectionAddress]++;
        boolCount++;
    }
    
    function setStringOfCollection(address collectionAddress, bytes32 key, bytes32 value) public onlyOwner
    {
        stringRecords[collectionAddress][key] = value;
        stringCounts[collectionAddress]++;
        stringCount++;
    }

    function setUintOfCollection(address collectionAddress, bytes32 key, uint value) public onlyOwner
    {
        uintRecords[collectionAddress][key] = value;
        uintCounts[collectionAddress]++;
        uintCount++;
    }
    
    function setAddressOfCollectionByString(address collectionAddress, string key, address value) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        addressRecords[collectionAddress][_key] = value;
        addressCounts[collectionAddress]++;
        addressCount++;
    }
    
    function setBoolOfCollectionByString(address collectionAddress, string key, bool value) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        boolRecords[collectionAddress][_key] = value;
        boolCounts[collectionAddress]++;
        boolCount++;
    }
    
    function setStringOfCollectionByString(address collectionAddress, string key, bytes32 value) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        stringRecords[collectionAddress][_key] = value;
        stringCounts[collectionAddress]++;
        stringCount++;
    }

    function setUintOfCollectionByString(address collectionAddress, string key, uint value) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        uintRecords[collectionAddress][_key] = value;
        uintCounts[collectionAddress]++;
        uintCount++;
    }

    /**** Delete Methods ***********/

    function deleteAddress(bytes32 key) public 
    {
        delete addressRecords[msg.sender][key];
        addressCounts[msg.sender]--;
        addressCount--;
    }
    
    function deleteBool(bytes32 key) public 
    {
        delete boolRecords[msg.sender][key];
        boolCounts[msg.sender]--;
        boolCount--;
    }
    
    function deleteString(bytes32 key) public 
    {
        delete stringRecords[msg.sender][key];
        stringCounts[msg.sender]--;
        stringCount--;
    }

    function deleteUint(bytes32 key) public 
    {
        delete uintRecords[msg.sender][key];
        uintCounts[msg.sender]--;
        uintCount--;
    }
    
    // Administrator Functions...
    function deleteAddressOfCollection(address collectionAddress, bytes32 key) public onlyOwner
    {
        delete addressRecords[collectionAddress][key];
        addressCounts[collectionAddress]--;
        addressCount--;
    }
    
    function deleteBoolOfCollection(address collectionAddress, bytes32 key) public onlyOwner
    {
        delete boolRecords[collectionAddress][key];
        boolCounts[collectionAddress]--;
        boolCount--;
    }
    
    function deleteStringOfCollection(address collectionAddress, bytes32 key) public onlyOwner
    {
        delete stringRecords[collectionAddress][key];
        stringCounts[collectionAddress]--;
        stringCount--;
    }

    function deleteUintOfCollection(address collectionAddress, bytes32 key) public onlyOwner
    {
        delete uintRecords[collectionAddress][key];
        uintCounts[collectionAddress]--;
        uintCount--;
    }
    
    function deleteAddressOfCollectionByString(address collectionAddress, string key) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        delete addressRecords[collectionAddress][_key];
        addressCounts[collectionAddress]--;
        addressCount--;
    }
    
    function deleteBoolOfCollectionByString(address collectionAddress, string key) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        delete boolRecords[collectionAddress][_key];
        boolCounts[collectionAddress]--;
        boolCount--;
    }
    
    function deleteStringOfCollectionByString(address collectionAddress, string key) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        delete stringRecords[collectionAddress][_key];
        stringCounts[collectionAddress]--;
        stringCount--;
    }

    function deleteUintOfCollectionByString(address collectionAddress, string key) public onlyOwner
    {
        bytes32 _key = stringToBytes32(key);
        delete uintRecords[collectionAddress][_key];
        uintCounts[collectionAddress]--;
        uintCount--;
    }
}