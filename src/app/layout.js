import { Inter } from "next/font/google";
import "./globals.css";

import { Footer, NavBar } from "../Components";
import { TrackingProvider } from "../Context/TrackingContext";
import { N } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ethSupplyChain"
};

export default function RootLayout({ children }) {
  return (
    <TrackingProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </html>
    </TrackingProvider>
  );
}
