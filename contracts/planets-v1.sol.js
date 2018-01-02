pragma solidity ^0.4.18;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
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
    OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }
}

contract NFT 
{
  function totalSupply() public constant returns (uint);
  function balanceOf(address) public constant returns (uint);
  function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint);
  function ownerOf(uint tokenId) public constant returns (address);
  function transfer(address to, uint tokenId) public;
  function takeOwnership(uint tokenId) public;
  function approve(address beneficiary, uint tokenId) public;
  function metadata(uint tokenId) public constant returns (string);
}

contract NFTEvents 
{
  event TokenCreated(uint tokenId, address owner, string metadata);
  event TokenDestroyed(uint tokenId, address owner);
  event TokenTransferred(uint tokenId, address from, address to);
  event TokenTransferAllowed(uint tokenId, address beneficiary);
  event TokenTransferDisallowed(uint tokenId, address beneficiary);
  event TokenMetadataUpdated(uint tokenId, address owner, string data);
}

contract BasicNFT is NFT, NFTEvents 
{
  uint public totalTokens;

  // Array of owned tokens for a user
  mapping(address => uint[]) public ownedTokens;
  mapping(address => uint) _virtualLength;
  mapping(uint => uint) _tokenIndexInOwnerArray;

  // Mapping from token ID to owner
  mapping(uint => address) public tokenOwner;

  // Allowed transfers for a token (only one at a time)
  mapping(uint => address) public allowedTransfer;

  // Metadata associated with each token
  mapping(uint => string) public tokenMetadata;

  function totalSupply() public constant returns (uint) 
  {
    return totalTokens;
  }

  function balanceOf(address owner) public constant returns (uint) 
  {
    return _virtualLength[owner];
  }

  function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint) 
  {
    require(index >= 0 && index < balanceOf(owner));
    return ownedTokens[owner][index];
  }

  function getAllTokens(address owner) public constant returns (uint[]) 
  {
    uint size = _virtualLength[owner];
    uint[] memory result = new uint[](size);
    for (uint i = 0; i < size; i++) {
      result[i] = ownedTokens[owner][i];
    }
    return result;
  }

  function ownerOf(uint tokenId) public constant returns (address) 
  {
    return tokenOwner[tokenId];
  }

  function transfer(address to, uint tokenId) public 
  {
    require(tokenOwner[tokenId] == msg.sender || allowedTransfer[tokenId] == msg.sender);
    return _transfer(tokenOwner[tokenId], to, tokenId);
  }

  function takeOwnership(uint tokenId) public 
  {
    require(allowedTransfer[tokenId] == msg.sender);
    return _transfer(tokenOwner[tokenId], msg.sender, tokenId);
  }

  function approve(address beneficiary, uint tokenId) public 
  {
    require(msg.sender == tokenOwner[tokenId]);
    if (allowedTransfer[tokenId] != 0) 
    {
      allowedTransfer[tokenId] = 0;
      TokenTransferDisallowed(tokenId, allowedTransfer[tokenId]);
    }
    allowedTransfer[tokenId] = beneficiary;
    TokenTransferAllowed(tokenId, beneficiary);
  }

  function metadata(uint tokenId) constant public returns (string) 
  {
    return tokenMetadata[tokenId];
  }

  function updateTokenMetadata(uint tokenId, string _metadata) internal 
  {
    require(msg.sender == tokenOwner[tokenId]);
    tokenMetadata[tokenId] = _metadata;
    TokenMetadataUpdated(tokenId, msg.sender, _metadata);
  }

  function _transfer(address from, address to, uint tokenId) internal 
  {
    allowedTransfer[tokenId] = 0;
    _removeTokenFrom(from, tokenId);
    _addTokenTo(to, tokenId);
    TokenTransferred(tokenId, from, to);
  }

  function _removeTokenFrom(address from, uint tokenId) internal 
  {
    require(_virtualLength[from] > 0);
    uint length = _virtualLength[from];
    uint index = _tokenIndexInOwnerArray[tokenId];
    uint swapToken = ownedTokens[from][length - 1];
    ownedTokens[from][index] = swapToken;
    _tokenIndexInOwnerArray[swapToken] = index;
    _virtualLength[from]--;
  }

  function _addTokenTo(address owner, uint tokenId) internal 
  {
    if (ownedTokens[owner].length == _virtualLength[owner]) 
    {
      ownedTokens[owner].push(tokenId);
    } 
    else 
    {
      ownedTokens[owner][_virtualLength[owner]] = tokenId;
    }
    tokenOwner[tokenId] = owner;
    _tokenIndexInOwnerArray[tokenId] = _virtualLength[owner];
    _virtualLength[owner]++;
  }
}

