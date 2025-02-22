const hre = require("hardhat");

async function main() {
    const [seller] = await hre.ethers.getSigners();

    const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Mets l'adresse correcte
    const nftContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Mets l'adresse correcte
    const tokenId = 1; // L'ID de ton NFT minté
    const price = hre.ethers.parseEther("0.1"); // Prix de vente (0.1 ETH)

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    // Approve le NFT pour la marketplace
    const NFTContract = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const nftContract = NFTContract.attach(nftContractAddress);
    const approveTxn = await nftContract.approve(marketplaceAddress, tokenId);
    await approveTxn.wait();

    // Lister le NFT sur la marketplace
    const txn = await marketplace.listNFT(nftContractAddress, tokenId, price);
    await txn.wait();

    console.log(`NFT ${tokenId} listé en vente à ${price} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});