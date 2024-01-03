import { PencilIcon } from "@heroicons/react/24/solid";
import { Loader } from "../../../components/Loader";
import useGetHotelDetails from "../hooks/useGetHotelDetails";
import { useGetAHotelForAdminQuery } from "../services/getAHotelApiSlice";
import ImageContainer from "./ImageContainer";
import { Button, Input, useSelect } from "@material-tailwind/react";
import { useState } from "react";
import { InputModal } from "./InputModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHotelName,
  updateHotelName,
} from "../../hotelRegistration/services/editHotelFormSlice";
import { selectHotelById } from "../services/hotelListSlice";

const HotelDetailsSection = ({ hotel_id }) => {
  const dispatch = useDispatch();
  const { hotel, isError, isFetching, isLoading, isSuccess } =
    useGetHotelDetails(hotel_id);
  const hotelName = useSelector(selectHotelName);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [InputDetailsToPass, setInputDetails] = useState(null);

  //const hotelDetails=useSelector((state)=>selectHotelById(state,hotel_id))

  //
  // const HotelNameInput=<Input type="text" label="hotel name" value={hotelName} onInput={(e)=>{
  //     console.log('hill')
  //     dispatch(updateHotelName(e.target.value))
  // }}/>
  //

  return (
    <>
      {inputModalOpen && (
        <InputModal
          inputModalOpen={inputModalOpen}
          setInputModalOpen={setInputModalOpen}
          InputDetailsToPass={InputDetailsToPass}
          _id={hotel_id}
        />
      )}
      <div className="flex flex-col items-center border-2">
       
        <h1 className=" font-bold text-xl border-2 w-full text-center py-3">
          Hotel Details
        </h1>
       
 
        <div>
            
        </div>

        <div className="m-8 flex gap-4 flex-grow justify-between w-[90%]">

            <div className="border-2">
          {isLoading ? (
            <Loader />
          ) : (
            <p className="text-center font-bold">Hotel Name</p>
          )}
          </div>

          
          <div className="border-2">
          {isLoading ? (
            <Loader />
          ) : (
            <p className="text-center ">{hotel?.hotelName}</p>
          )}
          </div>

          <div className="border-2">
          <PencilIcon
            onClick={() => {
              setInputModalOpen(true);
              setInputDetails({
                name: "hotelName",
                label: "hotel name",
                type: "text",
                value: hotel?.hotelName,
              });
            }}
            width={15}
            className="cursor-pointer"
          />
        </div>

        

        </div>
      </div>

      <div className="flex flex-col items-center border-2 mt-5">
        <h1 className=" font-bold text-xl border-2 w-full text-center py-3">
          Location
        </h1>

        <div className="m-8 flex gap-4 flex-grow justify-between w-[90%] ">

            <div className="border-2 ">
          {isLoading ? (
            <Loader />
          ) : (
            <p className="text-center ">{hotel?.location}</p>
          )}
          </div>

          <div className="border-2 ">
          <PencilIcon
            onClick={() => {
              setInputModalOpen(true);
              setInputDetails({
                name: "location",
                label: "location",
                type: "text",
                value: hotel?.location,
              });
            }}
            width={15}
            className="cursor-pointer"
          />
        </div>

        </div>
      </div>


      <div className="flex flex-col items-center border-2 mt-5">
        <div className="flex">
        <h1 className="font-bold text-xl border-2 w-full text-center py-3">Hotel Images</h1>

        </div>
        {/* <HotelDetailsSection/> */}

        <div>
          <ImageContainer images={hotel?.images} />
        </div>
      </div>
      <div className="flex flex-col border-2 mt-5">
        <h1 className="text-center font-bold text-xl border-2 py-3">Description</h1>

        <div className="flex justify-between">
        <p className="px-11  m-8 text-left w-[50%]">
            {hotel?.description}
        </p>
        <PencilIcon
            onClick={() => {
              setInputModalOpen(true);
              setInputDetails({
                name: "location",
                label: "location",
                type: "text",
                value: hotel?.location,
              });
            }}
            width={15}
            className="cursor-pointer me-6"
          />
          </div>
      </div>
    </>
  );
};

export default HotelDetailsSection;
