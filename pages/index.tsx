import type { NextPage } from "next";
import { useState } from "react";
import NFTCard from '../components/nftCard';
import { ResponseNFT, OwnedNft } from '../interfaces/INFT';

const Home: NextPage = () => {
  const [nfts, setNFTs] = useState<OwnedNft[]>([]);
  const [wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [pageKey, setPageKey] = useState('');


  const APIKEY = 'R2vvs-EgZaMJjih3O97UqIFqSmuf1nov';
  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${APIKEY}`;
  const headerOptions = {
    method: 'get',
  };

  const fetchNFT = async () => {

    let responseFetch: ResponseNFT;
    const urlNFTByWallet = `${baseURL}/getNFTs/`;

    if (!collection.trim().length) {
      responseFetch = await fetch(`${urlNFTByWallet}?owner=${wallet}&pageSize=10${pageKey}`, headerOptions).then(res => res.json());
    } else {
      responseFetch = await fetch(encodeURI(`${urlNFTByWallet}?owner=${wallet}&contractAddresses[]=${collection}&pageSize=10${pageKey}`), headerOptions).then(res => res.json());
    }

    if (responseFetch) {
      setNFTs(pageKey ? [...nfts, ...responseFetch.ownedNfts] : responseFetch.ownedNfts);
      setPageKey(responseFetch.pageKey ? `&pageKey=${responseFetch.pageKey}` : '');
    }

  }

  const fetchNFTForCollection = async () => {
    let response: any;
    if (collection.length) {
      response = await fetch(`${baseURL}/getNFTsForCollection?contractAddress=${collection}&withMetadata=true`).then(res => res.json());
    }

    if (response) {
      const { nfts: dataResponse } = response;
      setNFTs( dataResponse || []);
    }

  }

  const hanldleFetchNFTs = () => {
    if (fetchForCollection) {
      fetchNFTForCollection();
    } else fetchNFT();
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
        <label
          htmlFor="wallet"
          className="block text-sm font-medium mb-2"
        >
          Wallet
        </label>
        <input
          type="text"
          name="wallet"
          id="wallet"
          disabled={fetchForCollection}
          className="py-2 px-4 block w-full border border-gray-200 rounded-md text-lg focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-200"
          placeholder="Add your wallet address"
          onChange={(e) => setWallet(e.target.value)}
          value={wallet}
        />
      </div>
      <div>
      <label
          htmlFor="collection"
          className="block text-sm font-medium mb-2"
        >
          Collection
        </label>
        <input
          type="text"
          name="collection"
          id="collection"
          className="py-2 px-4 block w-full border border-gray-200 rounded-md text-lg focus:border-blue-500 focus:ring-blue-500"
          placeholder="Add your collections address"
          onChange={(e) => setCollection(e.target.value)}
          value={collection}
        />
      </div>
      <div className="flex my-4">
        <input
          type="checkbox"
          name="chkFetchForCollection"
          id="chkFetchForCollection"
          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-auto focus:ring-blue-500"
          onChange={(e) => setFetchForCollection(e.target.checked)}
          checked={fetchForCollection}
        />
        <label
          htmlFor="chkFetchForCollection"
          className="text-sm text-gray-500 ml-3"
        >
          Fetch for collection
        </label>

      </div>
      <div className="flex items-center justify-between">
        <button
          className="py-2.5 px-4 mx-4 items-center rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
          onClick={hanldleFetchNFTs}
        >
          Search NFT
        </button>
        <button
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          onClick={() => {
            setCollection('');
            setWallet('');
            setNFTs([]);
            setFetchForCollection(false);
          }}
        >
          Reset search
        </button>
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {nfts &&
          nfts.map((item, index) => {
            return <NFTCard key={index.toString()} nft={item} />;
          })}
      </div>
      <div className="flex">
        {pageKey && (
          <a href="#"
            onClick={(e) => {
              e.preventDefault();
              hanldleFetchNFTs();
            }}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          <svg aria-hidden="true" className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
        )
        }
      </div>
    </div>
  );
};

export default Home;
