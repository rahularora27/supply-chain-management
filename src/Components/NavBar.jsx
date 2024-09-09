'use client';

import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "../Context/TrackingContext";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import { Button } from '../Components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../Components/ui/hover-card"

const NavBar = () => {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <h1 className="text-4xl font-extrabold">EthSupplyChain</h1>
          </a>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {currentUser ? (
              <HoverCard>
                <HoverCardTrigger>
                  <Button className='w-40'>
                    {currentUser.slice(0, 15)}..
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  The React Framework – created and maintained by @vercel.
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