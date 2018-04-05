pragma solidity ^0.4.18;

// V1.1 - Private = 0x7775fe58F3d1007e1Df56DaC042C2FB17A51e115 = 0.7 Ether

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
    
    function uintToString(uint v) internal pure returns (string) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        return string(s);
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
    
    function ts() internal view returns(string)
    {
        return bytes32ToString(stringToBytes32(uintToString(now)));
    }
}



/*

Proxy Interface

*/

contract Proxy 
{
    function GetAddress(string key) public view returns(address);
    function GetBool(string key) public view returns(bool);
    function GetString(string key) public view returns(bytes32);
    function GetRealString(string key) public view returns(string);
    function GetUint(string key) public view returns(uint);
    function GetAddressCount() public view returns(uint);
    function GetBoolCount() public view returns(uint);
    function GetStringCount() public view returns(uint);
    function GetUintCount() public view returns(uint);
    function SetAddress(string key, address value) public;
    function SetBool(string key, bool value) public;
    function SetString(string key, string value) public;
    function SetUint(string key, uint value) public;
    function DeleteAddress(string key) public;
    function DeleteBool(string key) public;
    function DeleteString(string key) public;
    function DeleteUint(string key) public;
}

contract Database is Ownable, utils 
{

    Proxy db;
    
    function Database(address proxyAddress) public
    {
        db = Proxy(proxyAddress);
    }
    
    function updateDatabase(address proxyAddress) public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function GetAddress(string key) public view returns(address) 
    {
        return db.GetAddress(key);
    }
    
    function GetBool(string key) public view returns(bool) 
    {
        return db.GetBool(key);
    }
    
    function GetString(string key) public view returns(bytes32) 
    {
        return db.GetString(key);
    }
    
    function GetRealString(string key) public view returns(string) 
    {
        string memory value = bytes32ToString(db.GetString(key));
        return value;
    }
    
    function GetUint(string key) public view returns(uint) 
    {
        return db.GetUint(key);
    }
    
    function GetAddressCount() public view returns(uint) 
    {
        return db.GetAddressCount();
    }
    
    function GetBoolCount() public view returns(uint) 
    {
        return db.GetBoolCount();
    }
    
    function GetStringCount() public view returns(uint) 
    {
        return db.GetStringCount();
    }
    
    function GetUintCount() public view returns(uint) 
    {
        return db.GetUintCount();
    }
    
    function SetAddress(string key, address value) public
    {
        db.SetAddress(key, value);
    }
    
    function SetBool(string key, bool value) public
    {
        db.SetBool(key, value);
    }
    
    function SetString(string key, string value) public
    {
        db.SetString(key, value);
    }
    
    function SetUint(string key, uint value) public
    {
        db.SetUint(key, value);
    }
    
    function DeleteAddress(string key) public
    {
        db.DeleteAddress(key);
    }
    
    function DeleteBool(string key) public
    {
        db.DeleteBool(key);
    }
    
    function DeleteString(string key) public
    {
        db.DeleteString(key);
    }
    
    function DeleteUint(string key) public
    {
        db.DeleteUint(key);
    }
}