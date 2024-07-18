'use client';

import React, { useState, useEffect } from "react";

export default ({ currentUser, getShipmentsCount }) => {
  const [count, setCount] = useState("0");

  useEffect(() => {
    const getShipmentsData = async () => {
      try {
        const allData = await getShipmentsCount();
        setCount(allData);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    getShipmentsData();
  }, [getShipmentsCount]);

  return (
    <div className="flex items-center gap-2">
      <span className="px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
        Wallet Address: 0
      </span>
      <span className="px-4 py-2 text-sm font-medium text-center text-black rounded-lg border-2">
        Total Shipments: {count}
      </span>
    </div>
  );
};
