import { Inter } from "next/font/google";
import "./globals.css";

import { Footer, NavBar } from "../components";
import { TrackingProvider } from "../Context/TrackingContext";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ethSupplyChain"
};

export default function RootLayout({ children }) {
  return (
    <TrackingProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Toaster />
          
          <div className="sm:hidden flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col items-center justify-center px-4">
              <h1 className="text-2xl font-bold text-center">
                Please Download Our Mobile App
              </h1>
            </div>
          </div>

          <div className="hidden sm:flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>

        </body>
      </html>
    </TrackingProvider>
  );
}
