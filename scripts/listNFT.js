const hre = require("hardhat");

async function main() {
    const [seller] = await hre.ethers.getSigners();

    const marketplaceAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Mets l'adresse correcte
    const nftContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Mets l'adresse correcte
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