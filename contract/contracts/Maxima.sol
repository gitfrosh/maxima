// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// Import the openzepplin contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ERC721 signifies that the contract we are creating imports ERC721 and follows ERC721 contract from openzeppelin
contract Maxima is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    event NewWordleNFTMinted(address sender, uint256 tokenId);
    /// @dev Base token URI used as a prefix by tokenURI().

    constructor() ERC721("WordleNFT", "MAXIMA") {
    }

    function mintAndDonate(
        address payable _to,
        string memory metadataURI
    ) public payable returns (uint256) {
        require(msg.value >= 0.00001 ether, 'Be nice and donate!');
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataURI);
        // replace by address that is not mine
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
        return newItemId;
    }


    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

}
