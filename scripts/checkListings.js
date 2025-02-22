const hre = require("hardhat");

async function main() {
    const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ⚠️ Mets l'adresse correcte de ton contrat Marketplace
    const nftContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // ⚠️ Mets l'adresse de ton contrat NFT

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    // 🔍 Récupérer tous les NFTs listés pour ce contrat NFT
    const [tokenIds, prices, sellers] = await marketplace.getListedNFTs(nftContractAddress);

    console.log("\n🎯 NFTs actuellement listés sur la marketplace :");

    if (tokenIds.length === 0) {
        console.log("❌ Aucun NFT en vente !");
    } else {
        for (let i = 0; i < tokenIds.length; i++) {
            console.log(`✅ NFT #${tokenIds[i]} | Prix : ${hre.ethers.formatEther(prices[i])} ETH | Vendeur : ${sellers[i]}`);
        }
    }
}

main().catch((error) => {
    console.error("❌ Erreur lors de la récupération des NFTs listés :", error);
    process.exitCode = 1;
});