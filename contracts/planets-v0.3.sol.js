pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// V1.1 - Private = XXX = 1.1 Ether

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
    
    function toString(address x) internal pure returns (string) 
    {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
    
    function ts() internal view returns(string)
    {
        return bytes32ToString(stringToBytes32(uintToString(now)));
    }
}

library SafeMath 
{
    function add(uint a, uint b) internal pure returns (uint c) 
    {
        c = a + b;
        require(c >= a);
    }

    function sub(uint a, uint b) internal pure returns (uint c) 
    {
        require(b <= a);
        c = a - b;
    }

    function mul(uint a, uint b) internal pure returns (uint c) 
    {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function div(uint a, uint b) internal pure returns (uint c) 
    {
        require(b > 0);
        c = a / b;
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

contract ERC721Interface
{
    function totalSupply() public constant returns (uint);
    function balanceOf(address) public constant returns (uint);
    function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint);
    function ownerOf(uint tokenId) public constant returns (address);
    function transfer(address to, uint tokenId) public;
    function takeOwnership(uint tokenId) public;
    function approve(address beneficiary, uint tokenId) public;
    function metadata(uint tokenId) public constant returns (string);
    event TokenCreated(uint tokenId, address owner, string metadata);
    event TokenDestroyed(uint tokenId, address owner);
    event TokenTransferred(uint tokenId, address from, address to);
    event TokenTransferAllowed(uint tokenId, address beneficiary);
    event TokenTransferDisallowed(uint tokenId, address beneficiary);
    event TokenMetadataUpdated(uint tokenId, address owner, string data);
}

contract InterplanetaryEmbassy is ERC721Interface, Ownable, utils
{
    using SafeMath for uint;
    
    Proxy db;
    
    // Can put IE functionality above ERC721 ...?
    
    function InterplanetaryEmbassy(address proxyAddress) public 
    {
        db = Proxy(proxyAddress);
    }
    
    function updateDatabase(address proxyAddress) public onlyOwner 
    {
        db = Proxy(proxyAddress);
    }
    
    // Basic ERC721 Functionality
    
    /*
    
    NEED TO USE "db" INSTEAD
    
    uint public totalTokens;
    mapping(address => uint[]) public ownedTokens;
    mapping(address => uint) _virtualLength;
    mapping(uint => uint) _tokenIndexInOwnerArray;
    mapping(uint => address) public tokenOwner;
    mapping(uint => address) public allowedTransfer;
    mapping(uint => string) public tokenMetadata;
    
    -- TO BE REMOVED
    
    */

    function totalSupply() public constant returns (uint) 
    {
        return db.GetUnit('totalTokens');
    }

    function balanceOf(address owner) public constant returns (uint) 
    {
        return db.GetUint(combine('virtualLength', toString(owner), '', '', ''));
    }

    function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(owner));
        return db.GetUint(combine('ownedTokens', toString(owner), toString(index), '', ''));
    }

    function getAllTokens(address owner) public constant returns (uint[]) 
    {
        uint size = db.GetUint(combine('virtualLength', toString(owner), '', '', ''));
        uint[] memory result = new uint[](size);
        for (uint i = 0; i < size; i++) {
            result[i] = db.GetUint(combine('ownedTokens', toString(owner), toString(i), '', '');
        }
        return result;
    }

    function ownerOf(uint tokenId) public constant returns (address) 
    {
        return db.GetAddress(combine('tokenOwner', toString(tokenId), '', '', ''));
    }

    function transfer(address to, uint tokenId) public
    {
        require(db.GetAddress(combine('tokenOwner', toString(tokenId), '', '', '')) == msg.sender || db.GetAddress(combine('allowedTransfer', toString(tokenId), '', '', '')) == msg.sender);
        _transfer(db.GetAddress(combine('tokenOwner', toString(tokenId), '', '', '')), to, tokenId);
    }

    function takeOwnership(uint tokenId) public 
    {
        require(db.GetAddress(combine('allowedTransfer', toString(tokenId), '', '', '')) == msg.sender);
        _transfer(db.GetAddress(combine('tokenOwner', toString(tokenId), '', '', '')), msg.sender, tokenId);
    }

    function approve(address beneficiary, uint tokenId) public 
    {
        require(msg.sender == db.GetAddress(combine('tokenOwner', toString(tokenId), '', '', '')));
        if (db.GetAddress(combine('allowedTransfer', toString(tokenId), '', '', '')) != 0) 
        {
            db.SetUint(combine('allowedTransfer', toString(tokenId), '', '', ''), 0);
            TokenTransferDisallowed(tokenId, db.GetAddress(combine('allowedTransfer', toString(tokenId), '', '', '')));
        }
        db.SetAddress(combine('allowedTransfer', toString(tokenId), '', '', ''), beneficiary);
        TokenTransferAllowed(tokenId, beneficiary);
    }

    function metadata(uint tokenId) constant public returns (string) 
    {
        return db.GetString(combine('tokenMetadata', toString(tokenId), '', '', ''));
    }

    function updateTokenMetadata(uint tokenId, string _metadata) internal returns(bool)
    {
        require(msg.sender == db.GetAddress(combine('tokenOwner', toString(tokenId), '', '', '')));
        db.SetString(combine('tokenMetadata', toString(tokenId), '', '', ''), _metadata);
        TokenMetadataUpdated(tokenId, msg.sender, _metadata);
        return true;
    }

    function _transfer(address from, address to, uint tokenId) internal returns(bool)
    {
        db.SetAddress(combine('allowedTransfer', toString(tokenId), '', '', ''), 0);
        _removeTokenFrom(from, tokenId);
        _addTokenTo(to, tokenId);
        TokenTransferred(tokenId, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint tokenId) internal 
    {
        require(db.GetUint(combine('virtualLength', toString(from), '', '', '')) > 0);
        uint length = db.GetUint(combine('virtualLength', toString(from), '', '', ''));
        uint index = db.GetUnit(combine('tokenIndexInOwnerArray', toString(tokenId), '', '', ''));
        uint swapToken = db.GetUint(combine('ownedTokens', toString(from), toString(length - 1), '', ''));
        db.SetUint(combine('ownedTokens', toString(from), toString(index), '', ''), swapToken);
        db.SetUint(combine('tokenIndexInOwnerArray', toString(swapToken), '', '', ''), index);
        db.SetUint(combine('virtualLength', toString(from), '', '', ''), db.GetUint(combine('virtualLength', toString(from), '', '', '')) - 1);
    }

    function _addTokenTo(address owner, uint tokenId) internal 
    {
        db.SetUint(combine('ownedTokens', toString(owner), db.GetUint(combine('virtualLength', toString(owner), '', '', '')), '', ''), tokenId);
        
        db.SetAddress(combine('tokenOwner', toString(tokenId), '', '', ''), owner);
        db.SetUint(combine('tokenIndexInOwnerArray', toString(tokenId), '', '', ''), db.GetUint(combine('virtualLength', toString(owner), '', '', '')));
        db.SetUint(combine('virtualLength', toString(owner), '', '', ''), db.GetUint(combine('virtualLength', toString(owner), '', '', '') + 1);
    }
}