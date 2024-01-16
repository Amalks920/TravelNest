import { useParams } from "react-router-dom";
import { useGetSingleBookingForOwnerQuery } from "../services/getSingleBookingApiSlice";
import { Button, Option, Select, Spinner } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useChangeBookingStatusMutation } from "../services/changeBookingStatusApiSlice";
import { Formik } from "formik";

const BookingDetails = () => {
  const { booking_id } = useParams();

  const {
    data: bookings,
    isError,
    isLoading,
    isSuccess,
  } = useGetSingleBookingForOwnerQuery({ booking_id });

  const [
    changeBookingStatus,
    {
      isError: isErrorChangeStatus,
      isLoading: isLoadingChangeStatus,
      isSuccess: isSuccessChangeStatus,
    },
  ] = useChangeBookingStatusMutation();

  if (isLoading) return <Spinner />;

  console.log(bookings);

  const handleSubmit = async (values) => {
    console.log("valuessss", values);
    await changeBookingStatus({
      status: values.status,
      booking_id: booking_id,
    });
  };

  // const handleSubmit = async () => {
  //   await changeBookingStatus({status:'',booking_id:booking_id});
  // };

  return (
    <div className="grid grid-rows-3 grid-cols-4 w-full m-1 p-5">
      {bookings.response.map(
        (
          {
            userName,
            status,
            checkIn,
            checkOut,
            userEmail,
            userPhone,
            roomDetails,
            totalAmount
          },
          index
        ) => {
          return (
            <>
              {console.log(roomDetails)}
              <div className="row-span-1 col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem]">Primary Guest</h2>
                <h2 className="font-bold  text-[1.1rem]">{userName}</h2>
              </div>
              <div className="row-span-1 col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem]">Check In</h2>
                <h2 className="font-bold  text-[1.1rem]">{checkIn}</h2>
              </div>
              <div className="row-span-1 col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem]">Check Out</h2>
                <h2 className="font-bold  text-[1.1rem]">{checkOut}</h2>
              </div>
              <div className="row-span-1 col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem]">Email</h2>
                <h2 className="font-bold  text-[1.1rem]">{userEmail}</h2>
              </div>
              <div className="row-span-1 col-span-1 border-2 flex flex-col p-5 gap-3">
                <h2 className=" text-[1rem]">Phone</h2>
                <h2 className="font-bold  text-[1.1rem]">{userPhone}</h2>
              </div>
              <div className="row-span-1 col-span-1 border-2 flex flex-col  p-5 gap-3">
                <h2 className=" text-[1rem]">status</h2>
                <div className="w-72">
                  <Formik
                    initialValues={{
                      status: status,
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <>
                        <select
                          onChange={handleChange}
                          label="Change Status"
                          name="status"
                          value={values.status}
                        >
                          <option value="paid">Paid</option>
                          <option value="checkIn">CheckIn</option>
                          <option value="checkOut">CheckOut</option>
                        </select>
                        <Button
                          onClick={() => {
                            handleSubmit();
                          }}
                          size="sm"
                          className="ms-28 mt-5"
                        >
                          submit
                        </Button>
                      </>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="row-span-1 col-span-4 mt-16">
                <h2 className="ms-5">Room Details</h2>
              </div>


            {
              roomDetails.map((room,index)=>{


            return  <>            
                  <div className="row-span-1  p-5 flex -mt-10  gap-36 col-span-full">
                    <div className="">
                    <h2 className="mb-6">Room Type
                    </h2>
                    <h2 className="font-bold capitalize">{room.roomType}</h2>
                    </div>

                    <div className="">
                    <h2 className="mb-6">Price
                    </h2>
                    <h2 className="font-bold capitalize">{room.rate}</h2>  
                    </div>

                    <div className="">
                    <h2 className="mb-6">No Of People Allowed
                    </h2>
                    <h2 className="font-bold capitalize">{room.noOfPeopleAllowed}</h2>  
                    </div>

                  </div>
              </>
                 })
            }

            <div className="row-span-1 col-span-full flex justify-between items-center mt-10 px-5 border-2 py-4">
              <h2>Total Amount</h2>
              <h2 className="font-bold">₹ {totalAmount}</h2>
            </div>
            </>
          );
        }
      )}
    </div>
  );
};

export default BookingDetails;
