// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract MusicRoyaltyNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    mapping(uint256 => address) private _royaltyRecipients;
    mapping(uint256 => uint96) private _royaltyFees; // en base 10000 (ex: 500 = 5%)

    constructor(address initialOwner) ERC721("MusicRoyaltyNFT", "MRNFT") Ownable(initialOwner) {}

    function mintNFT(address recipient, string memory tokenURI, address royaltyRecipient, uint96 royaltyFee) public onlyOwner {
        require(royaltyFee <= 1000, "Royalty fee too high"); // max 10%

        uint256 tokenId = _nextTokenId++;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        _royaltyRecipients[tokenId] = royaltyRecipient;
        _royaltyFees[tokenId] = royaltyFee;
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address, uint256) {
        uint256 royaltyAmount = (salePrice * _royaltyFees[tokenId]) / 10000;
        return (_royaltyRecipients[tokenId], royaltyAmount);
    }
}