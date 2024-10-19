'use client';

import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default ({createShipment, allShipmentsdata }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    price: "",
  });

  const createItem  = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log("Error creating item");
    }
  };

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
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <h3 className="text-gray-800 font-bold text-3xl">Shipment Tracking</h3>
        <div className="mt-3 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add a Shipment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Tracking for a Shipment</DialogTitle>
                <DialogDescription>
                  Fill in the details below and click 'Add' to submit a new shipment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 items-center">
                <div>
                  <Input
                    type="text"
                    placeholder="Receiver's Address"
                    onChange={(e) =>
                      setShipment({
                        ...shipment,
                        receiver: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Input 
                    type="date"
                    placeholder="Date"
                    onChange={(e) =>
                      setShipment({
                        ...shipment,
                        pickupTime: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Price"
                    onChange={(e) =>
                      setShipment({
                        ...shipment,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => createItem()}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
