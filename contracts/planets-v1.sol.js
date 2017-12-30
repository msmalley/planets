pragma solidity ^0.4.18;

/**

 PAYABLE VERSIONS
 
 TESTNET
 Contract = 0x2ee9275621cE22cb38B81Ff9a18fCD8C14e7a7AA
 Donations = 0x1bD01CA039D65b9866B9f59f2310DA5944dfF609
 
 LIMIT = 99999999999999999999999999999999999999999999999999999999999999999999999999999
 
 MAINNET
 Contract = 0x83EbB03Be2f5AC37a5FF28c685dcf2685E9d6e68
 Account 2 = 0x1E36e1d77b5c53adFf38b30C8CA0e6f680940Ef1
 Donations = 0x1aFa7039c7c0c896E6e76e43E536E925b5Fc871d
 
 -----------------------------------------------------------
 ROPSTEN WALLET = 0x7786d0aa2cba1857cf35425243c46cafe10f3e42
 Contract = 0x27728d9a0a4dEDA56d4eCF0CBBd4F473ae878e0A
 geth --testnet --rpc --rpcapi "db,eth,net,web3" --rpcport "8545" --rpccorsdomain "*"
 
 // Directory of Planets ...?
 01 = 0, 0, 0 = Genesis Prime
 02 = 5, 3, 1979 = Smallville
 03 = 6, 6, 6 = Hellio 1
 04 = 1, 2, 3 = Obviiious
 05 = 3, 5, 1979 = United State of Smallville
 06 = 987654321, 123456789, 987654321 = Far Point 9
 07 = 7, 5, 2 = NowNow
 08 = 5935, 7318, 1022 = Republic of Ropsten
 09 = 11, 19, 1989 = Republic of the DroneRiders
 10 = 1066, 1066, 1066 = Williamsphere III
 11 = 0, 9, 3 = Ropsten Republic
 12 = 7, 11, 86 = The Red One
 13 = 94678, 64010, 12345678 = Gargantua
 
 SOLO:
 TEST WALLET = 0xC43850B5Fc28b186dFCF958c6bE3A96Ff56ac6E0
 Account #2 = 0x29f4EAd040C3537449d992ae45d5D417B5452fDD

 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */

contract Ownable {
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

contract NFT {
  function totalSupply() public constant returns (uint);
  function balanceOf(address) public constant returns (uint);

  function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint);
  function ownerOf(uint tokenId) public constant returns (address);

  function transfer(address to, uint tokenId) public;
  function takeOwnership(uint tokenId) public;
  function approve(address beneficiary, uint tokenId) public;

  function metadata(uint tokenId) public constant returns (string);
}

contract NFTEvents {
  event TokenCreated(uint tokenId, address owner, string metadata);
  event TokenDestroyed(uint tokenId, address owner);

  event TokenTransferred(uint tokenId, address from, address to);
  event TokenTransferAllowed(uint tokenId, address beneficiary);
  event TokenTransferDisallowed(uint tokenId, address beneficiary);

  event TokenMetadataUpdated(uint tokenId, address owner, string data);
}

contract BasicNFT is NFT, NFTEvents {

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

  function totalSupply() public constant returns (uint) {
    return totalTokens;
  }

  function balanceOf(address owner) public constant returns (uint) {
    return _virtualLength[owner];
  }

  function tokenOfOwnerByIndex(address owner, uint index) public constant returns (uint) {
    require(index >= 0 && index < balanceOf(owner));
    return ownedTokens[owner][index];
  }

  function getAllTokens(address owner) public constant returns (uint[]) {
    uint size = _virtualLength[owner];
    uint[] memory result = new uint[](size);
    for (uint i = 0; i < size; i++) {
      result[i] = ownedTokens[owner][i];
    }
    return result;
  }

  function ownerOf(uint tokenId) public constant returns (address) {
    return tokenOwner[tokenId];
  }

  function transfer(address to, uint tokenId) public {
    require(tokenOwner[tokenId] == msg.sender || allowedTransfer[tokenId] == msg.sender);
    return _transfer(tokenOwner[tokenId], to, tokenId);
  }

  function takeOwnership(uint tokenId) public {
    require(allowedTransfer[tokenId] == msg.sender);
    return _transfer(tokenOwner[tokenId], msg.sender, tokenId);
  }

  function approve(address beneficiary, uint tokenId) public {
    require(msg.sender == tokenOwner[tokenId]);

    if (allowedTransfer[tokenId] != 0) {
      allowedTransfer[tokenId] = 0;
      TokenTransferDisallowed(tokenId, allowedTransfer[tokenId]);
    }
    allowedTransfer[tokenId] = beneficiary;
    TokenTransferAllowed(tokenId, beneficiary);
  }

  function metadata(uint tokenId) constant public returns (string) {
    return tokenMetadata[tokenId];
  }

  function updateTokenMetadata(uint tokenId, string _metadata) public {
    require(msg.sender == tokenOwner[tokenId]);
    tokenMetadata[tokenId] = _metadata;
    TokenMetadataUpdated(tokenId, msg.sender, _metadata);
  }

  function _transfer(address from, address to, uint tokenId) internal {
    allowedTransfer[tokenId] = 0;
    _removeTokenFrom(from, tokenId);
    _addTokenTo(to, tokenId);
    TokenTransferred(tokenId, from, to);
  }

  function _removeTokenFrom(address from, uint tokenId) internal {
    require(_virtualLength[from] > 0);

    uint length = _virtualLength[from];
    uint index = _tokenIndexInOwnerArray[tokenId];
    uint swapToken = ownedTokens[from][length - 1];

    ownedTokens[from][index] = swapToken;
    _tokenIndexInOwnerArray[swapToken] = index;
    _virtualLength[from]--;
  }

  function _addTokenTo(address owner, uint tokenId) internal {
    if (ownedTokens[owner].length == _virtualLength[owner]) {
      ownedTokens[owner].push(tokenId);
    } else {
      ownedTokens[owner][_virtualLength[owner]] = tokenId;
    }
    tokenOwner[tokenId] = owner;
    _tokenIndexInOwnerArray[tokenId] = _virtualLength[owner];
    _virtualLength[owner]++;
  }
}

