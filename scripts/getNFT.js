const hre = require("hardhat");

async function main() {
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Mets l'adresse actuelle de ton contrat
    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const contract = MusicRoyaltyNFT.attach(contractAddress);

    const tokenId = 1; // ID de ton NFT minté
    const tokenURI = await contract.tokenURI(tokenId);

    console.log(`URI du NFT ${tokenId} : ${tokenURI}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});