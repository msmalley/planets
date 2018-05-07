pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// Private Contract = 0x9d4E8A0D228da31cb098647192E8D54287C030Be

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
    
    function toString(address x) internal pure returns (string) 
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
    function SetString(string key, bytes32 value) public;
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

contract ShareCertificates is ERC721Interface, Ownable, utils
{
    using SafeMath for uint;
    
    Proxy db;
    
    string public name = 'Share Certificates';
    string public symbol = 'DSC';
    
    event TokenPing(uint tokenId);
    
    function ShareCertificates(address proxyAddress) public 
    {
        db = Proxy(proxyAddress);
    }
    
    function updateDatabase(address proxyAddress) public onlyOwner 
    {
        db = Proxy(proxyAddress);
    }
    
    function assignNewEquity(address investor, address issuer, address trustee, address operator, string description) public 
    {  
        // Generate IDs
        uint totalTokens = db.GetUint('total');
        uint tokenID = buildTokenId(investor, issuer, trustee, operator, totalTokens);
        string memory _tokenID = uintToString(tokenID);
        
        // Check required paramters
        require(db.GetAddress(combine('owner', _tokenID, '', '', '')) == address(0));

        // Update token records
        db.SetUint(combine('ping', _tokenID, '', '', ''), now);
        _addTokenTo(investor, tokenID);
        db.SetString(combine('meta', _tokenID, '', '', ''), stringToBytes32(description));

        // Finalize process
        emit TokenCreated(tokenID, investor, description);  
        db.SetUint('total', totalTokens.add(1));
    }

    function ping(uint tokenId) public 
    {
        require(msg.sender == db.GetAddress(combine('owner', uintToString(tokenId), '', '', '')));
        db.SetUint(combine('ping', uintToString(tokenId), '', '', ''), now);
        emit TokenPing(tokenId);
    }

    function buildTokenId(address investor, address issuer, address trustee, address operator, uint index) public pure returns (uint256) 
    {
        return uint256(keccak256(investor, '|', issuer, '|', trustee, '|', operator, '|', index));
    }
    
    // Basic ERC721 Functionality

    function totalSupply() public constant returns (uint) 
    {
        return db.GetUint('total');
    }

    function balanceOf(address owner) public constant returns (uint) 
    {
        return db.GetUint(combine('len', toString(owner), '', '', ''));
    }

    function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(owner));
        return db.GetUint(combine('owned', toString(owner), uintToString(index), '', ''));
    }

    function getAllTokens(address owner) public constant returns (uint[]) 
    {
        uint size = db.GetUint(combine('len', toString(owner), '', '', ''));
        uint[] memory result = new uint[](size);
        for (uint i = 0; i < size; i++) {
            result[i] = db.GetUint(combine('owned', toString(owner), uintToString(i), '', ''));
        }
        return result;
    }

    function ownerOf(uint tokenId) public constant returns (address) 
    {
        return db.GetAddress(combine('owner', uintToString(tokenId), '', '', ''));
    }

    function transfer(address to, uint tokenId) public
    {
        require(db.GetAddress(combine('owner', uintToString(tokenId), '', '', '')) == msg.sender || db.GetAddress(combine('allow', uintToString(tokenId), '', '', '')) == msg.sender);
        _transfer(db.GetAddress(combine('owner', uintToString(tokenId), '', '', '')), to, tokenId);
    }

    function takeOwnership(uint tokenId) public 
    {
        require(db.GetAddress(combine('allow', uintToString(tokenId), '', '', '')) == msg.sender);
        _transfer(db.GetAddress(combine('owner', uintToString(tokenId), '', '', '')), msg.sender, tokenId);
    }

    function approve(address beneficiary, uint tokenId) public 
    {
        require(msg.sender == db.GetAddress(combine('owner', uintToString(tokenId), '', '', '')));
        if (db.GetAddress(combine('allow', uintToString(tokenId), '', '', '')) != address(0)) 
        {
            db.DeleteUint(combine('allow', uintToString(tokenId), '', '', ''));
            emit TokenTransferDisallowed(tokenId, db.GetAddress(combine('allow', uintToString(tokenId), '', '', '')));
        }
        db.SetAddress(combine('allow', uintToString(tokenId), '', '', ''), beneficiary);
        emit TokenTransferAllowed(tokenId, beneficiary);
    }

    function metadata(uint tokenId) constant public returns (string) 
    {
        string memory key = combine('meta', uintToString(tokenId), '', '', '');
        return bytes32ToString(db.GetString(key));
    }
    
    function indexOfToken(uint tokenId) constant public returns (uint) 
    {
        return db.GetUint(combine('index', uintToString(tokenId), '', '', ''));
    }
    
    function uintTest(uint tokenId) pure public returns (string) 
    {
        return uintToString(tokenId);
    }
    
    function bytesTest(string stringTest) pure public returns (bytes32) 
    {
        return stringToBytes32(combine(stringTest, '', '', '', ''));
    }
    
    function addressTest(address testAddress) pure public returns (string) 
    {
        return toString(testAddress);
    }
    
    function uintCombineTest(uint tokenId) pure public returns (string) 
    {
        return combine('index', uintToString(tokenId), '', '', '');
    }

    function updateTokenMetadata(uint tokenId, string _metadata) internal returns(bool)
    {
        require(msg.sender == db.GetAddress(combine('owner', uintToString(tokenId), '', '', '')));
        db.SetString(combine('meta', uintToString(tokenId), '', '', ''), stringToBytes32(_metadata));
        emit TokenMetadataUpdated(tokenId, msg.sender, _metadata);
        return true;
    }

    function _transfer(address from, address to, uint tokenId) internal returns(bool)
    {
        db.DeleteAddress(combine('allow', uintToString(tokenId), '', '', ''));
        _removeTokenFrom(from, tokenId);
        _addTokenTo(to, tokenId);
        emit TokenTransferred(tokenId, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint tokenId) internal 
    {
        uint virtualLength = db.GetUint(combine('len', toString(from), '', '', ''));
        require(virtualLength > 0);
        uint index = db.GetUint(combine('index', uintToString(tokenId), '', '', ''));
        uint swapToken = db.GetUint(combine('owned', toString(from), uintToString(virtualLength - 1), '', ''));
        //db.DeleteUint(combine('owned', toString(from), uintToString(virtualLength - 1), '', ''));
        db.SetUint(combine('owned', toString(from), uintToString(index), '', ''), swapToken);
        db.SetUint(combine('index', uintToString(swapToken), '', '', ''), index);
        db.SetUint(combine('len', toString(from), '', '', ''), virtualLength - 1);
    }

    function _addTokenTo(address to, uint tokenId) internal 
    {
        string memory _owner = toString(to);
        string memory _tokenID = uintToString(tokenId);
        string memory lengthKey = combine('len', _owner, '', '', '');
        uint virtualLength = db.GetUint(lengthKey);
        
        db.SetUint(combine('owned', _owner, uintToString(virtualLength), '', ''), tokenId);
        
        db.SetAddress(combine('owner', _tokenID, '', '', ''), to);
        db.SetUint(combine('index', _tokenID, '', '', ''), virtualLength);
        db.SetUint(lengthKey, virtualLength + 1);
    }
}