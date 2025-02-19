const hre = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Mets l'adresse actuelle de ton contrat
    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const contract = MusicRoyaltyNFT.attach(contractAddress);

    const tokenId = 0; // ID de ton NFT minté
    const tokenURI = await contract.tokenURI(tokenId);

    console.log(`URI du NFT ${tokenId} : ${tokenURI}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});