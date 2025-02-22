const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();

    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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