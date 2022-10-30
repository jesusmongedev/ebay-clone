import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

import network from "~/utils/network.utils";
import "~/styles/globals.css";
import Layout from "~/components/UI/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={network}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  );
}

export default MyApp;
