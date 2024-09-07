'use client';

import { useEffect, useState } from "react";

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

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
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
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-center">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Shipment ID</th>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Payment</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredShipments?.map((shipment, idx) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{idx}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.sender.slice(0, 25)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.receiver.slice(0, 25)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(shipment.pickupTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{shipment.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.isPaid ? "Completed" : "Pending"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.status === 0
                    ? "Pending"
                    : shipment.status === 1
                    ? "IN_TRANSIT"
                    : "Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
