import "../styles/globals.css";

// INTERNAL IMPORT
import { Footer, Banner, NavBar } from "../Components";
import { TrackingProvider } from "../Context/TrackingContext";

export default function App({ Component, pageProps }) {
  return (
    <TrackingProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </TrackingProvider>
  );
}
