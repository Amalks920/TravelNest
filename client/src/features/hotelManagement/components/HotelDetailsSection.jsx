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
import TableRow from "./TableRow";

const HotelDetailsSection = ({ hotel_id }) => {
  const dispatch = useDispatch();
  const { hotel, isError, isFetching, isLoading, isSuccess } =
    useGetHotelDetails(hotel_id);
  const hotelName = useSelector(selectHotelName);
  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [InputDetailsToPass, setInputDetails] = useState(null);



  return (
    <>


      <div className=" shadow-2xl">
        <h2 className="p-5 text-center text-xl border-2">Hotel Details</h2>
        <TableRow hotel={hotel} isLoading={isLoading} />
      </div>

      <div className="flex flex-col items-center border-2 mt-5 shadow-2xl">
        <div className="flex">
          <h2 className=" text-xl  w-full text-center py-3">
            Hotel Images
          </h2>
        </div>
        <div className="">
          <ImageContainer images={hotel?.images} hotel_id={hotel_id} />
        </div>
      </div>
    </>
  );
};

export default HotelDetailsSection;
