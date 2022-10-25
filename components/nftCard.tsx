import { FunctionComponent } from "react";
import { OwnedNft } from "../interfaces/INFT";

type nftProps = {
  nft: OwnedNft;
};
const NFTCard: FunctionComponent<nftProps> = ({ nft }: nftProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-2">
      <img
        className="w-fill rounded-t-sm"
        src={nft.media[0].gateway}
        alt={nft.description}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nft.title}</div>
        <p className="text-gray-700 text-base">{nft.description}</p>
        <div className="px-6 pt-4 pb-2 pl-0">
          <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`...${nft.id.tokenId.slice(-6)}`}</p>
          <p
            onClick={() => {
              navigator.clipboard.writeText(nft.contract.address);
            }}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:cursor-pointer" title="copy"
          >
            <img src="/copy.png" alt="Copy" width={15} height={15} className="inline-flex mx-1" />
            {`${nft.contract.address.slice(0,6)}...${nft.contract.address.slice(-4)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
