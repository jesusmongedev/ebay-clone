import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import { MediaRenderer } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing, ListingType } from "@thirdweb-dev/sdk";
import React from "react";

type Props = {
  listing: (AuctionListing | DirectListing) | undefined;
};

const ListingCard = ({ listing }: Props) => {
  const { asset, type, buyoutCurrencyValuePerToken } = listing || {};
  const isDirect = type === ListingType.Direct;
  const btnTitle = isDirect ? "Buy Now" : "Auction";
  const rightIcon = isDirect ? (
    <BanknotesIcon className='h-4' />
  ) : (
    <ClockIcon className='h-4' />
  );

  return (
    <div className='flex flex-col card hover:scale-105 transition-all duration-150 ease-out'>
      <div className='flexCenter flex-1 flex-col pb-2'>
        <MediaRenderer className='w-44' alt={asset?.id} src={asset?.image} />
      </div>

      <div className='pt-2 space-y-4'>
        <div>
          <h2 className='truncate text-lg'>{asset?.name}</h2>
          <hr />
          <p className='truncate text-sm text-gray-600 mt-2'>
            {asset?.description}
          </p>
        </div>

        <p>
          <span className='font-bold mr-1'>
            {buyoutCurrencyValuePerToken?.displayValue}
          </span>
          {buyoutCurrencyValuePerToken?.symbol}
        </p>

        <div className='flex justify-end'>
          <button
            className={`connectWalletBtn text-xs p-2 rounded-lg font-normal ${
              !isDirect && "bg-red-500"
            } flexCenter gap-1`}>
            {btnTitle}
            {rightIcon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
