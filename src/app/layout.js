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
          
          {/* Mobile Download Message */}
          <div className="sm:hidden flex flex-col min-h-screen">
            <div className="flex-grow flex flex-col items-center justify-center bg-blue-50 px-4">
              <h1 className="text-2xl font-bold text-blue-600 text-center mb-3">
                Please Download Our Mobile App
              </h1>
              <p className="text-gray-600 text-center">
                For the best experience, please use our mobile application.
              </p>
            </div>
            <Footer />
          </div>

          {/* Main Content - Hidden on Mobile */}
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
