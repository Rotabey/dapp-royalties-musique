const hre = require("hardhat");

async function main() {
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Mets ton adresse
    const MusicRoyaltyNFT = await hre.ethers.getContractFactory("MusicRoyaltyNFT");
    const contract = MusicRoyaltyNFT.attach(contractAddress);

    const tokenId = 1;
    const salePrice = hre.ethers.parseUnits("1", "ether"); // Simule une vente à 1 ETH

    const royaltyInfo = await contract.royaltyInfo(tokenId, salePrice);

    console.log(`Bénéficiaire des royalties : ${royaltyInfo[0]}`);
    console.log(`Montant des royalties sur 1 ETH : ${hre.ethers.formatUnits(royaltyInfo[1], "ether")} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});