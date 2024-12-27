'use client';

import { useContext } from "react";
import { TrackingContext } from "../Context/TrackingContext";
import { FaArrowRight } from "react-icons/fa";
import { Button } from './ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card"

const NavBar = () => {
  const { currentUser, connectWallet } = useContext(TrackingContext);

  return (
    <nav className="bg-white pb-5 md:text-sm">
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <h1 className="text-4xl font-extrabold">EthSupplyChain</h1>
          </a>
        </div>
        <div className="flex-1 items-center mt-8 md:mt-0 md:flex">
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {currentUser ? (
              <HoverCard>
                <HoverCardTrigger>
                  <Button className='w-40'>
                    {currentUser.slice(0, 15)}..
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  Account Address
                </HoverCardContent>
              </HoverCard>
            ) : (
              <Button
                className='w-40'
                onClick={() => connectWallet()}
              >
                Connect Wallet
                <FaArrowRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
