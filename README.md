🎵 DApp Royalties Musique - Documentation

📌 Présentation de l'Application

La DApp Royalties Musique est une application décentralisée permettant aux artistes de vendre leurs morceaux sous forme de NFTs et de bénéficier d'un système de royalties automatique. L'objectif est d'apporter plus de transparence et d'équité dans la distribution des revenus issus de la vente et revente des œuvres musicales.

🎯 Objectif du Projet

L'industrie musicale est confrontée à plusieurs défis majeurs :

Un manque de transparence dans la distribution des revenus.

Une rémunération inéquitable pour les artistes.

Une gestion centralisée des droits d’auteur, souvent coûteuse.

La DApp Royalties Musique vise à répondre à ces problématiques en utilisant la blockchain Ethereum pour tokeniser les morceaux sous forme de NFTs et automatiser le versement des royalties via des smart contracts.

💡 Pourquoi cette idée ?

Nous avons choisi cette approche pour plusieurs raisons :

Propriété vérifiable : Chaque NFT représente un morceau unique, prouvant son authenticité et son propriétaire actuel.

Royalties automatisées : Grâce au standard ERC-2981, les artistes reçoivent une commission automatique à chaque revente.

Marché décentralisé : Plus besoin d'intermédiaires, les transactions sont gérées directement entre artistes et acheteurs.

Stockage décentralisé : Les métadonnées et extraits des morceaux sont hébergés sur IPFS, garantissant leur accessibilité et leur pérennité.

⚙️ Choix de Conception

1️⃣ Architecture des Smart Contracts

Nous avons conçu trois principaux smart contracts :

MusicRoyaltyNFT.sol : Gère la création des NFTs musicaux avec des royalties.

Marketplace.sol : Permet la mise en vente et l'achat sécurisé des NFTs.

RoyaltiesManager.sol : Assure la distribution automatique des royalties aux artistes.

2️⃣ Technologies Utilisées

Solidity : Langage de programmation des smart contracts.

Hardhat : Framework de développement et de test des contrats.

OpenZeppelin : Utilisation des standards ERC-721 et ERC-2981.

IPFS : Stockage décentralisé des métadonnées et des fichiers audio.

Next.js & React : Interface utilisateur pour interagir avec la DApp.

Wagmi & RainbowKit : Gestion de la connexion des wallets.

Ethers.js : Interaction avec la blockchain Ethereum.

3️⃣ Respect des Contraintes Métier

Tokenisation des ressources : Chaque morceau est représenté par un NFT unique.

Échanges de tokens : Achat et revente des NFTs avec royalties automatiques.

Limites de possession : Chaque utilisateur ne peut posséder qu’un certain nombre de NFTs.

Contraintes temporelles : Cooldown après chaque revente pour éviter la spéculation excessive.

Stockage sur IPFS : Les métadonnées des morceaux sont enregistrées de manière décentralisée.

Tests unitaires avec Hardhat : Vérification rigoureuse des fonctionnalités des smart contracts.

🚀 Comment Lancer l'Application ?

1️⃣ Installation des dépendances

Assurez-vous d'avoir Node.js et npm installés, puis exécutez :

npm install

2️⃣ Lancer un nœud local Hardhat

Avant de déployer les contrats, démarrez un nœud local Ethereum :

npx hardhat node

3️⃣ Déployer les smart contracts

Dans un autre terminal, exécutez :

npx hardhat run scripts/deployMarketplace.js --network localhost
npx hardhat run scripts/deploy.js --network localhost

Note : Copiez les adresses générées des contrats et mettez-les à jour dans vos fichiers frontend.

4️⃣ Lancer l'application React

npm run dev

L'application sera accessible sur http://localhost:3000/.