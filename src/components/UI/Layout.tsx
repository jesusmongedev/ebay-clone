import React from "react";
import Header from "../Header";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className='max-w-6xl mx-auto p-2'>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
