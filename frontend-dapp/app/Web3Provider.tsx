"use client"; // ✅ Obligatoire pour exécuter ce composant côté client

import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Création d'un QueryClient pour React Query
const queryClient = new QueryClient();

// ✅ Configuration correcte des `chains`
const chains: [typeof mainnet] = [mainnet];

// ✅ Configuration des wallets avec RainbowKit
const { connectors } = getDefaultWallets({
  appName: "DApp Royalties Musique",
  projectId: "YOUR_PROJECT_ID", // Remplace par ton vrai Project ID RainbowKit
  chains,
});

// ✅ Configuration wagmi avec un type strict pour `chains`
const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true, // ⚡ Ajouté pour gérer le Server Side Rendering correctement
});

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
