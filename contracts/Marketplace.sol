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
    mapping(uint256 => uint256) public lastSaleTime;

    uint256 public cooldownTime = 10 minutes;

    event NFTListed(address indexed seller, address indexed nftContract, uint256 tokenId, uint256 price);
    event NFTSold(address indexed buyer, address indexed nftContract, uint256 tokenId, uint256 price);

    // ✅ Ajout du constructeur avec `initialOwner`
    constructor(address initialOwner) Ownable(initialOwner) {}

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external {
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "Vous netes pas le proprietaire");
        require(nft.getApproved(tokenId) == address(this), "NFT non approuve pour la vente");

        listings[nftContract][tokenId] = Listing(msg.sender, price);

        emit NFTListed(msg.sender, nftContract, tokenId, price);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price > 0, "NFT non en vente");
        require(msg.value >= listing.price, "Fonds insuffisants");

        uint256 lastSale = lastSaleTime[tokenId];
        require(block.timestamp >= lastSale + cooldownTime, "Cooldown actif, attendez avant de revendre");

        address seller = listing.seller;
        IERC721 nft = IERC721(nftContract);

        // Appliquer les royalties si ERC2981 est supporté
        try IERC2981(nftContract).royaltyInfo(tokenId, msg.value) returns (address recipient, uint256 amount) {
            if (recipient != address(0) && amount > 0) {
                payable(recipient).transfer(amount);
            }
        } catch {}

        // Transférer le NFT à l'acheteur
        nft.safeTransferFrom(seller, msg.sender, tokenId);
        
        // Paiement du vendeur
        payable(seller).transfer(msg.value);

        lastSaleTime[tokenId] = block.timestamp;

        // Supprimer l'annonce après la vente
        delete listings[nftContract][tokenId];

        emit NFTSold(msg.sender, nftContract, tokenId, msg.value);
    }

    function getListedNFTs(address nftContract) public view returns (uint256[] memory, uint256[] memory, address[] memory) {
        uint256 totalListings = 0;
    
        // Déterminer combien de NFTs sont listés pour ce contrat spécifique
        for (uint256 tokenId = 0; tokenId < 10000; tokenId++) {
            if (listings[nftContract][tokenId].price > 0) {
                totalListings++;
            }
        }

    // Initialiser les tableaux dynamiques
    uint256[] memory tokenIds = new uint256[](totalListings);
    uint256[] memory prices = new uint256[](totalListings);
    address[] memory sellers = new address[](totalListings);

    uint256 index = 0;

    // Remplir les tableaux avec les NFTs réellement listés
    for (uint256 tokenId = 0; tokenId < 10000; tokenId++) {
        if (listings[nftContract][tokenId].price > 0) {
            tokenIds[index] = tokenId;
            prices[index] = listings[nftContract][tokenId].price;
            sellers[index] = listings[nftContract][tokenId].seller;
            index++;
        }
    }

    return (tokenIds, prices, sellers);
}
}