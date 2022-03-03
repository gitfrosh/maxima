// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

// Import the openzepplin contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Base64} from "./libraries/Base64.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// ERC721 signifies that the contract we are creating imports ERC721 and follows ERC721 contract from openzeppelin
contract Maxima is ERC721URIStorage {
    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event NewWordleNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("WordleNFT", "MAXIMA") {
        console.log("This is my NFT contract. Woah!");
    }

    function makeWordleNFT() public {
        uint256 newItemId = _tokenIds.current();
        string memory text = "Wordle NFT #";
        string memory number = Strings.toString(newItemId);
        string memory finalSvg = string(
            abi.encodePacked(baseSvg, text, number, "</text></svg>")
        );
        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        text,
                        number,
                        '", "description": "A collection of proudly minted Wordle NFTs.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
    }
}
