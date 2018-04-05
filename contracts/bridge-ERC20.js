pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// V1.1 - Private = 0xE9af997BcB3Fe832393640C96042aAF2abA14596 = 1.1 Ether

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

contract ERC20Interface
{
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract ApproveAndCallFallBack 
{
    function receiveApproval(address from, uint256 tokens, address token, bytes data) public;
}

contract FixedTokenSupply is ERC20Interface, Ownable, utils
{
    using SafeMath for uint;
    
    string public name;
    string public symbol;
    uint public decimals;
    
    Proxy db;
    
    function FixedTokenSupply(string tokenName, string tokenSymbol, uint tokenSupply, uint tokenDecimals, address proxyAddress) public 
    {
        db = Proxy(proxyAddress);
        name = tokenName;
        symbol = tokenSymbol;
        decimals = tokenDecimals;
        uint actualSupply = tokenSupply * 10**uint(tokenDecimals); // Auto calculate actual supply
        db.SetString('token.name', tokenName);
        db.SetString('token.symbol', tokenSymbol);
        db.SetUint('token.decimals', tokenDecimals);
        db.SetUint('token.supply', actualSupply);
        db.SetUint(combine('balances', toString(owner), '', '', ''), actualSupply);
        emit Transfer(address(0), owner, actualSupply);
    }
    
    function updateDatabase(address proxyAddress) public onlyOwner
    {
        db = Proxy(proxyAddress);
    }

    function totalSupply() public constant returns (uint) 
    {
        return db.GetUint('token.supply') - db.GetUint(combine('balances', toString(address(0)), '', '', ''));
    }

    function balanceOf(address tokenOwner) public constant returns (uint balance) 
    {
        return db.GetUint(combine('balances', toString(tokenOwner), '', '', ''));
    }

    function transfer(address to, uint tokens) public returns (bool success) 
    {
        db.SetUint(combine('balances', toString(msg.sender), '', '', ''), db.GetUint(combine('balances', toString(msg.sender), '', '', '')).sub(tokens));
        db.SetUint(combine('balances', toString(to), '', '', ''), db.GetUint(combine('balances', toString(to), '', '', '')).add(tokens));
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public returns (bool success) 
    {
        db.SetUint(combine('allowed', toString(msg.sender), toString(spender), '', ''), tokens);
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) 
    {
        db.SetUint(combine('balances', toString(from), '', '', ''), db.GetUint(combine('balances', toString(from), '', '', '')).sub(tokens));
        db.SetUint(combine('allowed', toString(from), toString(msg.sender), '', ''), db.GetUint(combine('allowed', toString(from), toString(msg.sender), '', '')).sub(tokens));
        db.SetUint(combine('balances', toString(to), '', '', ''), db.GetUint(combine('balances', toString(to), '', '', '')).add(tokens));
        emit Transfer(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public constant returns (uint remaining) 
    {
        return db.GetUint(combine('allowed', toString(tokenOwner), toString(spender), '', ''));
    }

    function approveAndCall(address spender, uint tokens, bytes data) public returns (bool success) 
    {
        db.SetUint(combine('allowed', toString(msg.sender), toString(spender), '', ''), tokens);
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, this, data);
        return true;
    }

    function () public payable 
    {
        revert();
    }

    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) 
    {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }
}