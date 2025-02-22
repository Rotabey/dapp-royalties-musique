const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();

    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Mets l'adresse que tu as après le déploiement
    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const contract = MusicRoyaltyNFT.attach(contractAddress);

    const metadataURI = "https://ipfs.io/ipfs/QmUqVJSHWUgRcMwYc6vGG8GEeXrmjVNAfJn3PqLeXziZsS";
    const royaltyRecipient = owner.address;
    const royaltyPercentage = 500; // 5% (500 basis points)

    const txn = await contract.mintNFT(owner.address, metadataURI, royaltyRecipient, royaltyPercentage);
    const receipt = await txn.wait();

    console.log("NFT minté avec l'ID :", receipt.logs[0].args[2].toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});