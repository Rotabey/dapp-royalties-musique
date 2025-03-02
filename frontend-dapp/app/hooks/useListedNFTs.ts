"use client";

import { useState, useEffect, useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import { useAccount } from "wagmi";

// ✅ Mets ici l'adresse de TON contrat Marketplace
const MARKETPLACE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ✅ ABI mis à jour avec `getListedNFTs()`
const MARKETPLACE_ABI = [
  {
    "inputs": [],
    "name": "getListedNFTs",
    "outputs": [
      { "name": "nftContracts", "type": "address[]" },
      { "name": "tokenIds", "type": "uint256[]" },
      { "name": "prices", "type": "uint256[]" },
      { "name": "sellers", "type": "address[]" }
    ],
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

export default function useListedNFTs() {
  const { isConnected } = useAccount();
  const [nfts, setNfts] = useState<ListedNFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Vérification et récupération des NFTs
  const fetchNFTs = useCallback(async () => {
    if (!isConnected) {
      console.log("🚀 L'utilisateur n'est pas connecté.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // ✅ Vérifier si window.ethereum est disponible
      if (!(window as any).ethereum) {
        throw new Error("Metamask non détecté !");
      }

      // ✅ Initialisation du provider
      const provider = new BrowserProvider((window as any).ethereum);
      console.log("✅ Provider chargé :", provider);

      // ✅ Instanciation du contrat
      const contract = new Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, provider);
      console.log("✅ Contrat chargé :", contract.target);

      // ✅ Vérification manuelle
      console.log("📢 Appel de getListedNFTs()...");

      // 🔍 Appel de `getListedNFTs()` sans argument
      const [nftContracts, tokenIds, prices, sellers] = await contract.getListedNFTs();
      console.log("✅ NFTs récupérés :", { nftContracts, tokenIds, prices, sellers });

      const formattedNFTs: ListedNFT[] = tokenIds.map((tokenId: bigint, index: number) => ({
        nftContract: nftContracts[index],
        tokenId: tokenId.toString(),
        price: Number(prices[index]) / 1e18, // Converti en ETH
        seller: sellers[index],
      }));

      setNfts(formattedNFTs);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des NFTs :", err);
      setError("Impossible de récupérer les NFTs listés.");
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, loading, error };
}