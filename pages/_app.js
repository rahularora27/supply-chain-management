import "../styles/globals.css";
import Head from 'next/head';

// INTERNAL IMPORT
import { Footer, NavBar } from "../Components";
import { TrackingProvider } from "../Context/TrackingContext";

export default function App({ Component, pageProps }) {
  return (
    <TrackingProvider>
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>EthSupplyChain</title>
        </Head>
        <NavBar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </TrackingProvider>
  );
}
