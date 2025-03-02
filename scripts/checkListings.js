const hre = require("hardhat");

async function main() {
    const marketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ⚠️ Mets l'adresse correcte de ton contrat Marketplace

    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    const marketplace = Marketplace.attach(marketplaceAddress);

    // 🔍 Récupérer tous les NFTs listés
    const [nftContracts, tokenIds, prices, sellers] = await marketplace.getListedNFTs();

    console.log("\n🎯 NFTs actuellement listés sur la marketplace :");

    if (tokenIds.length === 0) {
        console.log("❌ Aucun NFT en vente !");
    } else {
        for (let i = 0; i < tokenIds.length; i++) {
            console.log(`✅ NFT #${tokenIds[i]} | Contrat : ${nftContracts[i]} | Prix : ${hre.ethers.formatEther(prices[i])} ETH | Vendeur : ${sellers[i]}`);
        }
    }
}

main().catch((error) => {
    console.error("❌ Erreur lors de la récupération des NFTs listés :", error);
    process.exitCode = 1;
});