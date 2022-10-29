import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function ListingsGridContainer({ children }: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto'>
      {children}
    </div>
  );
}

export default ListingsGridContainer;
