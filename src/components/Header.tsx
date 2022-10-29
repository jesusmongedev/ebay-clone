import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

import {
  BellIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type Props = {};

const Header = (props: Props) => {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  const btnTitle = address
    ? `Hi ${address.slice(0, 5)} ... ${address.slice(-5)}`
    : "Connect your wallet";
  const btnAction = address ? disconnect : connectWithMetamask;

  return (
    <>
      {/* Navigation */}
      <nav className='flexCenter justify-between'>
        {/* Left Side */}
        <div className='text-sm space-x-2'>
          <button onClick={btnAction} className='connectWalletBtn'>
            {btnTitle}
          </button>
          <p className='responsiveLinks hover:link'>Daily Deals</p>
          <p className='responsiveLinks hover:link'>Help & Contact</p>
        </div>

        {/* Right Side */}
        <div className='flexCenter text-sm space-x-4'>
          <p className='responsiveLinks hover:link'>Ship to</p>
          <p className='responsiveLinks hover:link'>Sell</p>
          <p className='responsiveLinks hover:link'>Watchlist</p>
          <Link href='/addItem' className='flexCenter hover:link'>
            Add to inventory <ChevronDownIcon className='h-4' />{" "}
          </Link>
          <BellIcon className='h-6' />
          <ShoppingCartIcon className='h-6' />
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

        <div className='flexCenter border-2 border-black p-2 space-x-2 md:px-5 flex-1'>
          <MagnifyingGlassIcon className='w-5 text-gray-400' />
          <input
            className='outline-none flex-1'
            placeholder='Search for Anything ...'
            type='search'
          />
        </div>
        <button className='hidden sm:inline-flex ebayBtn'>Search</button>
        <button className='ebayBtn secondary'>List Item</button>
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
    </>
  );
};

export default Header;
