import { useParams } from "react-router-dom";
import { useGetABookingDetailsForUserQuery } from "../services/getABookingDetailsApiSlice";
import { Spinner } from "@material-tailwind/react";
import { IMAGE_BASE_URL } from "../../../data/constants";

const SingleBookingDetails = () => {
  const { booking_id } = useParams();

  const {
    data: booking,
    isError,
    isLoading,
    isSuccess,
  } = useGetABookingDetailsForUserQuery({ booking_id });

  if (isLoading) return <Spinner />;
  console.log(booking);
  return (
    <div className="w-[80%] mt-[2%] min-h-[100vh]">
      <h2 class="font-bold text-green-500 text-2xl ms-12">
        Thanks for staying with us!
      </h2>
      <button class="bg-transparent text-black  border-2 font-bold border-black px-16 py-1 mt-11 ms-12">
        print
      </button>
      {booking.response.map(
        ({ hotelName, _id, location, hotel_details,status, userName,checkIn,checkOut,userPhone,userEmail,roomDetails,totalAmount,discountAmount }, index) => {
          return (
            <div className="grid grid-rows-[100px,auto,auto,auto] gird-cols-12  mt-12 gap-2 ps-6">
              <div className="row-span-1 col-span-12 border-2 flex justify-between p-7">
                <div>
                  <h1 className="font-bold  text-[1.3rem]">Booking Id</h1>
                  <h2 className="mt-2 text-[0.8rem]">{_id}</h2>
                </div>
                <div>
                  <h2><span className="font-bold">status :</span>{status}</h2>
                </div>
              </div>

              <div className="row-span-1 col-span-12 flex justify-between border-2">
                <div className="row-span-1 col-span-8  p-5">
                  <h1 className="font-bold text-[1.3rem]">{hotelName}</h1>
                  <h1 className="text-[0.8rem]" >{hotel_details.location}</h1>

                  <div className="mt-10">
                    <h1 className="font-bold text-xl mb-1">
                      Hotel Description
                    </h1>
                    <p className="text-[0.8rem]">{hotel_details.description}</p>
                  </div>
                </div>

                <div className="row-span-1 col-span-4 m-4">
                  <img src={IMAGE_BASE_URL + hotel_details.images[0]} alt="" className="rounded-md" />
                </div>
              </div>

              <div className="row-span-1 col-span-3 p-7 border-l-2">
                <h1>Primary Guest</h1>
                <h1 className="font-bold">{userName}</h1>
              </div>

              <div className="row-span-1 col-span-3 p-7">
                <h1>CheckIn</h1>
                <h1 className="font-bold">{checkIn}</h1>
              </div>

              <div className="row-span-1 col-span-3 p-7  ">
              <h1>CheckOut</h1>
                <h1 className="font-bold">{checkOut}</h1>  
              </div>

              <div className="row-span-1 col-span-3 p-7 flex justify-center items-center border-r-2">
                <h1 className="font-bold text-2xl">1 Day</h1>
              </div>

              <div className="row-span-1 col-span-3 p-7 border-l-2 border-b-2">
              <h1>user email</h1>
                <h1 className="font-bold">{userEmail}</h1>  
              </div>

              <div className="row-span-1 col-span-3 p-7  border-b-2">
              <h1>user phone</h1>
                <h1 className="font-bold">{userPhone}</h1>  
              </div>

              <div className="row-span-1 col-span-3 p-7  border-b-2 ">
              <h1>user phone</h1>
                <h1 className="font-bold">{userPhone}</h1>  
              </div>
              <div className="row-span-1 col-span-3 p-7  border-b-2 border-r-2">
              <h1>user phone</h1>
                <h1 className="font-bold">{userPhone}</h1>  
              </div>
            
            <div className="row-span-1 col-span-12">
                <div className="row-span-1 col-span-12">
                    <h2 className="font-bold m-5">Payment Details</h2>
                </div>

                <div className="row-span-1 col-span-12 flex justify-between border-2  m-5 p-5">
                    <h2 className="">Total Amount</h2>
                    <h2 className="">₹ {totalAmount}</h2>
                </div>
                <div className="row-span-1 col-span-12 flex justify-between border-2  m-5 p-5">
                    <h2 className="">Discount</h2>
                    <h2 className="">₹ {discountAmount}</h2>
                </div>
            </div>

            </div>
          );
        }
      )}
    </div>
  );
};

export default SingleBookingDetails;
