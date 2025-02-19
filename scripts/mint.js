const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();

    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Mets l'adresse que tu as après le déploiement
    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const contract = MusicRoyaltyNFT.attach(contractAddress);

    const metadataURI = "https://example.com/metadata/1.json";
    const royaltyRecipient = owner.address; // Adresse qui recevra les royalties
    const royaltyFee = 500; // 5% de royalties

    const txn = await contract.mintNFT(owner.address, metadataURI, royaltyRecipient, royaltyFee);
    const receipt = await txn.wait();

    console.log("NFT minté avec l'ID :", receipt.logs[0].args.tokenId.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});