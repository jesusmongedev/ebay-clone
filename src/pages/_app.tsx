import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import network from "~/utils/network.utils";
import "~/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={network}>
      <div className='max-w-6xl mx-auto p-2'>
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
