const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const contract = MusicRoyaltyNFT.attach(contractAddress);

    console.log("Contrat chargé à l'adresse :", contractAddress);

    // Exemple : Appeler une fonction de ton contrat
    const ownerAddress = await contract.owner();
    console.log("Propriétaire du contrat :", ownerAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});