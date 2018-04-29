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

/*

-- BETTER TO ABSTRACT AS CLASSES ??? IE :- 
    
-- Address.Id.Create()
-- Bool.Id.Read()
-- String.Key.Array.Update()
-- Uint.Key.Array.Destroy();

*/

// Keys & Values
contract Address is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

contract Bool is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

contract String is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

contract Uint is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

// Addressed Keys & Values
contract Addresses is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

contract Bools is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

contract Strings is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}

contract Uints is AbleToUtilizeStrings
{
    // Bytes32 Keys
    function create() public;
    function read() public;
    function update() public;
    function destroy() public;
    
    // Uint256 Keys
    function Create() public;
    function Read() public;
    function Update() public;
    function Destroy() public;
    
    // Bytes32 Arrays
    function push() public;
    function pull() public;
    function edit() public;
    function remove() public;
    
    // Uint256 Arrays
    function Push() public;
    function Pull() public;
    function Edit() public;
    function Remove() public;
}