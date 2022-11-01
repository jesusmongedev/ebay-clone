import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContract } from "@thirdweb-dev/react";
import Image from "next/image";
import React from "react";

type Props = {
  toggleModal: () => void;
};

const MintNftModal = ({ toggleModal }: Props) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    "nft-collection"
  );

  console.log("contract", contract);

  return (
    <div className='fixed top-0 right-0 bg-white w-full sm:w-[560px] px-12 md:px-14 py-6 flex h-screen flex-col gap-2 overflow-y-scroll'>
      <XMarkIcon
        className='h-4 absolute right-4 cursor-pointer hover:transform hover:scale-110'
        onClick={toggleModal}
      />
      <h1 className='text-2xl font-bold'>Mint NFT</h1>
      <h2 className='text-lg font-semibold text-gray-700'>Metadata</h2>
      <p className='text-sm pb-5'>
        By adding an item to the marketplace, you'are essentially Minting an NFT
        of the item into your wallet which we can then list for sale!
      </p>
      <div>
        <Image
          src='https://links.papareact.com/ucj'
          alt='Picture of the author'
          width={300}
          height={300}
          className='border'
        />
      </div>

      <form className='flex flex-col alig flex-1 p-2 space-y-2'>
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
        <input type='file' id='file' />
        <label className='font-semibold text-gray-700' htmlFor='description'>
          Description
        </label>
        <textarea
          className='formField h-auto pt-2'
          id='description'
          placeholder='Enter description...'
          rows={3}
        />
      </form>

      <div className='flex space-x-3 justify-end pt-2'>
        <button
          onClick={toggleModal}
          className='connectWalletBtn px-3 py-1 secondary flexCenter border-rose-500 text-rose-500 hover:bg-rose-700 hover:border-rose-700'>
          Cancel
        </button>
        <button
          onClick={toggleModal}
          className='connectWalletBtn px-3 py-1 flexCenter'>
          <PlusIcon className='h-4 mr-1' />
          Mint NFT
        </button>
      </div>
    </div>
  );
};

export default MintNftModal;
