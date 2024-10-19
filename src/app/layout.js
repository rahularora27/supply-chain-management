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
        <body className={inter.className}>
          <Toaster />
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </TrackingProvider>
  );
}
