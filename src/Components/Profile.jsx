'use client';

import React, { useState, useEffect } from "react";
import { Badge } from "../Components/ui/badge"

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
        Total Shipments: {count}
      </Badge>
    </div>
  );
};
