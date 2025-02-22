const hre = require("hardhat");

async function main() {
    const [_, buyer] = await hre.ethers.getSigners(); // On prend un autre compte pour acheter

    const provider = hre.ethers.provider;
    const balance = await provider.getBalance(buyer.address);
    console.log(`💰 Solde de l'acheteur : ${hre.ethers.formatEther(balance)} ETH`);

    const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    const nftContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 
    const tokenId = 1; // L'ID du NFT en vente
    const price = hre.ethers.parseEther("0.1"); // Le prix correct du NFT

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    try {
        console.log(`🔍 Tentative d'achat du NFT ${tokenId} pour ${hre.ethers.formatEther(price)} ETH...`);
        const txn = await marketplace.connect(buyer).buyNFT(nftContractAddress, tokenId, { value: price });
        await txn.wait();
        console.log(`✅ NFT ${tokenId} acheté par ${buyer.address} !`);
    } catch (error) {
        console.error("❌ Transaction échouée !");
        console.error("🚨 Message d'erreur précis :", error.reason || error.message || error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});