contract PlanetToken is Ownable, BasicNFT {

  string public name = 'Planet Tokens';
  string public symbol = 'PT';
    
  mapping (uint => uint) public cordX;
  mapping (uint => uint) public cordY;
  mapping (uint => uint) public cordZ;
  mapping (uint => uint) public lifeD;
  mapping (uint => uint) public lifeN;
  mapping (uint => uint) public lifeA;

  mapping (uint => uint) public latestPing;

  event TokenPing(uint tokenId);
    
  address constant private donations = 0x1aFa7039c7c0c896E6e76e43E536E925b5Fc871d;

  function () public payable 
  {
      donations.transfer(msg.value);
  }

  function assignNewPlanet(address beneficiary, uint x, uint y, uint z, string _planetName) public payable {
      
    if (msg.value >= 0.1 ether) {
        
        require(tokenOwner[buildTokenId(x, y, z)] == 0);

        latestPing[buildTokenId(x, y, z)] = now;
        _addTokenTo(beneficiary, buildTokenId(x, y, z));
        totalTokens++;
        tokenMetadata[buildTokenId(x, y, z)] = _planetName;

        cordX[buildTokenId(x, y, z)] = x;
        cordY[buildTokenId(x, y, z)] = y;
        cordZ[buildTokenId(x, y, z)] = z;

        lifeD[buildTokenId(x, y, z)] = uint256(keccak256(x, '|x|', msg.sender));
        lifeN[buildTokenId(x, y, z)] = uint256(keccak256(y, '|y|', msg.sender));
        lifeA[buildTokenId(x, y, z)] = uint256(keccak256(z, '|z|', msg.sender));

        TokenCreated(buildTokenId(x, y, z), beneficiary, _planetName);  
    }
    donations.transfer(msg.value);
  }

  function ping(uint tokenId) public {
    require(msg.sender == tokenOwner[tokenId]);

    latestPing[tokenId] = now;

    TokenPing(tokenId);
  }

  function buildTokenId(uint x, uint y, uint z) public pure returns (uint256) {
    return uint256(keccak256(x, '|', y, '|', z));
  }

  function exists(uint x, uint y, uint z) public constant returns (bool) {
    return ownerOfPlanet(x, y, z) != 0;
  }

  function ownerOfPlanet(uint x, uint y, uint z) public constant returns (address) {
    return tokenOwner[buildTokenId(x, y, z)];
  }

  function transferPlanet(address to, uint x, uint y, uint z) public {
    return transfer(to, buildTokenId(x, y, z));
  }

  function takePlanet(uint x, uint y, uint z) public {
    return takeOwnership(buildTokenId(x, y, z));
  }

  function approvePlanetTransfer(address to, uint x, uint y, uint z) public {
    return approve(to, buildTokenId(x, y, z));
  }

  function planetName(uint x, uint y, uint z) constant public returns (string) {
    return tokenMetadata[buildTokenId(x, y, z)];
  }
    
  function planetCordinates(uint tokenId) public constant returns (uint[]) {
    uint[] memory data = new uint[](3);
    data[0] = cordX[tokenId];
    data[1] = cordY[tokenId];
    data[2] = cordZ[tokenId];
    return data;
  }
    
  function planetLife(uint x, uint y, uint z) constant public returns (uint[]) {
    uint[] memory dna = new uint[](3);
    dna[0] = lifeD[buildTokenId(x, y, z)];
    dna[1] = lifeN[buildTokenId(x, y, z)];
    dna[2] = lifeA[buildTokenId(x, y, z)];
    return dna;
  }

  function updatePlanetName(uint x, uint y, uint z, string _planetName) public {
    return updateTokenMetadata(buildTokenId(x, y, z), _planetName);
  }

  function updateManyPlanetNames(uint[] x, uint[] y, uint[] z, string _planetName) public {
    for (uint i = 0; i < x.length; i++) {
      updateTokenMetadata(buildTokenId(x[i], y[i], z[i]), _planetName);
    }
  }

  function claimForgottenParcel(address beneficiary, uint tokenId) onlyOwner public {
    require(tokenOwner[tokenId] != 0);
    require(latestPing[tokenId] < now);
    require(now - latestPing[tokenId] > 1 years);

    address oldOwner = tokenOwner[tokenId];
    latestPing[tokenId] = now;
    _transfer(oldOwner, beneficiary, tokenId);

    TokenTransferred(tokenId, oldOwner, beneficiary);
  }
}