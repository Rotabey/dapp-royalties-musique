// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

contract MusicRoyaltyNFT is ERC721URIStorage, Ownable, IERC2981 {
    uint256 private _tokenIds;

    struct RoyaltyInfo {
        address recipient;
        uint96 percentageBasisPoints;
    }

    mapping(uint256 => RoyaltyInfo) private _royalties;

    constructor(address initialOwner) ERC721("MusicRoyaltyNFT", "MRNFT") Ownable(initialOwner) {}

    function mintNFT(
        address recipient,
        string memory tokenURI,
        address royaltyRecipient,
        uint96 royaltyPercentage
    ) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _royalties[newItemId] = RoyaltyInfo(royaltyRecipient, royaltyPercentage);

        return newItemId;
    }

    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        override
        returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalty = _royalties[tokenId];
        return (royalty.recipient, (salePrice * royalty.percentageBasisPoints) / 10000);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721URIStorage, IERC165)
    returns (bool)
{
    return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
}
}