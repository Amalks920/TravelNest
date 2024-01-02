import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
 
export function RoomDetailsModal({viewDetailsModal,setViewDetailsModal,room}) {

 
  const handleOpen = () => setViewDetailsModal(!viewDetailsModal);
    console.log(room)
  return (
    <>
      {/* <Button onClick={handleOpen}>Long Dialog</Button> */}
      <Dialog open={viewDetailsModal} handler={handleOpen}>
        <DialogHeader>Room Details</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <Typography className="font-normal">
           <div>
            <h2 className="font-bold text-xl">Description</h2>
            <h1>
              {room.description}
            </h1>
            <h2 className="mt-3">Price</h2>
            
            <h1>{room.rate}</h1>
           </div>
            <h2 className="mt-3">bathroom type</h2>
            
            <h1>{room.bathRoomType}</h1>
            <h2 className="mt-3">Amenities</h2>
            
            <h1>{room.amenities}</h1>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}