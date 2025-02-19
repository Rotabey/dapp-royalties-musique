const hre = require("hardhat");

async function main() {
    const marketplaceAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8"; // Mets l'adresse correcte
    const nftContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Mets l'adresse correcte
    const tokenId = 0; // L'ID du NFT que tu veux vérifier

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    const listing = await marketplace.listings(nftContractAddress, tokenId);

    if (listing.seller === "0x0000000000000000000000000000000000000000") {
        console.log("❌ Ce NFT n'est PAS en vente !");
    } else {
        console.log(`✅ NFT ${tokenId} est en vente pour ${hre.ethers.formatEther(listing.price)} ETH`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});