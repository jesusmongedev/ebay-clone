import { FormEvent, useState } from "react";
import { ListBulletIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  MediaRenderer,
  useAddress,
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  NFT,
  ListingType,
  NewDirectListing,
  NewAuctionListing,
  NATIVE_TOKEN_ADDRESS,
} from "@thirdweb-dev/sdk";

import network from "~/utils/network.utils";

type Props = {
  toggleModal: () => void;
};

const ListItemModal = ({ toggleModal }: Props) => {
  const [selectedNft, setSelectedNft] = useState<NFT>();

  const address = useAddress();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );

  const { contract: collectionContract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    "nft-collection"
  );

  console.log("contract", contract);
  console.log("collectionContract", collectionContract);

  const { data } = useOwnedNFTs(collectionContract, address);

  const isNetworkMismatch = useNetworkMismatch();

  const [, switchNetwork] = useNetwork();

  const {
    mutate: createDirectListing,
    isLoading,
    error,
  } = useCreateDirectListing(contract);
  const {
    mutate: createAuctionListing,
    isLoading: isLoadingAuctionListing,
    error: errorAuctionListing,
  } = useCreateAuctionListing(contract);

  const handleCreateListing = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isNetworkMismatch && switchNetwork) {
      switchNetwork(network);
      return;
    }

    if (!selectedNft) return;

    const target = e.target as typeof e.target & {
      elements: { listingType: { value: number }; price: { value: number } };
    };

    const { listingType, price } = target.elements;

    const isAuctionListing = listingType.value == ListingType.Auction;

    const directPayload: NewDirectListing = {
      assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
      tokenId: selectedNft.metadata.id,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      listingDurationInSeconds: 60 * 60 * 24 * 7, // 1 week
      quantity: 1,
      buyoutPricePerToken: price.value,
      startTimestamp: new Date(),
    };

    const auctionPayload: NewAuctionListing = {
      assetContractAddress: process.env.NEXT_PUBLIC_COLLECTION_CONTRACT!,
      tokenId: selectedNft.metadata.id,
      currencyContractAddress: NATIVE_TOKEN_ADDRESS,
      listingDurationInSeconds: 60 * 60 * 24 * 7, // 1 week
      quantity: 1,
      buyoutPricePerToken: price.value,
      startTimestamp: new Date(),
      reservePricePerToken: 0,
    };

    if (!isAuctionListing) {
      createDirectListing(directPayload, {
        onSuccess(data, variables, context) {
          console.log("Success", data, variables, context);
          toggleModal();
        },
        onError(error, variables, context) {
          console.error("Error", error, variables, context);
        },
      });
    } else {
      createAuctionListing(auctionPayload, {
        onSuccess(data, variables, context) {
          console.log("Success", data, variables, context);
          toggleModal();
        },
        onError(error, variables, context) {
          console.error("Error", error, variables, context);
          toggleModal();
        },
      });
    }
  };

  return (
    <div className='fixed top-0 right-0 bg-white w-full sm:w-[560px] py-6 flex h-screen flex-col gap-2 overflow-y-scroll'>
      <XMarkIcon
        className='h-4 absolute right-4 cursor-pointer hover:transform hover:scale-110'
        onClick={toggleModal}
      />
      <h1 className='text-2xl font-bold customMargin'>List an item</h1>
      <h2 className='text-lg font-semibold text-gray-700 customMargin'>
        Select an item you would like to sell
      </h2>
      <p className='text-sm pb-5 customMargin'>
        Bellow you will find the NTF's you own in your wallet. Select the one
        you would like to sell.
      </p>
      <div className='flex space-x-8 p-4 pb-8 overflow-x-scroll'>
        {data?.map((nft) => {
          const {
            metadata: { id, image, name, description },
          } = nft;
          const selectedNftId = selectedNft?.metadata.id;
          return (
            <div
              key={id}
              onClick={() => setSelectedNft(nft)}
              className={`flex flex-col space-y-2 min-w-[320px] card border-2 bg-gray-100 ${
                id === selectedNftId ? "selectedNft" : "border-transparent"
              }`}>
              <MediaRenderer src={image} className='h-48 rounded-lg' />
              <h2 className='text-lg truncate font-bold'>{name}</h2>
              {description && <p className='text-sm truncate'>{description}</p>}
            </div>
          );
        })}
      </div>

      {selectedNft && (
        <form onSubmit={handleCreateListing}>
          <div className='flex flex-col p-10 '>
            <div className='grid grid-cols-2 gap-5'>
              <label
                className='border-r font-semibold text-gray-700'
                htmlFor='directListing'>
                Direct Listing / Fixed Price
              </label>
              <input
                type='radio'
                id='directListing'
                value={0}
                name='listingType'
                className='h-10 ml-auto w-10'
              />
              <label
                className='border-r font-semibold text-gray-700'
                htmlFor='auctionListing'>
                Auction
              </label>
              <input
                type='radio'
                id='auctionListing'
                value={1}
                name='listingType'
                className='h-10 ml-auto w-10'
              />
              <label
                className='border-r font-semibold text-gray-700'
                htmlFor='price'>
                Price
              </label>
              <input
                min={0}
                step={0.000000001}
                type='number'
                name='price'
                id='price'
                placeholder='0.005'
                className='bg-gray-100 p-5'
              />
            </div>
          </div>

          <div className='flex space-x-3 justify-end pt-4 pr-10'>
            <button
              onClick={toggleModal}
              className='connectWalletBtn px-3 py-1 secondary flexCenter border-rose-500 text-rose-500 hover:bg-rose-700 hover:border-rose-700'>
              Cancel
            </button>
            <button
              type='submit'
              className='connectWalletBtn px-3 py-1 flexCenter'>
              <ListBulletIcon className='h-4 mr-1' />
              List Item
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ListItemModal;
