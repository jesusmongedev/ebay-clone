import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  MediaRenderer,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  toggleModal: () => void;
};

const ListItemModal = ({ toggleModal }: Props) => {
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File>();
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

  const { data } = useOwnedNFTs(collectionContract, address);

  console.log("selectedNft", selectedNft);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setImage(file);
  };

  const minNft = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contract || !address) return;

    if (!image) {
      alert("Please select an image");
      return;
    }

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };

    const metadata = {
      name: target.name.value,
      description: target.description.value,
      image,
    };

    try {
    } catch (error) {
      console.error(error);
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
              className={`flex flex-col space-y-2 min-w-fit card border-2 bg-gray-100 ${
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
        <form
          onSubmit={minNft}
          className='flex flex-col alig flex-1 p-2 space-y-2 customMargin'>
          <label className='font-semibold text-gray-700' htmlFor='name'>
            Name
          </label>
          <input
            className='formField'
            type='text'
            id='name'
            name='name'
            placeholder='Name of item...'
          />
          <label className='font-semibold text-gray-700' htmlFor='file'>
            Media
          </label>
          <input type='file' id='file' onChange={handleImage} />
          <label className='font-semibold text-gray-700' htmlFor='description'>
            Description
          </label>
          <textarea
            className='formField h-auto pt-2'
            id='description'
            name='description'
            placeholder='Enter description...'
            rows={3}
          />
          <div className='flex space-x-3 justify-end pt-4'>
            <button
              onClick={toggleModal}
              className='connectWalletBtn px-3 py-1 secondary flexCenter border-rose-500 text-rose-500 hover:bg-rose-700 hover:border-rose-700'>
              Cancel
            </button>
            <button
              type='submit'
              className='connectWalletBtn px-3 py-1 flexCenter'>
              <PlusIcon className='h-4 mr-1' />
              Mint NFT
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ListItemModal;
