import React from "react";

const SkeletonCard = () => {
  return (
    <div className='flex flex-col card animate-pulse hover:bg-white'>
      <div className='flexCenter flex-1 flex-col pb-2 rounded-md bg-gray-300'>
        <div className='h-60'></div>
      </div>

      <div className='pt-2 space-y-4'>
        <div>
          <div className='h-5 w-3/4 rounded-md bg-gray-300'></div>
          <div className='h-4 w-11/12 rounded-md bg-gray-300 mt-2'></div>
        </div>

        <div>
          <div className='h-5 w-2/3 rounded-md bg-gray-300 mr-1'></div>
        </div>

        <div className='rounded-md w-20 bg-gray-300 ml-auto'>
          <div className='h-6'></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
