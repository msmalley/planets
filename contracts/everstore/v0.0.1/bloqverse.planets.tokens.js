pragma solidity ^0.4.18;

// Private Owner = 0xB7a43A245e12b69Fd035EA95E710d17e71449f96
// v0.0.1 = Tokens ERC721 Only = 0xFdFBbA370f9dffaB7e66a885734De74d101d1ef3 = 0.63
// v0.0.1 = Tokens ERC721 Only = 0xA1D7D6d9dA01DAA8Af1F348637C4e2bd7F767B36 = 0.73
// v0.0.1 = Tokens ERC721 Only = 0x114Cbbda1d6b6D0196380959e20eAbf684013959 = 0.78
// v0.0.1 = Tokens ERC721 Only = 0x214515fcFE35A5026b1FCC881637e7a733824a85 = 0.81
// v0.0.1 = Tokens ERC721 Only = 0xbBd23E1aa6266Fa9206559C566b61e41919969dc = 0.71
// v0.0.1 = Tokens ERC721 Only = 0x96C91a75143adf0E0B24a062A636704a31ad3d24 = 0.68
// v0.0.1 = Tokens ERC721 Only = 0x3D402802a379DA904D107f48f31D24D1039c09b3 = 0.71
// v0.0.1 = Tokens ERC721 Only = 0x4afaE42841F1132B1AE4bdbffaC28bfcb3eCac2e = 0.71

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

contract Proxy is Upgradable
{
    // Set Contract Data
    function setAddress(string key, address value) public;
    function setBool(string key, bool value) public;
    function setString(string key, bytes32 value) public;
    function setUint(string key, uint256 value) public;
    // Set Addressed Data
    function setsAddress(address addressKey, string param, address value) public;
    function setsBool(address addressKey, string param, bool value) public;
    function setsString(address addressKey, string param, bytes32 value) public;
    function setsUint(address addressKey, string param, uint256 value) public;
    // Set Token Data
    function SetAddress(uint256 key, string param, address value) public;
    function SetBool(uint256 key, string param, bool value) public;
    function SetString(uint256 key, string param, bytes32 value) public;
    function SetUint(uint256 key, string param, uint256 value) public;
    // Get Contract Data
    function getAddress(string key) public view returns(address);
    function getBool(string key) public view returns(bool);
    function getString(string key) public view returns(bytes32);
    function getUint(string key) public view returns(uint256);
    // Get Addressed Data
    function getsAddress(address addressKey, string param) public view returns(address);
    function getsBool(address addressKey, string param) public view returns(bool);
    function getsString(address addressKey, string param) public view returns(bytes32);
    function getsUint(address addressKey, string param) public view returns(uint256);
    // Get Token Data
    function GetAddress(uint256 key, string param) public view returns(address);
    function GetBool(uint256 key, string param) public view returns(bool);
    function GetString(uint256 key, string param) public view returns(bytes32);
    function GetUint(uint256 key, string param) public view returns(uint256);
    // Get Contract Data Counts
    function contractAddressCount() public view returns(uint);
    function contractBoolCount() public view returns(uint);
    function contractStringCount() public view returns(uint);
    function contractUintCount() public view returns(uint);
    // Get Addressed Data Counts
    function addressAddressCount(address addressKey) public view returns(uint);
    function addressBoolCount(address addressKey) public view returns(uint);
    function addressStringCount(address addressKey) public view returns(uint);
    function addressUintCount(address addressKey) public view returns(uint);
    // Get Token Data Counts
    function tokenAddressCount(uint256 key) public view returns(uint);
    function tokenBoolCount(uint256 key) public view returns(uint);
    function tokenStringCount(uint256 key) public view returns(uint);
    function tokenUintCount(uint256 key) public view returns(uint);
}

contract ERC721 is Upgradable
{
    function totalSupply() public view returns (uint);
    function balanceOf(address) public view returns (uint);
    function tokenOfOwnerByIndex(address beneficiary, uint index) public view returns (uint);
    function ownerOf(uint tokenId) public view returns (address);
    function transfer(address to, uint tokenId) public;
    function takeOwnership(uint tokenId) public;
    function approve(address beneficiary, uint tokenId) public;
    function metadata(uint256 tokenId) public view returns (string);
    event TokenCreated(uint tokenId, address beneficiary, string meta);
    event TokenDestroyed(uint tokenId, address beneficiary);
    event TokenTransferred(uint tokenId, address from, address to);
    event TokenTransferAllowed(uint tokenId, address beneficiary);
    event TokenTransferDisallowed(uint tokenId, address beneficiary);
    event TokenMetadataUpdated(uint tokenId, address beneficiary, string data);
}

