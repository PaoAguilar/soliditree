import "../styles/tailwind.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Soliditree</title>
        <meta
          name="description"
          content="ChariFi platform to benefit tree planting"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
