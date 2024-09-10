'use client';

import React, { useState, useEffect, useContext } from "react";

import {
  Table,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../Components/index";
import { TrackingContext } from "../Context/TrackingContext";

export default function Home() {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [allShipmentsdata, setAllShipmentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllShipment();
        setAllShipmentsData(allData);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    fetchData();
  }, [getAllShipment]);

  return (
    <>
      <div className="flex flex-col items-center mb-10 gap-4">
        <Services
          setCompleteModal={setCompleteModal}
          setGetModel={setGetModel}
          setStartModal={setStartModal}
        />
        <Profile
          currentUser={currentUser}
          getShipmentsCount={getShipmentsCount}
        />
      </div>
      <Table
        createShipment={createShipment}
        allShipmentsdata={allShipmentsdata}
      />
      <CompleteShipment
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModel={getModel}
        setGetModel={setGetModel}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setStartModal={setStartModal}
        startShipment={startShipment}
      />
    </>
  );
}
