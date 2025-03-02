// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    struct Listing {
        address seller;
        uint256 price;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    address[] private listedContracts;
    uint256[] private listedTokenIds;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTSold(address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Vous n'etes pas le proprietaire");
        require(nft.getApproved(tokenId) == address(this), "NFT non approuve pour la vente");

        listings[nftContract][tokenId] = Listing(msg.sender, price);
        listedContracts.push(nftContract);
        listedTokenIds.push(tokenId);

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT non en vente");
        require(msg.value >= listing.price, "Fonds insuffisants");

        address seller = listing.seller;
        IERC721 nft = IERC721(nftContract);

        // Vérifier et envoyer les royalties si ERC2981 est supporté
        try IERC2981(nftContract).royaltyInfo(tokenId, msg.value) returns (address recipient, uint256 amount) {
            if (recipient != address(0) && amount > 0) {
                payable(recipient).transfer(amount);
            }
        } catch {}

        // Transfert du NFT à l'acheteur
        nft.safeTransferFrom(seller, msg.sender, tokenId);
        
        // Paiement du vendeur
        payable(seller).transfer(msg.value);

        delete listings[nftContract][tokenId];

        emit NFTSold(msg.sender, nftContract, tokenId, msg.value);
    }

    function getListedNFTs() public view returns (address[] memory, uint256[] memory, uint256[] memory, address[] memory) {
        uint256 totalListings = listedTokenIds.length;
        
        address[] memory nftContracts = new address[](totalListings);
        uint256[] memory tokenIds = new uint256[](totalListings);
        uint256[] memory prices = new uint256[](totalListings);
        address[] memory sellers = new address[](totalListings);

        for (uint256 i = 0; i < totalListings; i++) {
            address nftContract = listedContracts[i];
            uint256 tokenId = listedTokenIds[i];

            if (listings[nftContract][tokenId].price > 0) {
                nftContracts[i] = nftContract;
                tokenIds[i] = tokenId;
                prices[i] = listings[nftContract][tokenId].price;
                sellers[i] = listings[nftContract][tokenId].seller;
            }
        }

        return (nftContracts, tokenIds, prices, sellers);
    }
}