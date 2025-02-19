require("dotenv").config();
const pinataSDK = require("@pinata/sdk");
const fs = require("fs");

const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

async function uploadMetadata() {
    const metadata = {
        name: "Chanson #1",
        description: "Ma première chanson NFT",
        image: "https://example.com/metadata/1.json", // Remplace par un CID valide de ton image
        attributes: [
            { trait_type: "Genre", value: "Pop" },
            { trait_type: "Durée", value: "3:45" }
        ]
    };

    try {
        const res = await pinata.pinJSONToIPFS(metadata);
        console.log("CID IPFS des métadonnées :", res.IpfsHash);
    } catch (error) {
        console.error("Erreur lors de l'upload sur IPFS :", error);
    }
}

uploadMetadata();