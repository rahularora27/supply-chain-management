'use client';

import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge"

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
    <div className="flex items-center">
      <Badge className="px-4 py-2">
        Total Outgoing Shipments: {count}
      </Badge>
    </div>
  );
};
