'use client';

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";

export default ({ setCreateShipmentModel, allShipmentsdata }) => {
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
      }
    };

    getAccount();
  }, []);

  const convertTime = (time) => {
    const newTime = new Date(time);
    const dateTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dateTime;
  };

  const filteredShipments = allShipmentsdata?.filter(
    (shipment) =>
      shipment.sender &&
      currentAccount &&
      shipment.sender.toLowerCase() === currentAccount.toLowerCase()
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-center md:justify-between justify-center flex flex-col md:flex-row">
        <h3 className="text-gray-800 font-bold text-2xl">Shipment Tracking</h3>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setCreateShipmentModel(true)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-sm rounded-lg md:inline-flex"
          >
            Add Tracking
          </button>
        </div>
      </div>

      <div className="mt-12">
        <Table className="w-full text-center text-sm">
          <TableCaption>A list of all the shipments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Shipment ID</TableHead>
              <TableHead className="text-center">Sender</TableHead>
              <TableHead className="text-center">Receiver</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredShipments?.map((shipment, idx) => (
              <TableRow className="text-center" key={idx}>
                <TableCell className="text-center">{idx}</TableCell>
                <TableCell className="text-center">
                  {shipment.sender.slice(0, 25)}...
                </TableCell>
                <TableCell className="text-center">
                  {shipment.receiver.slice(0, 25)}...
                </TableCell>
                <TableCell className="text-center">
                  {convertTime(shipment.pickupTime)}
                </TableCell>
                <TableCell className="text-center">{shipment.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