contract PlanetToken is Ownable, BasicNFT 
{
  string public name = 'Planet Tokens';
  string public symbol = 'PT';
   
  mapping (uint => uint) public cordX;
  mapping (uint => uint) public cordY;
  mapping (uint => uint) public cordZ;
  mapping (uint => uint) public lifeD;
  mapping (uint => uint) public lifeN;
  mapping (uint => uint) public lifeA;    
  mapping (uint => uint) public latestPing;
  
  string private universe;
  uint private min_donation;
  address private donation_address;
  uint private coordinate_limit;

  event TokenPing(uint tokenId);

  function () public payable 
  {
      donation_address.transfer(msg.value);
  }
    
  function PlanetToken(string UniverseName, uint DonatedWeiRequired, uint CoordinateLimit, address DonationAddress) public
  {
      universe = UniverseName;
      min_donation = DonatedWeiRequired;
      coordinate_limit = CoordinateLimit;
      donation_address = DonationAddress;
  }

  function assignNewPlanet(address beneficiary, uint x, uint y, uint z, string _planetName) public payable 
  {  
    // Check paramters
    require(tokenOwner[buildTokenId(x, y, z)] == 0);
    require(msg.value >= min_donation);
    require(x <= coordinate_limit);
    require(y <= coordinate_limit);
    require(z <= coordinate_limit);
     
    // Update token records
    latestPing[buildTokenId(x, y, z)] = now;
    _addTokenTo(beneficiary, buildTokenId(x, y, z));
    totalTokens++;
    tokenMetadata[buildTokenId(x, y, z)] = _planetName;

    // Update galactic records
    cordX[buildTokenId(x, y, z)] = x;
    cordY[buildTokenId(x, y, z)] = y;
    cordZ[buildTokenId(x, y, z)] = z;

    // Update DNA records
    lifeD[buildTokenId(x, y, z)] = uint256(keccak256(x, '|x|', msg.sender, '|', universe));
    lifeN[buildTokenId(x, y, z)] = uint256(keccak256(y, '|y|', msg.sender, '|', universe));
    lifeA[buildTokenId(x, y, z)] = uint256(keccak256(z, '|z|', msg.sender, '|', universe));

    // Finalize process
    TokenCreated(buildTokenId(x, y, z), beneficiary, _planetName);  
    donation_address.transfer(msg.value);
  }

  function ping(uint tokenId) public 
  {
    require(msg.sender == tokenOwner[tokenId]);
    latestPing[tokenId] = now;
    TokenPing(tokenId);
  }

  function buildTokenId(uint x, uint y, uint z) public view returns (uint256) 
  {
    return uint256(keccak256(x, '|', y, '|', z, '|', universe));
  }

  function exists(uint x, uint y, uint z) public constant returns (bool) 
  {
    return ownerOfPlanet(x, y, z) != 0;
  }

  function ownerOfPlanet(uint x, uint y, uint z) public constant returns (address) 
  {
    return tokenOwner[buildTokenId(x, y, z)];
  }

  function transferPlanet(address to, uint x, uint y, uint z) public 
  {
    return transfer(to, buildTokenId(x, y, z));
  }

  function planetName(uint x, uint y, uint z) constant public returns (string) 
  {
    return tokenMetadata[buildTokenId(x, y, z)];
  }
    
  function planetCordinates(uint tokenId) public constant returns (uint[]) 
  {
    uint[] memory data = new uint[](3);
    data[0] = cordX[tokenId];
    data[1] = cordY[tokenId];
    data[2] = cordZ[tokenId];
    return data;
  }
    
  function planetLife(uint x, uint y, uint z) constant public returns (uint[]) 
  {
    uint[] memory dna = new uint[](3);
    dna[0] = lifeD[buildTokenId(x, y, z)];
    dna[1] = lifeN[buildTokenId(x, y, z)];
    dna[2] = lifeA[buildTokenId(x, y, z)];
    return dna;
  }

  function updatePlanetName(uint x, uint y, uint z, string _planetName) public {
    return updateTokenMetadata(buildTokenId(x, y, z), _planetName);
  }
}