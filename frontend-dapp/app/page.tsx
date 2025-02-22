"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import useListedNFTs from "./hooks/useListedNFTs";

const NFT_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { nfts, loading } = useListedNFTs(NFT_CONTRACT_ADDRESS);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold">Bienvenue sur la DApp Royalties Musique</h1>
      <p className="text-lg mt-4">Connecte ton wallet pour commencer !</p>

      <div className="mt-6">
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100 text-center">
          <p className="text-sm font-semibold">Adresse :</p>
          <p className="text-sm break-all">{address}</p>
        </div>
      )}

      {/* 🔥 Affichage des NFTs disponibles */}
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center">🎨 NFTs disponibles</h2>

        {loading ? (
          <p className="text-center mt-4">Chargement des NFTs...</p>
        ) : nfts.length === 0 ? (
          <p className="text-center mt-4">Aucun NFT en vente pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {nfts.map((nft) => (
              <div key={nft.tokenId} className="border p-4 rounded-lg shadow-lg">
                <p className="text-sm font-bold">ID : {nft.tokenId}</p>
                <p className="text-sm">Prix : {nft.price} ETH</p>
                <p className="text-xs">Vendeur : {nft.seller}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
