import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const ModalBackground = ({ children }: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50'>
      {children}
    </div>
  );
};

export default ModalBackground;
