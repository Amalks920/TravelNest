import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckIn,
  selectCheckOut,
  updateCheckIn,
  updateCheckOut,
} from "../services/priceSlice";
import { useGetAllRoomsInHotelMutation } from "../services/getAllHotelsApiSlice";
import { updateRooms } from "../services/roomsSlice";

const CheckInCheckOutModal = ({ hotel_id }) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen((cur) => !cur);
  const checkInDate = useSelector(selectCheckIn);
  const checkOutDate = useSelector(selectCheckOut);
  const dispatch = useDispatch();
  const [getAllRoomsInHotel, { isError, isLoading, isSuccess, reset }] =
    useGetAllRoomsInHotelMutation();


    useEffect(()=>{
        getRooms()
    },[checkInDate,checkOutDate])
  const getRooms = async () => {
    try {
      const response = await getAllRoomsInHotel({
        hotel_id,
        checkInDate,
        checkOutDate,
      });
      console.log(response.data.response);
      dispatch(updateRooms(response.data.response));
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      {/* <Button onClick={handleOpen}>Sign In</Button> */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            {/* <Typography className="absolute border-2 w-full" variant="h6" color="blue-gray">

            </Typography> */}
     
            <Typography
              className=" font-normal text-center mt-3  flex gap-12 "
              variant="paragraph"
              color="gray"
            >
                            <svg
                dataSlot="icon"
                aria-hidden="true"
                fill="none"
                className="sm:w-14 w-9"
                strokeWidth={1.5}
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className=" flex justify-left w-full items-center sm:text-[1.1rem] text-[0.9rem] text-black font-bold">Choose Your Time</div>
            </Typography>
          
            <Typography
              className="-mb-2 font-bold text-[0.9rem] text-black ms-2 mt-3"
              variant="h6"
            >
              Check In
            </Typography>
            <Input
              onInput={(e) => {
                console.log(e.target.value);
                dispatch(updateCheckIn(e.target.value));
              }}
              min={new Date(Date.now()).toISOString().split("T")[0]}
              label="date"
              type="date"
              size="lg"
              color="black"
              className=""
            />

            <Typography
              className="-mb-2 font-bold text-[0.9rem] ms-2 mt-3 text-black"
              variant="h6"
            >
              Check Out
            </Typography>
            <Input
              onInput={(e) => {
                dispatch(updateCheckOut(e.target.value));
              }}
              min={checkInDate}
              label="date"
              type="date"
              size="lg"
              color="black"
              className=""
            />

            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="my-3"
              variant="gradient"
              onClick={() => {
                handleOpen();
                getRooms();
              }}
              fullWidth
            >
              Choose
            </Button>
            {/* <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>

            </Typography> */}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CheckInCheckOutModal;
