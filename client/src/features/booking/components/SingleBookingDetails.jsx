import { useParams } from "react-router-dom";
import { useGetABookingDetailsForUserQuery } from "../services/getABookingDetailsApiSlice";
import { Button, Spinner } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";
import BookingCancelModel from "./BookingCancelModel";
import { useState } from "react";

const SingleBookingDetails = () => {
  const { booking_id } = useParams();
  const [open, setOpen] = useState(false);


  const {
    data: booking,
    isError,
    isLoading,
    isSuccess,
  } = useGetABookingDetailsForUserQuery({ booking_id });

  if (isLoading) return <Spinner />;
 
  return (
    <>
    <BookingCancelModel open={open} setOpen={setOpen} booking_id={booking_id}/>
    <div className="w-[80%] mt-[2%] min-h-[100vh]">
      <h2 class="font-bold text-green-500 sm:text-2xl text-[0.8rem] ms-12">
        Thanks for staying with us!
      </h2>

      <div className=" flex justify-between items-between mt-11  sm:ms-6 w-full">
        <button class="bg-transparent text-black  border-2 sm:text-sm text-[0.7rem] font-bold border-black 
        sm:w-[150px] sm:h-[40px]    w-[80px] h-[25px]">
          print
        </button>
        <button
        onClick={()=>{
          setOpen(!open)
        }} 
       className="sm:w-[150px] h-[30px] bg-red-500 text-white  sm:h-[40px] px-4 rounded-sm">cancel</button>
      </div>
      {booking.response.map(
        (
          {
            hotelName,
            _id,
            location,
            hotel_details,
            status,
            userName,
            checkIn,
            checkOut,
            userPhone,
            userEmail,
            roomDetails,
            totalAmount,
            discountAmount,
          },
          index
        ) => {
          return (
            <div className="grid grid-rows-[100px,auto,auto,auto] gird-cols-12  mt-12 gap-2 -ms-3 md:0 sm:ps-6">
              <div className="row-span-1 col-span-4 lg:col-span-12 md:col-span-8  flex justify-between sm:p-7  p-6">
                <div className="">
                  <h2 className="font-normal text-[0.8rem]  md:text-[1.3rem]">Booking Id</h2>
                  <h2 className="mt-2 md:text-[0.8rem] text-[0.6rem]">{_id}</h2>
                </div>
                <div>
                  <h2 className="sm:text-[1rem] text-[0.7rem]">
                    <span className="font-bold ">status :</span>
                    {status}
                  </h2>
                </div>
              </div>

              <div className="row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2">
                
                <div className="row-span-1 p-5 flex flex-col">
                  <h2 className="font-normal sm:text-[1.2rem] text-[1rem]">{hotelName}</h2>
                  <h2 className="sm:text-[0.8rem] text-[0.7rem]">{hotel_details.location}</h2>

                  <div className="mt-10 col-span-12">
                    <h2 className="font-normal  mb-1 sm:text-[1.2rem] text-[1rem]">
                      Hotel Description
                    </h2>
                    <h2 className="text-[0.8rem] font-extralight leading-relaxed mt-4 sm:w-full w-[80vw]">{hotel_details.description}</h2>
                  </div>
                </div>

                <div className="row-span-1 col-span-4 m-4">
                  <img
                    src={IMAGE_BASE_URL + hotel_details.images[0]}
                    alt=""
                    className="rounded-md  sm:w-full w-[270px]"
                  />
                </div>
                
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7 border-l-2">
                <h2>Primary Guest</h2>
                <h2 className="">{userName}</h2>
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7">
                <h2>CheckIn</h2>
                <h2 className="">{checkIn}</h2>
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7  ">
                <h2>CheckOut</h2>
                <h2 className="">{checkOut}</h2>
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7 flex justify-center items-center border-r-2">
                <h1 className="">1 Day</h1>
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7 border-l-2 border-b-2">
                <h2>user email</h2>
                <h2 className="">{userEmail}</h2>
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2">
                <h2>user phone</h2>
                <h2 className="">{userPhone}</h2>
              </div>

              <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2 ">
                <h2>user phone</h2>
                <h2 className="">{userPhone}</h2>
              </div>
              <div className="row-span-1 sm:col-span-3 col-span-full p-7  border-b-2 border-r-2">
                <h2>user phone</h2>
                <h2 className="">{userPhone}</h2>
              </div>

              <div className="row-span-1 col-span-12">
                <div className="row-span-1 col-span-12">
                  <h2 className="font-bold my-5 ms-2">Payment Details</h2>
                </div>

                <div className="row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2  p-5">
                  <h2 className="font-bold text-[0.9rem]">Total Amount</h2>
                  <h2 className="">₹ {totalAmount}</h2>
                </div>
                <div className="row-span-1 col-span-12 flex sm:flex-row flex-col justify-between border-2 mt-5 p-5">
                  <h2 className="font-bold text-[0.9rem]">Discount</h2>
                  <h2 className="">₹ {discountAmount}</h2>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
    </>
  );
};

export default SingleBookingDetails;
