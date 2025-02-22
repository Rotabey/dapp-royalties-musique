"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers, BrowserProvider, Contract } from "ethers";
import { useAccount } from "wagmi";

// ✅ Adresse du contrat Marketplace
const MARKETPLACE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ✅ ABI avec `getListedNFTs(address nftContract)`
const MARKETPLACE_ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "nftContract", "type": "address" }],
    "name": "getListedNFTs",
    "outputs": [
      { "name": "tokenIds", "type": "uint256[]" },
      { "name": "prices", "type": "uint256[]" },
      { "name": "sellers", "type": "address[]" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

// ✅ Type des NFTs listés
interface ListedNFT {
  nftContract: string;
  tokenId: string;
  price: string;
  seller: string;
}

export default function useListedNFTs(nftContractAddress: string) {
  const { isConnected } = useAccount();
  const [nfts, setNfts] = useState<ListedNFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fonction pour récupérer les NFTs listés
  const fetchNFTs = useCallback(async () => {
    try {
        setLoading(true);
        console.log("🛠️ Début de fetchNFTs...");
        console.log("📌 Adresse du contrat NFT utilisée :", nftContractAddress);

        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const contract = new ethers.Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, provider);

        console.log("📌 Appel de getListedNFTs sur :", MARKETPLACE_ADDRESS);
        const [tokenIds, prices, sellers] = await contract.getListedNFTs(nftContractAddress);

        console.log("🔍 Réponse brute de getListedNFTs :", tokenIds, prices, sellers);

        if (!tokenIds || tokenIds.length === 0) {
            console.warn("⚠️ Aucun NFT trouvé !");
        }

        const formattedNFTs = tokenIds.map((tokenId, index) => ({
            nftContract: nftContractAddress,
            tokenId: tokenId.toString(),
            price: ethers.formatEther(prices[index]),
            seller: sellers[index],
        }));

        console.log("🎨 NFTs formatés :", formattedNFTs);
        setNfts(formattedNFTs);
    } catch (error) {
        console.error("❌ Erreur lors du chargement des NFTs :", error);
    } finally {
        setLoading(false);
    }
}, [nftContractAddress]);

  // 🔄 Exécuter fetchNFTs lorsque l'utilisateur est connecté
  useEffect(() => {
    console.log("🚀 useEffect exécuté !");
    console.log("📌 isConnected :", isConnected);
    console.log("📌 nftContractAddress :", nftContractAddress);

    if (isConnected && nftContractAddress) {
      fetchNFTs();
    }
  }, [isConnected, nftContractAddress, fetchNFTs]);

  return { nfts, loading };
}
