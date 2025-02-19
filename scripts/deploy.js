const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Déploiement avec le compte :", deployer.address);

    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const musicRoyaltyNFT = await MusicRoyaltyNFT.deploy(deployer.address);

    await musicRoyaltyNFT.waitForDeployment();

    console.log("MusicRoyaltyNFT déployé à l'adresse :", await musicRoyaltyNFT.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});