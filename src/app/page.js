'use client';

import React, { useState, useEffect, useContext } from "react";

import {
  Table,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../components/index";
import { TrackingContext } from "../Context/TrackingContext";

export default function Home() {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    getAllReceiverShipment,  // Add this
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  const [allShipmentsdata, setAllShipmentsData] = useState([]);
  const [receiverShipmentsData, setReceiverShipmentsData] = useState([]); // Add this

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both sender and receiver shipments
        const [senderData, receiverData] = await Promise.all([
          getAllShipment(),
          getAllReceiverShipment()
        ]);
        
        setAllShipmentsData(senderData);
        setReceiverShipmentsData(receiverData);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    fetchData();
  }, [getAllShipment, getAllReceiverShipment]);

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
        receiverShipmentsData={receiverShipmentsData}  // Add this
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