contract PlanetTokens is ERC721
{
    Proxy db;
    
    string public name = 'Planet Tokens';
    string public symbol = 'PT';
    
    function PlanetTokens
    (
        address proxyAddress
    ) 
    public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    function updateProxy(address proxyAddress) public onlyOwner
    {
        db = Proxy(proxyAddress);
    }
    
    /*
    
    ERC721 FUNCTIONS
    
    */
    function totalSupply() public view returns (uint) 
    {
        return db.getUint('total');
    }

    function balanceOf(address beneficiary) public view returns (uint) 
    {
        return db.getsUint(beneficiary, 'balance');
    }

    function tokenOfOwnerByIndex(address beneficiary, uint index) public view returns (uint) 
    {
        require(index >= 0);
        require(index < balanceOf(beneficiary));
        string memory uid = combine('owned', '_', uintToString(index), '', '');
        return db.getsUint(beneficiary, uid);
    }

    function getAllTokens(address beneficiary) public view returns (uint[]) 
    {
        uint size = db.getsUint(beneficiary, 'balance');
        uint[] memory result = new uint[](size);
        for (uint index = 0; index < size; index++) 
        {
            string memory uid = combine('owned', '_', uintToString(index), '', '');
            result[index] = db.getsUint(beneficiary, uid);
        }
        return result;
    }

    function ownerOf(uint id) public view returns (address) 
    {
        return db.GetAddress(id, 'owner');
    }

    function transfer(address to, uint id) public
    {
        require(
            db.GetAddress(id, 'owner') == msg.sender 
            || db.GetAddress(id, 'allowed') == msg.sender
        );
        _transfer(db.GetAddress(id, 'owner'), to, id);
    }

    function takeOwnership(uint id) public 
    {
        require(db.GetAddress(id, 'allowed') == msg.sender);
        _transfer(db.GetAddress(id, 'owner'), msg.sender, id);
    }

    function approve(address beneficiary, uint id) public 
    {
        require(db.GetAddress(id, 'owner') == msg.sender);
        if(db.GetAddress(id, 'allowed') != 0)
        {
            db.SetAddress(id, 'allowed', 0);
            emit TokenTransferDisallowed(id, db.GetAddress(id, 'allowed'));
        }
        db.SetAddress(id, 'allowed', beneficiary);
        emit TokenTransferAllowed(id, beneficiary);
    }

    function metadata(uint256 id) public view returns(string) 
    {
        return bytes32ToString(db.GetString(id, 'meta'));
    }

    function updateTokenMetadata(uint id, string meta) internal returns(bool)
    {
        require(db.GetAddress(id, 'owner') == msg.sender);
        db.SetString(id, 'meta', stringToBytes32(meta));
        emit TokenMetadataUpdated(id, msg.sender, meta);
        return true;
    }
    
    function mint(address beneficiary, uint256 id, string meta) external
    {
        db.SetString(id, 'meta', stringToBytes32(meta));
        db.setUint('total', db.getUint('total') + 1);
        _addTokenTo(beneficiary, id);
    }
    
    function updateTokensMetadata(address sender, uint256 id, string meta) public returns(bool)
    {
        require(db.GetAddress(id, 'owner') == sender);
        db.SetString(id, 'meta', stringToBytes32(meta));
        emit TokenMetadataUpdated(id, msg.sender, meta);
        return true;
    }

    function _transfer(address from, address to, uint id) internal returns(bool)
    {
        db.SetAddress(id, 'allowed', 0);
        _removeTokenFrom(from, id);
        _addTokenTo(to, id);
        emit TokenTransferred(id, from, to);
        return true;
    }

    function _removeTokenFrom(address from, uint id) internal 
    {
        require(db.getsAddress(from, 'balance') > 0);
        uint length = db.getsUint(from, 'balance');
        uint index = db.GetUint(id, 'index');
        string memory uid = combine('owned', '_', uintToString(length - 1), '', '');
        uint swapToken = db.getsUint(from, uid);
        db.setsUint(from, uid, 0);
        db.SetUint(swapToken, 'index', index);
        db.setsUint(from, 'balance', db.getsUint(from, 'balance') - 1);
    }

    function _addTokenTo(address beneficiary, uint id) internal 
    {
        uint length = db.getsUint(beneficiary, 'balance');
        string memory uid = combine('owned', '_', uintToString(length), '', '');
        db.setsUint(beneficiary, uid, id);
        db.SetAddress(id, 'owner', beneficiary);
        db.SetUint(id, 'index', length);
        db.setsUint(beneficiary, 'balance', length + 1);
    }
}