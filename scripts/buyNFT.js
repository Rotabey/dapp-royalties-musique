const hre = require("hardhat");

async function main() {
    const [buyer] = await hre.ethers.getSigners();

    const marketplaceAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"; // Mets l'adresse correcte
    const nftContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Mets l'adresse correcte
    const tokenId = 1; // L'ID du NFT en vente
    const price = hre.ethers.parseEther("0.1"); // Le prix du NFT

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    const txn = await marketplace.connect(buyer).buyNFT(nftContractAddress, tokenId, { value: price });
    await txn.wait();

    console.log(`NFT ${tokenId} acheté par ${buyer.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});