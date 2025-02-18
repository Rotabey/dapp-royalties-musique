// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicRoyaltyNFT is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct RoyaltyInfo {
        address artist;
        uint256 totalShares;
        mapping(address => uint256) shares;
        uint256 lastTransferTime;
    }

    mapping(uint256 => RoyaltyInfo) public royalties;

    constructor() ERC721("MusicRoyaltyNFT", "MRNFT") {}

    // Mint un nouveau NFT pour un morceau
    function mintMusicNFT(
        string memory tokenURI,
        address[] memory participants,
        uint256[] memory shares
    ) public onlyOwner {
        require(participants.length == shares.length, "Participants et parts doivent correspondre");

        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        RoyaltyInfo storage royalty = royalties[tokenId];
        royalty.artist = msg.sender;

        uint256 totalShares;
        for (uint256 i = 0; i < participants.length; i++) {
            royalty.shares[participants[i]] = shares[i];
            totalShares += shares[i];
        }

        royalty.totalShares = totalShares;
        royalty.lastTransferTime = block.timestamp;
    }

    // Vérifie le nombre de parts détenu par une adresse pour un NFT spécifique
    function getShares(uint256 tokenId, address participant) public view returns (uint256) {
        return royalties[tokenId].shares[participant];
    }

    // Transfert de parts (simple, on améliorera plus tard)
    function transferShares(
        uint256 tokenId,
        address to,
        uint256 amount
    ) public {
        require(royalties[tokenId].shares[msg.sender] >= amount, "Pas assez de parts");

        royalties[tokenId].shares[msg.sender] -= amount;
        royalties[tokenId].shares[to] += amount;

        royalties[tokenId].lastTransferTime = block.timestamp;
    }
}