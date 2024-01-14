import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { selectCheckIn, selectCheckOut, updateCheckIn, updateCheckOut } from "../services/priceSlice";
import { useGetAllRoomsInHotelMutation } from "../services/getAllHotelsApiSlice";
import { updateRooms } from "../services/roomsSlice";
 



const CheckInCheckOutModal=({hotel_id})=>{

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen((cur) => !cur);
    const checkInDate=useSelector(selectCheckIn)
    const checkOutDate=useSelector(selectCheckOut)
    const dispatch=useDispatch()
    const [getAllRoomsInHotel,{isError,isLoading,isSuccess,reset}]=useGetAllRoomsInHotelMutation()

    const getRooms=async ()=>{
        try {
        const response=await getAllRoomsInHotel({hotel_id,checkInDate,checkOutDate}) 
        console.log(response.data.response)
            dispatch(updateRooms(response.data.response));

        } catch (error) {
            console.log(error) 
        }
    }

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
            {/* <Typography variant="h4" color="blue-gray">
            
            </Typography> */}
            <Typography
              className="mb-3 font-bold text-center mt-3"
              variant="paragraph"
              color="gray"
            >
              Select CheckIn CheckOut 
            </Typography>
            <Typography className="-mb-2 font-normal text-[0.8rem] ms-2 mt-3" variant="h6">
                Check In
            </Typography>
            <Input
            onInput={(e)=>{
              console.log(e.target.value)
                dispatch(updateCheckIn(e.target.value))
            }}
            min={new Date(Date.now()).toISOString().split('T')[0]}
             label="date" type="date" size="lg"  className=""/>

            <Typography className="-mb-2 font-normal text-[0.8rem] ms-2 mt-3" variant="h6">
              Check Out
            </Typography>
            <Input
            onInput={(e)=>{
                dispatch(updateCheckOut(e.target.value))
            }}
            min={checkInDate}
            
             label="date" type="date" size="lg" className="" />

            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}

          </CardBody>
          <CardFooter className="pt-0">
            <Button className="my-3" variant="gradient" onClick={()=>{
                handleOpen()
                getRooms()
            }}  fullWidth>
              Update Date
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

}

export default CheckInCheckOutModal