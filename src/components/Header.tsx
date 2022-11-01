import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useMetamask,
} from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useState } from "react";

import {
  BellIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import ModalBackground from "./UI/Modal/ModalBackground";
import MintNftModal from "./UI/Modal/MintNftModal";

type Props = {};

const Header = (props: Props) => {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  const [openModal, setOpenModal] = useState(false);

  const btnTitle = address
    ? `Hi ${address.slice(0, 5)} ... ${address.slice(-5)}`
    : "Connect your wallet";
  const btnAction = address ? disconnect : connectWithMetamask;

  const toggleModal = () => setOpenModal((prevState) => !prevState);

  return (
    <>
      {/* Navigation */}
      <nav className='flexCenter justify-between'>
        {/* Left Side */}
        <div className='flex items-center text-sm space-x-4'>
          <ConnectWallet colorMode='light' accentColor='#3b82f6' />
          <p className='responsiveLinks link'>Daily Deals</p>
          <p className='responsiveLinks link'>Help & Contact</p>
        </div>

        {/* Right Side */}
        <div className='flexCenter text-sm space-x-4'>
          <p className='responsiveLinks link'>Ship to</p>
          <p className='responsiveLinks link'>Sell</p>
          <p className='responsiveLinks link'>Watchlist</p>
          <button
            onClick={toggleModal}
            className='connectWalletBtn px-3 py-1 secondary flexCenter'>
            <PlusIcon className='h-4 mr-1' />
            Mint
          </button>
          <BellIcon className='h-6 link cursor-pointer' />
          <ShoppingCartIcon className='h-6 link cursor-pointer' />
        </div>
      </nav>

      <hr className='mt-2' />

      {/* Search Bar */}
      <section className='flexCenter space-x-2 py-5'>
        <div className='w-16 h-16 sm:w-28 md:w-44 cursor-pointer flex-shrink-0'>
          <Link href='/'>
            <Image
              className='w-full h-full object-contain'
              alt='Thirdweb Logo'
              src='https://links.papareact.com/bdb'
              width={100}
              height={100}
            />
          </Link>
        </div>

        <button className='hidden lg:flex items-center space-x-2 w-20'>
          <p className='text-gray-600 text-sm'>Shop by Category</p>
          <ChevronDownIcon className='h-4 flex-shrink-0' />
        </button>

        <div className='flexCenter rounded-lg border-2 border-black p-2 space-x-2 md:px-5 flex-1'>
          <MagnifyingGlassIcon className='w-5 text-gray-400' />
          <input
            className='outline-none flex-1'
            placeholder='Search for Anything ...'
            type='search'
          />
        </div>
        <button className='hidden sm:inline-flex connectWalletBtn border-2 border-blue-600'>
          Search
        </button>
        <button className='hidden sm:inline-flex connectWalletBtn secondary'>
          List Item
        </button>
      </section>
      <hr />

      {/* Links */}
      <section className='flex justify-center py-3 px-6 space-x-6 text-xs md:text-sm whitespace-nowrap'>
        <p className='link cursor-pointer '>Home</p>
        <p className='link cursor-pointer '>Electronics</p>
        <p className='link cursor-pointer '>Computers</p>
        <p className='link cursor-pointer hidden sm:inline'>Video Games</p>
        <p className='link cursor-pointer hidden sm:inline'>Home & Garden</p>
        <p className='link responsiveLinks'>Health & Beauty</p>
        <p className='link cursor-pointer hidden lg:inline'>
          Collectibles and Art
        </p>
        <p className='link cursor-pointer hidden lg:inline'>Books</p>
        <p className='link cursor-pointer hidden lg:inline'>Music</p>
        <p className='link cursor-pointer hidden xl:inline'>Deals</p>
        <p className='link cursor-pointer hidden xl:inline'>Other</p>
        <p className='link cursor-pointer '>More</p>
      </section>

      {/* Mint NFT Modal */}
      {openModal && (
        <ModalBackground>
          <MintNftModal toggleModal={toggleModal} />
        </ModalBackground>
      )}
    </>
  );
};

export default Header;
