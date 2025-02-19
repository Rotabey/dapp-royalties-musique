const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();

    const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; // Mets l'adresse que tu as après le déploiement
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